import { Component, } from '@angular/core';
import { MENU_LABELS } from 'src/app/util/constants';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {
labels = MENU_LABELS;

}
