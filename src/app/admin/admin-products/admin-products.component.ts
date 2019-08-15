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
        var obj = {
          'data': Object.assign({ 'key': element.key }, element.payload.toJSON())
        };

        // this.productInfo = obj.data;
        this.productInfo.push(obj);
        console.log(obj);
      }
      );
    });
    this.filteredProduct = this.productInfo;
    this.tableResource = new DataTableResource(this.productInfo);
    this.tableResource.query({ offset: 0 })
      .then(items => {
        this.items = items;
        console.log(this.items, 'text');
      });

    this.tableResource.count()
      .then(count => {
        this.itemCount = count;
        console.log(count);
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
    //console.log(query);
    query = query.toLowerCase();
    this.filteredProduct = (query) ? this.productInfo.filter(p => p.data.title.toLowerCase().includes(query)) : this.productInfo;
    console.log(this.filteredProduct);
  }

}
