import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundComponent } from './fund.component';
import { MenuModule } from '../../molecules/menu/menu.module';
import { LoadingModule } from '../../atoms/loading/loading.module';
import { OrderModule } from '../../atoms/order/order.module';
import { ButtonModule } from '../../atoms/button/button.module';
import { FormModule } from '../../molecules/form/form.module';

@NgModule({
  declarations: [FundComponent],
  imports: [
    CommonModule,  
    MenuModule,
    LoadingModule,
    OrderModule,
    ButtonModule,
    FormModule
  ]
  ,
  exports: [FundComponent]
})
export class FundModule { }
