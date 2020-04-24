import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  login: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: String, user?: TokenPayload): Observable<any> {
    let base;
    let url = "http://localhost:3000";

    if (method === 'post') {
      base = this.http.post(url + `${type}`, user);
    } else {
      base = this.http.get(url + `${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          console.log(this.getUserDetails())
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', '/auth/signup', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', '/auth/signin', user);
  }

  public getUser(id): Observable<any> {
    return this.request('get', '/users/' + this.getUserDetails()._id);
  }

  public getAllUsers(): Observable<any> {
    return this.request('get', '/users/');
  }
}