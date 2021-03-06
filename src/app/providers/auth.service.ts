import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(public angularFireAuth: AngularFireAuth, public route: ActivatedRoute, public userService:UserService) {
    this.user$ = angularFireAuth.authState;
    console.log(this.user$ , 'in auth service');
  }


  login = () => {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); 
  }

  logout = () => {
    this.angularFireAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    console.log('in app user');

    // return this.user$.switchMap(user => this.userService.get(user.uid))


    // return this.user$.pipe(map(user => this.userService.get(user.uid)));

    return this.user$.pipe(switchMap(user=>{
      if(user){
        return this.userService.get(user.uid).valueChanges();
      }else{
        return of(null)
            }}
    ))
  }

}
