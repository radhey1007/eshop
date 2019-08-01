import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { CanActivate } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(public auth: AuthService, private userService: UserService) {

  }

  canActivate(): Observable<boolean> {
  
     return this.auth.appUser$.pipe(map((appUser:any)=>appUser.isAdmin))
    // return this.auth.user$.pipe(switchMap(user =>
    //   this.userService.get(user.uid).valueChanges()))
    //     .pipe(map((appUser: any) => appUser.isAdmin))


   }

}
