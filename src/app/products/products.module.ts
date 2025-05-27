import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { RouterModule } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AddProductsComponent,
    DashboardComponent,
    BuyProductComponent,
    CheckoutPageComponent,
    PaymentSuccessComponent
  ],
  imports: [
    RouterModule,
    ProductRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
  ],
  exports:[
    ProductRoutingModule
  ]
})
export class ProductsModule { }
