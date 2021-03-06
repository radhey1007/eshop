import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase , AngularFireObject } from '@angular/fire/database';
import { AppUser } from '../models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFireDatabase) {
  }

  save = (user: firebase.User) => {
    var userInfo = {
      name: user.displayName,
      email: user.email
    };
    this.db.object('/users/' + user.uid).update(userInfo); 
  }

  get(uid :string): AngularFireObject<String> {
    console.log(uid , 'uid in user service');
    return this.db.object('/users/' + uid);
    //return this.db.object('/users/' + uid);
  }


  getUserList = () => {
    return this.db.list('/users/');
  }

  getUserInfoByEmail = (email) => {
   return this.db.object('/users/' + email);
  }

}
