import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../providers/shopping-cart.service';
import { switchMap, flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/providers/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnDestroy {
  product: any = [];
  categoryName: string;
  filteredProduct: any = [];
  cart: any;
  Subscription :Subscription;
  constructor(public productService: ProductService, public route: ActivatedRoute, public cartService: ShoppingCartService) {
    this.getProductList();
    this.ngOnInit();
  }

 // get the product list

  getProductList = () => {
    this.filteredProduct = [];
    this.productService.getAll().snapshotChanges().pipe(
      switchMap(res => {
        res.forEach((element, i) => {
          element.payload.toJSON();
          this.product.push(Object.assign({ 'key': element.key }, element.payload.toJSON()));
        });
        return this.route.queryParamMap;
      })
    ).subscribe((params: any) => {
      this.categoryName = params.get('category');
      this.filteredProduct = (this.categoryName) ? this.product.filter(x => x.category == this.categoryName) : this.product;
    })
  }

  trackByProduct = (index, item) => {
    if (!item) return null;

    return index;
  }

// get the Cart Data
  ngOnInit = async () => {
    console.log('in ngOnInIt');
    this.Subscription = (await this.cartService.getCart())
      .snapshotChanges()
      .subscribe((cart: any) => {
         this.cart = cart.payload.toJSON();
      });      
  }

  ngOnDestroy = () => {
    this.Subscription.unsubscribe();
  }

}
