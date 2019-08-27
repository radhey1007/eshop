import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items : ShoppingCartItem[];


    get totalItemsCount() {
        let count:any =0;
        console.log(this.items , 'in shopping cart class ');        
        let cartItemArray = Object.values(this.items);
        count = cartItemArray.reduce((sum:number, current:any) => sum + current.quantity, 0);
        console.log(count, 'Radhey total qty in Class');
        return count;

    }

}