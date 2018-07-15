import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthTruthyGuardService implements CanActivate {
  constructor(
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> |
    Promise<boolean> {
    return this.authService.isAuth().then( (isLoggedIn: boolean) => {
      console.log(`isLoggedIn = ${isLoggedIn} in auth-truthy-guard`);
      return isLoggedIn;
    });
  }
}
