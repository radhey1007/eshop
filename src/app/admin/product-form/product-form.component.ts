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


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories: any = [];
  validation_messages: any = {};

  constructor(public categoryService: CategoryService , public productService : ProductService,private toastr: ToastrService , public commonFn : CommonFunctionsService) {
    this.getCategoryList();

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
   console.log(product);
  //  var res = this.productService.create(product);
  //  if(res){
  //   this.toastr.success('Sucess!', 'Product added successfully !!!');
  //  } 

  }

}
