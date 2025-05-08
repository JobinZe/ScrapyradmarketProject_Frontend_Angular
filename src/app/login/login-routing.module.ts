import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


export const routes:Routes=[
  {path:'',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'login',component:LoginComponent}

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginRoutingModule { }
