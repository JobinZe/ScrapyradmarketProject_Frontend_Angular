import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes:Routes=[
  {path:'error',component:ErrorComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password/:token',component:ResetPasswordComponent},
  {path:'session-expired',component:SessionExpiredComponent}

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CommonRouterModule { }
