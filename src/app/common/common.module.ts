import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonRouterModule } from './common-router.module';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorComponent } from './error/error.component';
import { OfflineComponent } from './offline/offline.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfterLoginComponent } from './after-login/after-login.component';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    NavBarComponent,
    ForgotPasswordComponent,
    OfflineComponent,
    AfterLoginComponent,
    SessionExpiredComponent,
    ErrorComponent,
    FooterComponent,
    ResetPasswordComponent

  ],
  imports: [
    RouterModule,
    CommonModule,
    CommonRouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  exports:[
    CommonModule,
    CommonRouterModule,
    NavBarComponent,
    ErrorComponent,
    OfflineComponent,
    ForgotPasswordComponent,
    AfterLoginComponent,
    SessionExpiredComponent,
    FooterComponent
  ]
})
export class CommonModules { }
