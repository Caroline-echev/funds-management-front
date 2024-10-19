// src/app/components/order/order.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() isAsc: boolean = true;  
  @Output() toggleSortOrder = new EventEmitter<void>();  

  sortOrder(): void {
    this.toggleSortOrder.emit();  
  }
}
