import { ShoppingCart } from './../models/shopping-cart';
import { List } from 'linqts';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../providers/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'header-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {


  appUser: AppUser;
  cart: any;
  Subscription: Subscription;
  shoppingCartItemCount: any = 0;

  //cart$ : Observable<ShoppingCart>; 

  constructor(public angularFireAuth: AngularFireAuth, public auth: AuthService, public cartService: ShoppingCartService) {
    this.ngOnInit();
  }

  ngOnInit = async () => {

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);    
    //  calculate total quantity
    this.Subscription = (await this.cartService.getCart())
        .snapshotChanges()
        .subscribe((cart: any) => {
           this.cart = cart.payload.toJSON();
           this.shoppingCartItemCount = this.cartService.calculateCartQuantity(this.cart);
        });       
    // calculate total quantity
  }

 

  ngOnDestroy = () => {
    this.Subscription.unsubscribe();
  }

  logout = () => {
    this.auth.logout();
  }
}
