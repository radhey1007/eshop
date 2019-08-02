import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'header-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appUser:AppUser;
  constructor(public angularFireAuth:AngularFireAuth , public auth : AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
  }
  
  logout =() =>{
    this.auth.logout();
  }
}
