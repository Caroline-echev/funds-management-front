import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MenuModule } from '../../molecules/menu/menu.module';
import { UserModule } from '../../pages/user/user.module';
import { UserService } from 'src/app/services/user.service';
import { ProfileModule } from '../../atoms/profile/profile.module';

@NgModule({
  declarations: [HomeComponent], 
  imports: [
    CommonModule,
    MenuModule,
    UserModule,
    ProfileModule
  ]
  ,providers: [UserService],
  exports: [
    HomeComponent
  ] 
})
export class HomeModule { }
