import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';
import { Router } from '@angular/router';
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private token: string;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  private request(method: 'post'|'get'|'put'|'delete', type: String, user?: User, id?: String): Observable<any> {
    let url = "http://localhost:3000";

    if (method === 'get')
    {
      if (typeof(id) !== 'undefined')
      {
        return this.http.get(url + `${type}` + `${id}`);
      }
      else
      {
        return this.http.get(url + `${type}`);
      }
    }
    else if (method === 'delete')
    {
      return this.http.delete(url + `${type}` + `${id}`);
    }
    else if (method === 'put')
    {
      return this.http.put(url + `${type}` + `${id}`, user);
    }
  }

  public editUser(user: User): Observable<any> {
    return this.request('put', '/users/', user, user._id);
  }

  public getUserById(id: string): Observable<any> {
    return this.request('get', '/users/', null, id);
  }

  public getFriends(): Observable<any> {
    return this.request('get', '/friends/');
  }

  public addFriend(id: string): Observable<any> {
    console.log('trying to add friend');
    return this.request('get', '/friends/', null, id);
  }

  public removeFriend(id: string): Observable<any> {
    console.log('trying to remove friend');
    return this.request('delete', '/friends/', null, id);
  }

  public getAllUsers(): Observable<any> {
    console.log('trying to get all users');
    return this.request('get', '/users/');
  }

  public getUserProfilePicUrl(user: User)
  {
    if (!user.family)
    {
      return ("assets\\img\\dinosaure-2.png");
    }
    return ("assets\\img\\dinosaure-1.png");

  }
}