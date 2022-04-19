import { Component, OnInit } from '@angular/core';

import { ProfileService } from 'src/app/profile/services/profile.service';
import { OrderService } from '../../services/order.service';

import { Profile } from 'src/app/profile/models/profile.model';
import { Receipt } from '../../models/receipt.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  profile: Profile = new Profile(0, '', '', '', '', '', '');
  receipts: Receipt[] = [];

  constructor(
    private profileService: ProfileService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();
    if (this.profile) {
      this.receipts = this.orderService.getReceipts(this.profile);
    }
  }

  receiptTotal(): string {
    const receiptTotal = this.receipts.length;
    if (receiptTotal === 1) return `(${receiptTotal} receipt)`;
    return `(${receiptTotal} receipts)`;
  }

  emptyReceipts(): boolean {
    if (this.receipts.length === 0) return true;

    return false;
  }

}
