import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable()
export class ProductStorageService {
  shopPath: string = '/api/shop';

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router
  ) { }

  fetchProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        environment.serverDomain() + this.shopPath + '/products',
        {
          responseType: 'json'
        }
      ).pipe(tap({
        next: (responseData) => {
          this.productService.setProducts(responseData);
        },
        error: (err) => {
          console.error(`could not load products ${err.status}, body was: ${err.error}`);
        }
      }));
  }

  fetchProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(
      environment.serverDomain() + this.shopPath + `/product/${productId}`,
      {
        responseType: 'json'
      }
    ).pipe(tap({
      next: (responseData) => {
        this.productService.setViewProduct(responseData);
      },
      error: (err) => {
        this.router.navigate(['shop']);
        console.error(`could not load product ${err.status}, body was: ${err.error}`);
      }
    }));
  }

}
