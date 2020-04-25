import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from "../../models/user.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  user: User;
  users: User[];
  friends: User[] = [];
  constructor(public usersService: UsersService, public authService: AuthService) { }

  ngOnInit(): void {
    this.usersService.getUserById(this.authService.getUserDetails()._id).subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });
    this.usersService.getAllUsers().subscribe(users => {

      this.users = users;
    }, (err) => {
      console.error(err);
    });

    this.usersService.getFriends().subscribe(users => {

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

  addToFriends(user)
  {
    this.usersService.addFriend(user._id).subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });
  }

  isOthersUsersAndNotFriend(user)
  {
      this.friends.forEach(friend => {
        if (user._id !== friend._id)
      {
        return true;
      }
      });
      if (user._id !== this.user._id)
      {
        return true;
      }
      return false;
  }



}
