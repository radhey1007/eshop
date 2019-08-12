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

  userInfo :any=[];

  constructor(public auth : AuthService,public route:Router, public userService : UserService){
    this.auth.user$.subscribe(user => {
     // console.log(user , 'user deatils')
      if(user){
       localStorage.setItem('email',user.email);
       this.userService.save(user);
       var returnurl =  localStorage.getItem('returnUrl');
       route.navigateByUrl(returnurl);
      }
    });

    this.auth.user$.subscribe(user => {
      if(user){
      this.userService.getUserList().snapshotChanges().subscribe(res => {
         res.forEach((element,i) => {element.payload.toJSON()
       var obj = {
         'data':element.payload.toJSON(),
         'key':element.key
       }
       this.userInfo.push(obj);
         });         
       },err => {
         console.log('err', err);
       })
      }
    })
  }

}
