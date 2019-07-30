import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(public auth : AuthService) {
    
   }

   canActivate = () => {
    this.auth.user$.map(user => {
        
    })
   }
}
