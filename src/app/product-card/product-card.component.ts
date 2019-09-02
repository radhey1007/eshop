import { ShoppingCartService } from './../providers/shopping-cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart :any = [];

  constructor(public cartService: ShoppingCartService) {
  }

  addToCart = () => {
    this.cartService.addToCart(this.product);
  }

  getQuantity = () => {
 
    if(!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;  
  }



}
