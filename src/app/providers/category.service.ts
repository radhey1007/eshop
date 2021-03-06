import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public db:AngularFireDatabase) { }

  getCategoryList = () => {
    var obj = {
      query: {
        orderByChild: 'name',
      }
    }
    return this.db.list('/categories');
  }
}
