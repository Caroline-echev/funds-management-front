import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import { ButtonModule } from '../../atoms/button/button.module';
import { LoadingModule } from '../../atoms/loading/loading.module';



@NgModule({
  declarations: [RadioComponent],
  imports: [
    CommonModule,
    ButtonModule,
    LoadingModule
  ]
  ,exports: [RadioComponent]
})
export class RadioModule { }
