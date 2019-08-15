import { CommonFunctionsService } from './../../providers/common-functions.service';
import { ProductService } from './../../providers/product.service';
import { CategoryService } from './../../providers/category.service';
import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories: any = [];
  product:any = [];
  id: any;


  constructor(public categoryService: CategoryService , public productService : ProductService,private toastr: ToastrService , public commonFn : CommonFunctionsService , private router:Router, private route: ActivatedRoute) {
    this.getCategoryList();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id) this.get(this.id);

  }

  ngOnInit() {
  }

  getCategoryList = () => {
    var obj = {};
    this.categoryService.getCategoryList().snapshotChanges().subscribe(res => {
      res.forEach((element, i) => {
        element.payload.toJSON();
        obj = {
          'data': element.payload.toJSON(),
          'key': element.key
        };
        this.categories.push(obj);
      });
    })
  }

  addProduct = (product) => {
   if(this.id){
    var res  = this.productService.update(this.id,product);
    if(res){
      this.toastr.success('Sucess!', 'Product updated successfully !!!');
      this.router.navigate(['admin-products']);
    }
   } else {
    var res1 = this.productService.create(product);
    if(res){
     this.toastr.success('Sucess!', 'Product added successfully !!!');
      this.router.navigate(['admin-products']);
    }
   }  
  }

  get = (id) => {
    this.productService.get(id).snapshotChanges().take(1).subscribe(res => { 
      console.log(res.payload.toJSON());
      this.product = res.payload.toJSON();
    })
  }
}
