import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RandomUserPageComponent} from './random-user-page/random-user-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthTruthyGuardService} from './services/auth-truthy-guard.service';
import {AuthFalsyGuardService} from './services/auth-falsy-guard.service';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'randUser', component: RandomUserPageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthFalsyGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
