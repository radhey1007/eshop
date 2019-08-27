import { ShoppingCart } from './../models/shopping-cart';
import { element } from 'protractor';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/take';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create = () => {
    return this.db.list('/shopping-carts').push({
      'dateCreated': new Date().getTime()
    })
  }
  // getCart = async () => {
    async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId(); 
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem = (cartId:String, productId:String) => {
      return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private getOrCreateCartId = async () => {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  addToCart = async (product: any) => {
   this.updateItemQuantity(product,1);
  }

  removeFromCart = async (product: any) => {
    this.updateItemQuantity(product,-1);
  }

  updateItemQuantity = async (product:any,updatedQuantity) => {
    let obj = {};
    let cartId = await this.getOrCreateCartId();
    let items = this.getItem(cartId,product.key);
    items.snapshotChanges().take(1).subscribe((item: any) => {
      if(item.payload.toJSON() == null) obj = {'product':product , 'quantity':updatedQuantity};
      else obj  = {'product':product,'quantity':item.payload.toJSON().quantity + updatedQuantity};      
      items.update(obj);   
    })  
  }

  calculateQuantity = () => {
    
  }

}
