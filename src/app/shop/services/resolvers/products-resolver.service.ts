import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { ProductStorageService } from '../product-storage.service';

import { Product } from '../../models/product.model';

@Injectable()
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private productStorageService: ProductStorageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {

    return this.productStorageService.fetchProducts();
  }

}
