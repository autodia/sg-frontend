/**
 * @module Authentication
 */

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { User } from '../model/user';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY, LoginQueryResponse } from 'src/app/login/graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = "authenticate";
  private url: string;

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    public router: Router) {
    this.url = environment.url + "/" + this.endpoint + "/";
  }

  /**
   * Sends login request to backend. On successful login response sets token in local storage. 
   * @param credentials object with username and password properties
   */
  login_old(credentials) {
    return this.http.post<any>(this.url, credentials)
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token)
          return true
        } else {
          return false
        }
      }));
  }

  login(credentials) {
    return this.apollo.query<LoginQueryResponse>({
      query: LOGIN_QUERY,
      variables: {
        username: credentials.username,
        password: credentials.password,
      },
    }).pipe(map(response => {
      if (response && response.data.login.token) {
        localStorage.setItem('token', response.data.login.token)
        return true
      } else {
        return false
      }
    }));
  }

  /**
   * Checks if a user is currently logged. A user is logged if a token is in local storage and it has not expired.
   */
  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if (!token) return false

    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }


  /**
   * Logs user out by removing token from local storage. 
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }

  add_token(token) {
    localStorage.setItem('token', token)
  }

  /**
   * Returns the currently logged in user or null if no user is logged in.
   */
  get User(): User {
    let token = localStorage.getItem('token')
    if (!token) return null

    let jwtHelper = new JwtHelperService();
    const user = plainToClass(User, jwtHelper.decodeToken(token) as User);
    return user
  }
}
