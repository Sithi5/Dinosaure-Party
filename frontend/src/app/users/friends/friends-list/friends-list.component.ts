import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { User } from "../../../models/user.model";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  user: User;
  friends: User[] = [];

  constructor(public usersService: UsersService, public authService: AuthService) { }

  ngOnInit(): void {
    this.usersService.getUserById(this.authService.getUserDetails()._id).subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });
    this.usersService.getFriends().subscribe(users => {
      console.log(users);

      users.forEach(element => {
        this.usersService.getUserById(element).subscribe(user => {
          this.friends.push(user);
        }, (err) => {
          console.error(err);
        });
      });
    }, (err) => {
      console.error(err);
    });
  }

}
