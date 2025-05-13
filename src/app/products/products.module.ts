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


@NgModule({
  declarations: [
    AddProductsComponent,
    DashboardComponent,
    BuyProductComponent,
    CheckoutPageComponent
  ],
  imports: [
    RouterModule,
    ProductRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  exports:[
    ProductRoutingModule
  ]
})
export class ProductsModule { }
