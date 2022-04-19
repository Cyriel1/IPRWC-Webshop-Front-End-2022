import { Component, Input, OnInit } from '@angular/core';

import { Profile } from 'src/app/profile/models/profile.model';
import { Receipt } from '../../models/receipt.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() receipt: Receipt = new Receipt(new Profile(0, '', '', '', '', '', ''), [], '');

  constructor() { }

  ngOnInit(): void {
  }

  totalPrice() {
    let price: number = 0.00;
    this.receipt.orders.forEach((value) => {
      price += (value.product.price * value.quantity);
    });

    return price;
  }

}
