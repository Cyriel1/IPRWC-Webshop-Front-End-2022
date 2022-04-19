import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductStorageService } from 'src/app/shop/services/product-storage.service';
import { AdminStorageService } from '../../services/admin-storage.service';

import { Product } from 'src/app/shop/models/product.model';

@Component({
  selector: 'app-product-item-edit',
  templateUrl: './product-item-edit.component.html',
  styleUrls: ['./product-item-edit.component.scss']
})
export class ProductItemEditComponent implements OnInit {
  @Output() productsHasChanged: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  @Input() product: Product = new Product(0, 0.00, '', '', '', '');

  constructor(
    private productStorageService: ProductStorageService,
    private adminStorageService: AdminStorageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onDeleteProduct(id: number): void {
    this.adminStorageService.deleteProduct(id).subscribe({
      next: () => {
        this.productStorageService.fetchProducts().subscribe({
          next: (products) => {
            this.productsHasChanged.emit(products);
          }
        });
      }
    });
  }

  onViewProduct(id: number): void {
    this.router.navigate(['product', id], { relativeTo: this.route });
  }
}
