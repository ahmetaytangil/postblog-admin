import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeTR from '@angular/common/locales/tr';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from "./features/error/error.component";
import { LoginComponent } from "./features/login/login.component";
import { SharedModule } from "./shared/shared.module";
import { HttpInterceptor } from "./core/interceptors/http.interceptor";
import { LayoutModule } from "./shared/templates/layout/layout.module";
import { OrdersComponent } from './features/orders/orders.component';
import { OrderDetailDialogComponent } from './features/order-detail/order-detail-dialog.component';
import { CouriersComponent } from './features/couriers/couriers.component';
import { CouriersDetailComponent } from './features/couriers-detail/couriers-detail.component';
import { ConsensusComponent } from './features/consensus/consensus.component';

registerLocaleData(localeTR);

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    OrdersComponent,
    OrderDetailDialogComponent,
    CouriersComponent,
    CouriersDetailComponent,
    ConsensusComponent
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule,
    SharedModule,
    LayoutModule,
    HttpClientModule,
    NgxPaginationModule,
    NgOptimizedImage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'tr-TR'},
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
