import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/providers/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableModule, DataTableResource } from 'angular5-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {


  productInfo: any = [];
  filteredProduct: any = [];
  subscription: Subscription;
  tableResource: DataTableResource<any>;
  items: any = [];
  itemCount: number;

  constructor(private productService: ProductService, private toastr: ToastrService, public router: Router) {
    this.getAll();
  }

  ngOnInit() {
  }
  ngOnDestroy = () => {
    this.subscription.unsubscribe();
  }

  getAll = () => {
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(res => {
      res.forEach((element, i) => {
        element.payload.toJSON();
        // var obj = {
        //   'data': Object.assign({ 'key': element.key }, element.payload.toJSON())
        // };

        // this.productInfo = obj.data;
        this.productInfo.push(Object.assign({ 'key': element.key }, element.payload.toJSON()));
      }
      );
    });
    this.filteredProduct = this.productInfo;
    console.log(this.productInfo);
    this.initializeTable(this.productInfo);


  }

  private initializeTable = (product:any) => {
    this.tableResource = new DataTableResource(product);

    console.log(this.tableResource , '666666');

    this.tableResource.query({ offset: 0 })
    .then(items => {
      this.items = items;
      console.log(items, '=================');
    });
  this.tableResource.count()
    .then(count => {
      this.itemCount = count;
      console.log(count);
    });
  }

  reloadItems = () => {

    if(!this.tableResource) return;

    this.tableResource.query({ offset: 0 })
    .then(items => {
      this.items = items;
      console.log(this.items, 'text111');
    });
  }

  delete = (id) => {
    if (!confirm('Are you sure ,you want to delete this product')) return;
    var res = this.productService.delete(id);
    if (res) {
      this.toastr.success('Sucess!', 'Product deleted successfully !!!');
      this.router.navigate(['admin-products']);
    }
  }

  filter = (query: String) => {
    query = query.toLowerCase();
    this.filteredProduct = (query) ? this.productInfo.filter(p => p.title.toLowerCase().includes(query)) : this.productInfo;
  }

}
