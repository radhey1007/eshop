import { ShoppingCartService } from './../providers/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit ,OnDestroy {

  cart;
  Subscription: Subscription;
  shoppingCartItemCount: any =0;
  productIdsArray: any = [];
  rowTotal: any = [];
  cartTotal: any=0;


  constructor(public cartService:ShoppingCartService) {

    this.ngOnInit();

   }


  ngOnInit = async () => {
    //  calculate total quantity , cartTotal
    this.Subscription = (await this.cartService.getCart())
    .snapshotChanges()
    .subscribe((cart: any) => {
       this.cart = cart.payload.toJSON();
       this.cartTotal = this.cartService.calculateCartTotalPrice(this.cart); 
       this.shoppingCartItemCount = this.cartService.calculateCartQuantity(this.cart);
       this.productIdsArray = this.cartService.getpoductIds(this.cart);    
    }); 
    // calculate total quantity
  }

  getPrice = (price,quantity) => {
    this.rowTotal.push(this.cartService.getPrice(price,quantity));
    return this.cartService.getPrice(price,quantity);
  }

  ngOnDestroy = () => {
    this.Subscription.unsubscribe();
  }

}
