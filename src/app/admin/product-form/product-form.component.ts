import { CategoryService } from './../../providers/category.service';
import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$:any=[];
  
  constructor(public categoryService:CategoryService) {
    alert('in page product');
    this.getCategoryList();
   }

  ngOnInit() {
  }

  getCategoryList = () => {
 
    //this.categoryService.getCategoryList().snapshotChanges.subscribe();

  this.categoryService.getCategoryList().snapshotChanges().subscribe(res => {
   res.forEach((element,i) => {
     element.payload.toJSON();
     console.log(element.payload.toJSON(), element.key)
     var obj = {
      'data':element.payload.toJSON() ,
      'key':element.key
    }
   this.categories$.push(obj);
  })
})
 console.table(this.categories$ , '=====')

  }

}
