import { CategoryService } from './../../providers/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  categories: any = [];
  @Input('categoryName') categoryName;

  constructor(public categoryService: CategoryService) {
    this.getCategoryList();

    //console.log(this.categoryName  , 'in produt filter component')

   }

  ngOnInit() {
  }

  
  getCategoryList = () => {
    this.categoryService.getCategoryList().snapshotChanges().subscribe(res => {
      this.categories.push({ 'key': '', name: "All Categories" });
      res.forEach((element, i) => {
        element.payload.toJSON();
        this.categories.push(Object.assign({ 'key': element.key }, element.payload.toJSON()));
      });
    })
  }
}
