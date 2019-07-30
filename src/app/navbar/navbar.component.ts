import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';


@Component({
  selector: 'header-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public angularFireAuth:AngularFireAuth , public auth : AuthService) { 
  
  }

  ngOnInit() {
  }
  
  logout =() =>{
    this.auth.logout();
  }
}
