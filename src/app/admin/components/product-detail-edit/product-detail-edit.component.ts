import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { AdminStorageService } from '../../services/admin-storage.service';
import { ProductService } from 'src/app/shop/services/product.service';

import { Product } from 'src/app/shop/models/product.model';

import { CanDeactivateGuard } from 'src/app/auth/services/guards/can-deactivate-guard.service';

@Component({
  selector: 'app-product-detail-edit',
  templateUrl: './product-detail-edit.component.html',
  styleUrls: ['./product-detail-edit.component.scss']
})
export class ProductDetailEditComponent implements OnInit, CanDeactivateGuard {
  product: Product = new Product(0, 0.01, '', '', 'in stock', '');
  fileToUpload: File | null | undefined = null;
  statuses: string[] = ['in stock', 'out of order'];
  editProductForm: FormGroup = new FormGroup({});

  isLoading: boolean = false;
  isProductSaved: boolean = false;
  validError: boolean = false;

  constructor(
    private productService: ProductService,
    private adminStorageService: AdminStorageService,
    private route: Router) { }

  ngOnInit(): void {
    this.editProductForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'price': new FormControl(null, [Validators.required, Validators.min(0)]),
      'description': new FormControl(null, [Validators.required, Validators.maxLength(750)]),
      'status': new FormControl(null, [Validators.required])
    });

    if (!this.route.url.match('new')) {
      this.product = this.productService.getViewProduct();
      this.loadExistingProduct();
    }
  }

  loadExistingProduct(): void {
    this.editProductForm.patchValue({
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      status: this.product.status
    });
  }

  onAddOrUpdateProduct(): void {
    if (this.editProductForm.valid) {
      const editedProduct: Product = this.editProductForm.value;
      editedProduct.price = parseFloat(editedProduct.price.toFixed(2));

      this.isLoading = true;
      this.validError = false;

      if (!this.route.url.match('new')) {
        editedProduct.id = this.product.id;
        this.adminStorageService.updateProduct(this.fileToUpload, editedProduct).subscribe(this.handleSaveProductFeedback());
      } else {
        editedProduct.id = 0;
        this.adminStorageService.addProduct(this.fileToUpload, editedProduct).subscribe(this.handleSaveProductFeedback());
      }

      return;
    }
    this.isLoading = false;
    this.validError = true;
  }

  onHandleFileInput(event: Event): void {
    const file: File | null | undefined = (<HTMLInputElement>event.target).files?.item(0);
    this.fileToUpload = file;
  }

  onCancel(): void {
    this.route.navigate(['admin']);
  }

  handleSaveProductFeedback(): Partial<Observer<{ message: string; }>> | undefined {
    return {
      next: () => {
        this.isProductSaved = true;
        this.route.navigate(['admin']);
      },
      error: () => {
        this.isLoading = false;
        this.isProductSaved = true;
        this.validError = true;
      }
    };
  }

  newOrExistingProduct(): string {
    if (this.route.url.match('new')) return 'Add';

    return 'Edit'
  }

  controlValidationFeedback(control: string): boolean {
    const formControl = this.editProductForm.get(control);
    return (!formControl?.valid && formControl?.touched)!;
  }

  errorValidationFeedback(control: string, error: string): boolean | undefined {
    const formControl = this.editProductForm.get(control);
    return formControl?.hasError(error);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.isProductSaved) {
      return confirm("Do you want to discard the changes?");
    }

    return true;
  }

}
