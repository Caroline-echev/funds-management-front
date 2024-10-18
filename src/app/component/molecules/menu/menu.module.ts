// menu.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component'; // Adjust the path as necessary

@NgModule({
  declarations: [MenuComponent], // Declare the MenuComponent here
  imports: [CommonModule],
  exports: [MenuComponent] // Export the MenuComponent so it can be used in other modules
})
export class MenuModule {
 
}
