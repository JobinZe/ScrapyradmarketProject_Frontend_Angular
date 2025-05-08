import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'common',loadChildren:()=>import('./common/common.module').then(m=>m.CommonModules)},
    {path:"login",loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},
    {path:"products",loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
