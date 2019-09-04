import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../providers/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent  {

  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart :any = [];

  constructor(public cartService: ShoppingCartService) {
  }

  addToCart = () => {
    this.cartService.addToCart(this.product);
  }

  removeFromCart = () => {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity = () => {

    if(!this.shoppingCart)  return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;  
  }


}
