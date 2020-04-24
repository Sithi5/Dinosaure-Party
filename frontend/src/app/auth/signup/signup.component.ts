import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../../services/auth.service';
import { Router } from '@angular/router';

import * as $ from "jquery";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  credentials: TokenPayload = {
    login: '',
    password: ''
  };

  error = {
    login: '',
    password: ''
  }

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/users/profile');
    }, (err) => {
      err.error.errortype === 'login' ? this.error.login = err.error.err : 0;
      err.error.errortype === 'password' ? this.error.password = err.error.err : 0;
      console.error(err);
    });
  }

  ngOnInit(): void {
  }

}
