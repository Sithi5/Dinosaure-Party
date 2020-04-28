import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-new-friend',
  templateUrl: './create-new-friend.component.html',
  styleUrls: ['./create-new-friend.component.scss']
})
export class CreateNewFriendComponent implements OnInit {

  credentials: TokenPayload = {
    login: '',
    password: ''
  };

  error = {
    login: '',
    password: ''
  }

  constructor(public usersService: UsersService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  register() {
    console.log('trying to add a new friend');
    this.auth.registerAFriend(this.credentials).subscribe((user) => {
      this.usersService.addFriend(user._id).subscribe(friend => {
        this.addToFriends(friend);
      }, (err) => {
        console.error(err);
      });
      setTimeout(()=>
      {
        this.router.navigateByUrl('/users/friends/friendslist');
      }, 250);
    }, (err) => {
      err.error.errortype === 'login' ? this.error.login = err.error.err : 0;
      err.error.errortype === 'password' ? this.error.password = err.error.err : 0;
      console.error(err);
    });
  }

  addToFriends(user)
  {
    this.usersService.addFriend(user._id).subscribe(docs => {
    }, (err) => {
      console.error(err);
    });
  }

}
