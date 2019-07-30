import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../providers/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  googleLogin = () => {
    this.auth.login();
  }

}
