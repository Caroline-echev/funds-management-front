import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ButtonModule } from '../../atoms/button/button.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
