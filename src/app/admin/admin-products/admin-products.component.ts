import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/providers/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  productInfo :any = [];
  constructor(private productService: ProductService,private toastr: ToastrService, public router:Router) {
    this.getAll();
   }

  ngOnInit() {
  }

  getAll = () => {
    this.productService.getAll().snapshotChanges().subscribe(res => {
      res.forEach((element, i) => {
        element.payload.toJSON();
        var obj = {
          'data':Object.assign({'key':element.key},element.payload.toJSON())
        };
         this.productInfo.push(obj);
      }
    );
  })
}

delete = (id) => {
    
 if(!confirm('Are you sure ,you want to delete this product')) return;
 var res = this.productService.delete(id);
 if(res){
   this.toastr.success('Sucess!', 'Product deleted successfully !!!');
   this.router.navigate(['admin-products']);
 }  
}

}
