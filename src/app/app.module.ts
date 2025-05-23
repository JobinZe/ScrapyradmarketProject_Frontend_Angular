import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModules } from './common/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.interceptor';
import { StoreModule } from '@ngrx/store';
import {sessionReducer} from './login/store/auth-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserRegistrationService } from './login/services/user-reg.services';
import { LoginModule } from "./login/login.module";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');  
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CommonModules,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({ session: sessionReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    LoginModule
],
exports:[
  ReactiveFormsModule,
],
providers:[
  provideHttpClient(withInterceptorsFromDi()),
   {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: authFactory,
    multi: true,
    deps: [UserRegistrationService],
  },
],
  bootstrap: [ AppComponent ],

  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModuleModule { }
export function authFactory(authService:UserRegistrationService){
  return ()=>authService.checkIfAuthenticated()
}
