import { switchMap, flatMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../providers/category.service';
import { ProductService } from 'src/app/providers/product.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  product: any = [];
  categories: any = [];
  categoryName: string;
  filteredProduct:any=[];

  constructor(public productService: ProductService , public categoryService: CategoryService, public route:ActivatedRoute) {

    this.getProductList();
    this.getCategoryList();    
  }


    getProductList = () => {
      this.productService.getAll().snapshotChanges().subscribe(res => {
        res.forEach((element, i) => {
          element.payload.toJSON();
          this.product.push(Object.assign({ 'key': element.key }, element.payload.toJSON()));     
         }
        );
        this.filteredProduct = this.product;
        this.route.queryParamMap.subscribe(params => {
          this.categoryName = params.get('category'); 
          this.filteredProduct = (this.categoryName) ? this.product.filter( x => x.category ==this.categoryName) : this.product; 
        })
      });
    }

    getCategoryList = () => {
    var obj = {};
    this.categoryService.getCategoryList().snapshotChanges().subscribe(res => {
      res.forEach((element, i) => {
        element.payload.toJSON();
        this.categories.push(Object.assign({ 'key': element.key }, element.payload.toJSON()));
      });
    })
  }


}
