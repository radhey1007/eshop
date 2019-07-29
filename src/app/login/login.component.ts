import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public angularFireAuth:AngularFireAuth) { }

  ngOnInit() {
  }

  googleLogin = () => {
    var response = this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
    console.table(response);
    //debugger;
  }

}
