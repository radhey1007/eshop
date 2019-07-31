import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { FirebaseApp } from '@angular/fire';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(public auth : AuthService,public userService:UserService) {
    
   }

   CanActivate ():Observable <boolean> {
    // .map(user => this.userService.get(user.uid))
    //     .map(appUser => appUser.isAdmin)  
    debugger;
    var response =  this.auth.user$.pipe(map((appUser:any) => appUser.isAdmin))
    
    console.log(response);
    return response;      
   }
  
  }
