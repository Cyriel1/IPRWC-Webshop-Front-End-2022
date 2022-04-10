import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth/services/auth.service';
import { AuthStorageService } from './auth/services/auth-storage.service';
import { ProductService } from './shop/services/product.service';
import { ProductStorageService } from './shop/services/product-storage.service';
import { ProductsResolverService } from './shop/services/resolvers/products-resolver.service';
import { ProductResolverService } from './shop/services/resolvers/product-resolver.service';
import { CartService } from './cart/services/cart.service';
import { CartStorageService } from './shared/services/cart-storage.service';
import { ProfileService } from './profile/services/profile.service';
import { ProfileStorageService } from './profile/services/profile-storage.service';

import { LoggingInterceptorService } from './shared/services/interceptors/logging-interceptor.service';
import { AuthInterceptorService } from './auth/services/interceptors/auth-interceptor.service';

import { AuthGuard } from './auth/services/guards/auth-gaurd.service';
import { CanDeactivateGuard } from './auth/services/guards/can-deactivate-guard.service';

@NgModule({
  providers: [
    AuthService,
    AuthStorageService,
    ProductService,
    ProductStorageService,
    ProductsResolverService,
    ProductResolverService,
    CartService,
    CartStorageService,
    ProfileService,
    ProfileStorageService,
    AuthGuard,
    CanDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
