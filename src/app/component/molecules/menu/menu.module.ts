// menu.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { CheckboxModule } from '../../atoms/checkbox/checkbox.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule,
    CheckboxModule,
    AppRoutingModule
  ],
  exports: [MenuComponent] 
})
export class MenuModule {
 
}
