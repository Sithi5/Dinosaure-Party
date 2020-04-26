import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from "../../models/user.model";
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  editable: boolean = false;
  editForm: FormGroup;

  error = {
    server: '',
    login: '',
    checkPassword: '',
    password: ''
  }

  constructor(private formBuilder: FormBuilder, public usersService: UsersService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getUserById(this.authService.getUserDetails()._id).subscribe(user => {
      this.user = user;
      this.editForm = this.formBuilder.group({
        _id: [''],
        login: ['', Validators.required],
        checkPassword: ['', Validators.required],
        password: [''],
        family: [''],
        race: [''],
        food: [''],
        age: [''],
      });
      this.editForm.patchValue(this.user);
    }, (err) => {
      console.error(err);
    });

  }

  onSubmit()
  {
    this.usersService.editUser(this.editForm.value).subscribe(user => {
      this.user = user;
      this.editable = false;

      Object.keys(this.error).forEach(v => this.error[v] = '');
    }, (err) => {
      err.error.errortype === 'login' ? this.error.login = err.error.err : 0;
      err.error.errortype === 'password' ? this.error.password = err.error.err : 0;
      err.error.errortype === 'checkPassword' ? this.error.checkPassword = err.error.err : 0;
    });
  }

  getProfilPic()
  {
    return this.usersService.getUserProfilePicUrl(this.user);
  }

  removeAccount()
  {
    return this.usersService.deleteUser(this.user).subscribe(() =>
    {
      this.router.navigateByUrl('/users/profile');
    }, (err) => {
      console.error(err);
    });;
  }
}