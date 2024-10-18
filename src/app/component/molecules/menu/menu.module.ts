// menu.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { CheckboxModule } from '../../atoms/checkbox/checkbox.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule,
    CheckboxModule
  ],
  exports: [MenuComponent] 
})
export class MenuModule {
 
}
