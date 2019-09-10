import { Product } from 'src/app/models/product';
export class ShoppingCartItem {
    $key:string;
    title:string;
    imageUrl:string;
    product : Product;
    quantity: number;
    price:number;
}