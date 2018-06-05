import {Injectable} from '@angular/core';
import {LocalStorageService} from './localstorage.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  isLoggedIn = false;

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
      setTimeout(() => {
        res(this.isLoggedIn);
      }, 100);
    });
  }

  logOut() {
    this.isLoggedIn = false;
    this.localStorageService.removeItem('auth-token');
  }

  check() {
    return this.http.get<Observable<any>>(environment.BASE_URL + '/check')
      .pipe(tap((data) => {
        console.log('data', data);
          this.isLoggedIn = data;
          return null;
        }
        )
      );
  }

}
