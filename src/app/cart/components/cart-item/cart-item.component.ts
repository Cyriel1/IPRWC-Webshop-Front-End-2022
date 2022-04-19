import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CartStorageService } from '../../services/cart-storage.service';
import { CartService } from '../../services/cart.service';

import { CartItem } from '../../models/cart-item.model';
import { Product } from 'src/app/shop/models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Output() deleteCartItem: EventEmitter<number> = new EventEmitter<number>();
  @Input() cartItem: CartItem = new CartItem(new Product(0, 0.00, '', '', '', ''), 0);

  quantity: number = 0;
  isLoading: boolean = false;
  loadingTimer: any;

  constructor(
    private cartStorageService: CartStorageService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.quantity = this.cartItem.quantity;
  }

  onRemoveCartItem(productId: number) {
    this.cartStorageService.deleteCartItem(productId);
    this.deleteCartItem.emit(productId);
  }

  onUpdateCartItemQuantity(cartItem: CartItem) {
    this.isLoading = true;
    this.loadingTimer = setTimeout(() => {
      const newCartItem = new CartItem(cartItem.product, this.quantity);
      this.cartStorageService.updateCartItem(cartItem, newCartItem);
      this.isLoading = false;
      this.cartService.cartHasChanged.next();
      clearTimeout(this.loadingTimer);
    }, 750);
  }

}
