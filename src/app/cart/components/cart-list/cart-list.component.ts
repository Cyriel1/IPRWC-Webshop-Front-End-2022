import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem } from '../../models/cart-item.model';

import { CartStorageService } from '../../services/cart-storage.service';
import { CartService } from '../../services/cart.service';

import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  cartItems: CartItem[] = [];
  orderPlaced: boolean = false;
  orderPageExperationTimer: any;

  constructor(
    private route: Router,
    private cartStorageService: CartStorageService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartStorageService.fetchCartItems();
  }

  productTotal(): string {
    const productTotal = this.cartItems.length;
    if (productTotal === 1) return `(${productTotal} product)`;
    return `(${productTotal} products)`;
  }

  onOrderPlaced(event: boolean) {
    this.orderPlaced = event;
    this.orderPageExperationTimer = setTimeout(() => {
      this.route.navigate(['/orders']);
    }, 5000);
  }

  onRemoveCartItem(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.product.id != productId);
    this.cartService.cartHasChanged.next();
  }

  ngOnDestroy(): void {
    clearTimeout(this.orderPageExperationTimer);
  }

}
