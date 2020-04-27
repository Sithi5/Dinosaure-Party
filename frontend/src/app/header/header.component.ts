import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { User } from "../models/user.model";
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public auth: AuthService, public usersService: UsersService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn())
    {
      this.usersService.getUserById(this.auth.getUserDetails()._id).subscribe(user => {
        this.user = user;
      }, (err) => {
        console.error(err);
      });
    }
  }

  getProfilPic()
  {
    return this.usersService.getUserProfilePicUrl(this?.user);
  }

}
