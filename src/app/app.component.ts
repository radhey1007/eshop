import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';
import { UserService } from './providers/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-shop';

  constructor(public auth : AuthService,public route:Router, public userServoice : UserService){
    this.auth.user$.subscribe(user => {
      if(user){
       userServoice.save(user);
       var returnurl =  localStorage.getItem('returnUrl');
       route.navigateByUrl(returnurl);
      }
    })
  }

}
