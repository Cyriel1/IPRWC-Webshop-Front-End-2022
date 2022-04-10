import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { CartStorageService } from 'src/app/shared/services/cart-storage.service';

import { Cart } from '../../models/cart.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartRequest } from '../../models/payloads/cartRequest.model';

@Component({
  selector: 'app-cart-amount',
  templateUrl: './cart-amount.component.html',
  styleUrls: ['./cart-amount.component.scss']
})
export class CartAmountComponent implements OnInit, OnDestroy {
  email: string = '';
  cart: Cart = new Cart([], 0.00);
  orderPlaced:boolean = false;

  userSub: Subscription = new Subscription();
  cartHasChangedSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private cartStorageService: CartStorageService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartStorageService.fetchCart();
    this.userSub = this.authService.user.subscribe((user) => this.email = user.email);
    this.cartHasChangedSubscription = this.cartService.cartHasChanged.subscribe(() => this.cart = this.cartStorageService.fetchCart());
  }

  onAddCart(): void {   
    this.cartStorageService.saveCart(new CartRequest(this.email, this.cart.cartItems)).subscribe({
      next: () => { 
        this.orderPlaced = true;
      },
      error: () => {
        this.orderPlaced = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.cartHasChangedSubscription.unsubscribe();
    this.userSub.unsubscribe();
  }
}
