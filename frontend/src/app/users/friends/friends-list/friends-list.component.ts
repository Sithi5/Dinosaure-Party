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
  async = 0;

  constructor(public usersService: UsersService, public authService: AuthService) { }

  ngOnInit(): void {

    setTimeout(()=>
    {
      this.async = 1;
    }, 250);
    //getting logged in user
    this.usersService.getUserById(this.authService.getUserDetails()._id).subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });

    //getting friends of logged in user
    this.usersService.getFriends().subscribe(users => {
      users.forEach(element => {
        //getting every friends users and put in friends array
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

  removeFromFriends(user)
  {
    console.log('friend trying to remove : ' + user.login)
    this.usersService.removeFriend(user._id).subscribe(docs => {
      //if success in db, remove from front also. Removing from friends array the deleted elem
      for(let i = 0; i < this.friends.length; i++)
      {
        if (this.friends[i]._id === user._id)
        {
          this.friends.splice(i, 1);
        }
      }
    }, (err) =>
    {
      console.error(err);
    });
  }

}
