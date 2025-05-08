import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    LoginRoutingModule,
    SignUpComponent,
    LoaderComponent
  ]
})
export class LoginModule { }
