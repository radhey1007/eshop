import { Injectable } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';


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

  get = (uid :string ) => {
    return this.db.object('/users/' + uid);
  }

}
