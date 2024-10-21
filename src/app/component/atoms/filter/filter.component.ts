import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() isChecked: boolean = false;        
  @Input() filterByCategory: boolean = false;
  @Input() labels: any;                       

  @Output() filterChange = new EventEmitter<boolean>(); 
  @Output() switchChange = new EventEmitter<boolean>();  
  onToggleFilter(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.filterChange.emit(isChecked); 
  }

  onToggleSwitch(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.switchChange.emit(isChecked); 
  }
}
