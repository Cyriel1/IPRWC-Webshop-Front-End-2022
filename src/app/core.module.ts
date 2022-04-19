import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth/services/auth.service';
import { AuthStorageService } from './auth/services/auth-storage.service';
import { AuthInterceptorService } from './auth/services/interceptors/auth-interceptor.service';

import { ProductService } from './shop/services/product.service';
import { ProductStorageService } from './shop/services/product-storage.service';
import { ProductResolverService } from './shop/services/resolvers/product-resolver.service';
import { ProductsResolverService } from './shop/services/resolvers/products-resolver.service';

import { CartService } from './cart/services/cart.service';
import { CartStorageService } from './cart/services/cart-storage.service';

import { ProfileService } from './profile/services/profile.service';
import { ProfileStorageService } from './profile/services/profile-storage.service';
import { ProfileResolverService } from './profile/services/resolvers/profile-resolver.service';

import { AdminService } from './admin/services/admin.service';
import { AdminStorageService } from './admin/services/admin-storage.service';

import { OrderService } from './order/services/order.service';
import { OrderStorageService } from './order/services/order-storage.service';
import { OrderResolverService } from './order/services/resolvers/order-resolver.service';

import { AuthGuard } from './auth/services/guards/auth-gaurd.service';
import { CanDeactivateGuard } from './auth/services/guards/can-deactivate-guard.service';

@NgModule({
  providers: [
    AuthService,
    AuthStorageService,
    ProductService,
    ProductStorageService,
    ProductResolverService,
    ProductsResolverService,
    CartService,
    CartStorageService,
    ProfileService,
    ProfileStorageService,
    ProfileResolverService,
    OrderService,
    OrderStorageService,
    OrderResolverService,
    AdminService,
    AdminStorageService,
    AuthGuard,
    CanDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }