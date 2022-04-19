import { Component, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Cart } from '../../models/cart.model';
import { Profile } from 'src/app/profile/models/profile.model';
import { CartRequest } from '../../models/payloads/cartRequest.model';

import { CartService } from '../../services/cart.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartStorageService } from 'src/app/cart/services/cart-storage.service';
import { ProfileService } from 'src/app/profile/services/profile.service';

import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';

@Component({
  selector: 'app-cart-amount',
  templateUrl: './cart-amount.component.html',
  styleUrls: ['./cart-amount.component.scss']
})
export class CartAmountComponent implements OnInit, OnDestroy {
  @Output() orderPlaced: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() alertHost!: PlaceholderDirective;

  cart: Cart = new Cart([], 0.00);
  profile: Profile = null!;
  userId: number = 0;
  isAuthenticated: boolean = false;

  userSub: Subscription = new Subscription();
  closeSubscription: Subscription = new Subscription();
  cartHasChangedSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private cartStorageService: CartStorageService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartStorageService.fetchCart();
    this.profile = this.profileService.getProfile();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.userId = user.id
      }
    });
    this.cartHasChangedSubscription = this.cartService.cartHasChanged.subscribe(() => this.cart = this.cartStorageService.fetchCart());
  }

  hasProduct(): boolean {
    const productTotal = this.cart.cartItems.length;
    if (productTotal === 0) return false;

    return true;
  }

  onAddCart(): void {
    if (this.profile) {
      this.cartStorageService.saveCart(
        new CartRequest(this.userId, this.cart.cartItems)
      ).subscribe({
        next: () => {
          sessionStorage.clear();
          this.orderPlaced.emit(true);
        },
        error: () => {
          this.orderPlaced.emit(false);
        }
      });
    } else {
      this.createProfileAlert("you cannot place an order until you have added your profile information! Go to profile and save changes.");
    }
  }

  private createProfileAlert(message: string): void {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef: ComponentRef<AlertComponent> = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    componentRef.instance.routerLink = '/profile';

    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    this.cartHasChangedSubscription.unsubscribe();
    this.userSub.unsubscribe();
  }
}
