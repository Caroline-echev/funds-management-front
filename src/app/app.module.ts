import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeModule } from './component/templates/home/home.module'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FundModule } from './component/templates/fund/fund.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';
import { ToastModule } from './component/atoms/toast/toast.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
   ToastModule,
    HomeModule,
    FundModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
