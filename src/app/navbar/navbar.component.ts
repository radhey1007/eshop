import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';


@Component({
  selector: 'header-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user : firebase.User;

  constructor(public angularFireAuth:AngularFireAuth) { 
    angularFireAuth.authState.subscribe(userInfo => this.user = userInfo);
  }

  ngOnInit() {
  }
  
  logout =() =>{
    this.angularFireAuth.auth.signOut();
  }
}
