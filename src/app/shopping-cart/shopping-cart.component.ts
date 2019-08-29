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


 

  constructor(public cartService:ShoppingCartService) {

    this.ngOnInit();

   }


  ngOnInit = async () => {
    //  calculate total quantity
    this.Subscription = (await this.cartService.getCart())
    .snapshotChanges()
    .subscribe((cart: any) => {
       this.cart = cart.payload.toJSON();


       console.log(this.cart.items , 'in cart total price');
      //  let rowTotal :any = [];
      //  this.cart.items.forEach(element => {
      //   rowTotal = this.getPrice(element.product.price,element.quantity);  
      //  });
       
      //  console.log(rowTotal , 'rowTotal');
 
       this.productIdsArray = this.cartService.getpoductIds(this.cart);     
       this.shoppingCartItemCount = this.cartService.calculateCartQuantity(this.cart);
    }); 
    // calculate total quantity
  }

  getPrice = (price,quantity) => {
    return this.cartService.getPrice(price,quantity);
  }

  ngOnDestroy = () => {
    this.Subscription.unsubscribe();
  }


  getCartTotalPrice = () => {
    console.log(this.cart , 'in cart total price');
  }

}
