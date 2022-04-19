import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ProductService } from './product.service';

import { Product } from '../models/product.model';

@Injectable()
export class ProductStorageService {

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router
  ) { }

  fetchProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        environment.serverDomain() + environment.shopPath + '/products',
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
      environment.serverDomain() + environment.shopPath + `/product/${productId}`,
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
