import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CreateUserService } from './create-user.service';
import { AppError } from 'src/app/common/errors/app-error';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private createUserService: CreateUserService,
  ) { }

  ngOnInit() {
    const url = window.location.href;
    let token;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      token = httpParams.get('token');
      if (token) {
        this.authService.add_token(token)

        let user = this.authService.User 

        this.createUserService.mutate({
          userInput: {
            username: user.profile.display_name,
            email: user.profile.email,
            password: "1234"
          }
        }).subscribe(({ data, loading }) => {
          console.log(data)
        }, (err: AppError) => {
          console.log("Create user from token error: ", err)
        }, () => {
          console.log("Done creating user from token")
        });
      }
    }
  }
}
