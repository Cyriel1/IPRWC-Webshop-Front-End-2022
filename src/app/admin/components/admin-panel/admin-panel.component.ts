import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/shop/services/product.service';

import { Product } from 'src/app/shop/models/product.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  products: Product[] = [];
  filteredProduct: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onRefreshProducts(products: Product[]): void {
    this.products = products;
  }

}
