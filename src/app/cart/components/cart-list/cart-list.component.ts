import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CartItem } from '../../models/cart-item.model';

import { CartStorageService } from '../../../shared/services/cart-storage.service';
import { Subject } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartStorageService: CartStorageService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartStorageService.fetchCartItems();
  }

  productTotal(): string {
    const productTotal = this.cartItems.length;
    if (productTotal === 1) return `(${productTotal} product)`;
    return `(${productTotal} products)`;
  }

  onRemoveCartItem(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.product.id != productId);
    this.cartService.cartHasChanged.next();
  }

}
