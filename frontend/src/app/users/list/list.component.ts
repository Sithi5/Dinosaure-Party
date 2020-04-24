import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails} from '../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: UserDetails[];
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getAllUsers().subscribe(users => {
      this.users = users;
    }, (err) => {
      console.error(err);
    });
  }

}
