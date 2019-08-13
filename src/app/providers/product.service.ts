import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public angularFireDatabase :AngularFireDatabase) { }

  create = (product) => {

    return this.angularFireDatabase.list('/products').push(product);

  }
}
