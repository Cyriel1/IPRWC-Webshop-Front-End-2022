import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';

import { ProductService } from '../../services/product.service';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProduct: string = '';

  @ViewChild(PlaceholderDirective, { static: true }) productDetailHost!: PlaceholderDirective;

  closeSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    this.route.params.subscribe((params) => {
      const id: number = +params["id"];
      if (!isNaN(id)) {
        const viewProduct = this.productService.getViewProduct();
        this.createProductDetails(viewProduct);
      };
    });
  }

  private createProductDetails(product: Product): void {
    const hostViewContainerRef = this.productDetailHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef: ComponentRef<ProductDetailComponent> = hostViewContainerRef.createComponent(ProductDetailComponent);
    componentRef.instance.product = product;

    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
      this.router.navigate(['shop']);
    });
  }
}
