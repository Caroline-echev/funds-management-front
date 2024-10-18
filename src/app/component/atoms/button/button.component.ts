import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent  {

  @Input() nameButton: string | undefined = '';
  @Input() fundId: string | undefined; 
  @Input() userId: string | undefined; 
  @Output() buttonClick = new EventEmitter<{ fund: string | undefined, user: string | undefined }>(); 

 
  onClick() {
    this.buttonClick.emit({ fund: this.fundId, user: this.userId });
  }
}
