// src/app/components/order/order.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SVG_PATHS } from 'src/app/util/constants';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() isAsc: boolean = true;  
  @Output() toggleSortOrder = new EventEmitter<void>();  
  ascOrderSvg = SVG_PATHS.SORT_ASC
  descOrderSvg = SVG_PATHS.SORT_DESC
  
  sortOrder(): void {
    this.toggleSortOrder.emit();  
  }
}
