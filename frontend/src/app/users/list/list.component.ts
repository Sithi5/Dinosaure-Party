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
  async = 0;

  constructor(public usersService: UsersService, public authService: AuthService) { }

  ngOnInit(): void {


    //getting all users to print
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    }, (err) => {
      console.error(err);
    });

    //retrieving the logged in user
    this.usersService.getUserById(this.authService.getUserDetails()._id).subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });

    //adding to friends array the friends of the current logged user
    this.usersService.getFriends().subscribe(users => {
      users.forEach(element => {
        this.usersService.getUserById(element).subscribe(user => {
          this.friends.push(user);
          //removing friends from users to print
          this.friends.forEach(friend =>
            {
              for (let i = 0; i < this.users.length; i++)
              {
                if (this.users[i]._id === friend._id || this.users[i]._id === this.user._id)
                {
                  this.users.splice(i, 1);
                }
              }
            })

        }, (err) => {
          console.error(err);
        });
      });
    }, (err) => {
      console.error(err);
    });

    setTimeout(()=>
    {
      this.async = 1;
    }, 250);
  }

  isNotMe(user)
  {
    if (!this.user)
    {
      return false;
    }
    if (user._id === this.user._id)
    {
      return false;
    }
    return true;
  }
  addToFriends(user)
  {
    this.usersService.addFriend(user._id).subscribe(docs => {
      this.friends.push(user);
      //remove from users array
      for(let i = 0; i < this.users.length; i++)
      {
        if (this.users[i]._id === user._id)
        {
          this.users.splice(i, 1);
        }
      }
    }, (err) => {
      console.error(err);
    });
  }

}
