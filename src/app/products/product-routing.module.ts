import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../services/auth-guard.guard';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

export const routes:Routes=[
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'add-product',component:AddProductsComponent,canActivate:[AuthGuard]},
  {path:'update-products/:id',component:AddProductsComponent,canActivate:[AuthGuard]},
  {path:'product-detail/:id',component:ProductDetailsComponent,canActivate:[AuthGuard]},
  {path:'buy-product',component:BuyProductComponent,canActivate:[AuthGuard]},
  {path:'checkout',component:CheckoutPageComponent,canActivate:[AuthGuard]}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductRoutingModule { }
