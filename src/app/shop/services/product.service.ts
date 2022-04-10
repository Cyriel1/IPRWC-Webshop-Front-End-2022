import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];
  viewProduct: Product = null!;

  constructor() { }

  getProducts() {
    return this.products;
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  setViewProduct(product: Product) {
    this.viewProduct = product;
  }

  getViewProduct() {
    return this.viewProduct;
  }
}
