import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RandomUserService} from './services/random-user-service';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RandomUserPageComponent } from './random-user-page/random-user-page.component';
import {AppRoutingModule} from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {AuthService} from './services/auth.service';
import {AuthFalsyGuardService} from './services/auth-falsy-guard.service';
import {LocalStorageService} from './services/localstorage.service';
import {httpInterceptorProviders} from './http-interceptors';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import {AuthTruthyGuardService} from './services/auth-truthy-guard.service';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    RandomUserPageComponent,
    MainPageComponent,
    LoginPageComponent,
    SignInPageComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'auth-token',
      headerName: 'auth-token',
    }),
    AppRoutingModule,
  ],
  providers: [
    httpInterceptorProviders,
    RandomUserService,
    AuthService,
    AuthFalsyGuardService,
    AuthTruthyGuardService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
