/**
 * @module Authentication
 */

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  forkertLogin: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  /**
   * Called when user clicks login
   * @param credentials object with username and password
   */
  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
          this.router.navigate([returnUrl || '/']);
        } else
          this.forkertLogin = true;
      });
  }
}
