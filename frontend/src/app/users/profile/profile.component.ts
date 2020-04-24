import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserDetails;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUser(this.auth.getUserDetails()).subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });
  }
}