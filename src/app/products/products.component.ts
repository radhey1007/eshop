import { switchMap, flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/providers/product.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  product: any = [];
  categoryName: string;
  filteredProduct: any = [];

  constructor(public productService: ProductService, public route: ActivatedRoute) {
    this.getProductList();
  }

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
}
