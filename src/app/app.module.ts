import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RandomUserService} from './services/random-user-service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RandomUserPageComponent } from './random-user-page/random-user-page.component';
import {AppRoutingModule} from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {AuthService} from './services/auth.service';
import {AuthTruthyGuardService} from './services/auth-truthy-guard.service';
import {AuthFalsyGuardService} from './services/auth-falsy-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    RandomUserPageComponent,
    MainPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ RandomUserService, AuthService, AuthTruthyGuardService, AuthFalsyGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
