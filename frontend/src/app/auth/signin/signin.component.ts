import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  credentials: TokenPayload = {
    login: '',
    password: ''
  };

  error = {
    server: '',
    login: '',
    password: ''
  }

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/users/profile');
    }, (err) => {
      this.error.server = err.error.message;
      console.error(err);
    });
  }

  ngOnInit(): void {
  }

}
