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

  constructor(public cartService:ShoppingCartService) {

    this.ngOnInit();

   }


  ngOnInit = async () => {
    console.log('test in sccccc')
    //  calculate total quantity
    this.Subscription = (await this.cartService.getCart())
    .snapshotChanges()
    .subscribe((cart: any) => {
       this.cart = cart.payload.toJSON();
       this.shoppingCartItemCount = this.cartService.calculateCartQuantity(this.cart);
    }); 
    // calculate total quantity
  }

  ngOnDestroy = () => {
    this.Subscription.unsubscribe();
  }

}
