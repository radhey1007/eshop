import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/providers/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableModule, DataTableResource } from 'angular5-data-table';
import { List } from 'linqts';


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
  itemCount: number = 0;
  searchBy: any = [
    {
      'value': 'title',
      'name': 'Title'
    },
    {
      'value': 'price',
      'name': 'Price'
    },
    {
      'value': 'category',
      'name': 'Category'
    }
  ];
  searchTerm: any = 'title';
  query: any;

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
        this.productInfo.push(Object.assign({ 'key': element.key }, element.payload.toJSON()));
      }
      );
      this.filteredProduct = this.productInfo;
      this.initializeTable(this.productInfo);
    });
  }

  private initializeTable = (product) => {

    this.tableResource = new DataTableResource(product);
    this.tableResource.query({ offset: 0 })
      .then(items => {
        this.items = items;
      });
    this.tableResource.count()
      .then(count => {
        this.itemCount = count;
      });
  }

  reloadItems = (params) => {

    if (!this.tableResource) return;
    this.tableResource.query(params)
      .then(items => {
        this.items = items;
      });
  }

  onChange = (val) => {
    this.searchTerm = val.target.value;
  }


  delete = (id) => {
    if (!confirm('Are you sure ,you want to delete this product')) return;
    var res = this.productService.delete(id);
    if (res) {
      this.getAll();
      this.toastr.success('Sucess!', 'Product deleted successfully !!!');
      this.router.navigate(['admin-products']);
    }
  }

  filter = (query: String) => {
    if (this.searchTerm == 'title' || this.searchTerm == 'category') {
      this.query = query.toLowerCase();
      if (this.searchTerm == 'title') {
        this.filteredProduct = (this.query) ? this.productInfo.filter(p => p.title.toLowerCase().includes(this.query)) : this.productInfo;
      } else {
        this.filteredProduct = (this.query) ? this.productInfo.filter(p => p.category.toLowerCase().includes(this.query)) : this.productInfo;
      }
    } else {
      this.filteredProduct = this.productInfo;
      this.filteredProduct = (query) ? new List<any>(this.filteredProduct).Where(x => x.price == query).ToArray() : this.productInfo;
    }
    this.initializeTable(this.filteredProduct);
  }

}
