import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private authService:AuthService,public userService:UserService) { }

  canActivate() : Observable<boolean> {
    
  return this.authService.appUser$.map(appUser => appUser.isAdmin);

  }

}
