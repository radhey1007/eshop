import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(public db :AngularFireDatabase) { }

  create = (product) => {
    return this.db.list('/products').push(product);
  }

  getAll = () => {
  return this.db.list('/products');
  }

  get = (productId) => {
    return this.db.object('/products/' + productId);
  }

  update = (id, product) => {
    return this.db.object('/products/' + id).update(product);
  }

  delete = (id) => {
    return this.db.object('/products/' + id).remove();
  }

}
