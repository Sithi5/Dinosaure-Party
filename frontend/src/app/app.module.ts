import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './users/profile/profile.component';
import { ListComponent } from './users/list/list.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FriendsListComponent } from './users/friends/friends-list/friends-list.component';
import { JwtInterceptor } from './_helper/jwt.interceptor';
import { CreateNewFriendComponent } from './create-new-friend/create-new-friend.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'users/profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'users/list', component: ListComponent},
  { path: 'users/friends/friendslist', component: FriendsListComponent, canActivate: [AuthGuardService]},
  { path: 'users/friends/create-new-friend', component: CreateNewFriendComponent, canActivate: [AuthGuardService]},
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    ProfileComponent,
    ListComponent,
    HomeComponent,
    FriendsListComponent,
    CreateNewFriendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
