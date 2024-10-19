import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CLASS_NAME, EMPTY_STRING } from 'src/app/util/constants';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent  {

  @Input() nameButton: string | undefined = EMPTY_STRING;
  @Input() fundId: string | undefined; 
  @Input() userId: string | undefined; 
  @Output() buttonClick = new EventEmitter<{ fund: string | undefined, user: string | undefined }>(); 
  @Input() className: string = CLASS_NAME.CANCEL_BUTTON;

 
  onClick() {
    this.buttonClick.emit({ fund: this.fundId, user: this.userId });
  }
}
