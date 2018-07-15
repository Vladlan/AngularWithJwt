import {Injectable} from '@angular/core';
import {LocalStorageService} from './localstorage.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  isLoggedIn = false;
  isAuthorizationChecked = true;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
  }

  logIn() {
    this.isLoggedIn = true;
  }

  isAuth() {
    return new Promise((res, rej) => {
      console.log(`isLoggedIn = ${this.isLoggedIn} in auth.service`);
      res(this.isLoggedIn);
    });
  }

  logOut() {
    this.isLoggedIn = false;
    this.localStorageService.removeItem('auth-token');
  }

  check() {
    return this.http.get(environment.BASE_URL + '/check')
      .pipe(tap((data: boolean) => {
          this.isLoggedIn = data;
          return data;
        }
        )
      );
  }

}
