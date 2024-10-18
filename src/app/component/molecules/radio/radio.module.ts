import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import { ButtonModule } from '../../atoms/button/button.module';



@NgModule({
  declarations: [RadioComponent],
  imports: [
    CommonModule,
    ButtonModule
  ]
  ,exports: [RadioComponent]
})
export class RadioModule { }
