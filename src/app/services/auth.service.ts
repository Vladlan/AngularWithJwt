import {Injectable} from '@angular/core';
import {LocalStorageService} from './localstorage.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  isAuthorizationChecked = true;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
  }

  logIn(data: {
    message: string,
    token: string,
    expiresIn: number
  }) {
    const expiresAt = moment().add(data.expiresIn,'second' );

    this.localStorageService.setItem('auth-token', data.token);
    this.localStorageService.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logOut() {
    this.localStorageService.removeItem('auth-token');
    this.localStorageService.removeItem('expires_at');
  }

  // check() {
  //   return this.http.get(environment.BASE_URL + '/check')
  //     .pipe(tap((data: boolean) => {
  //         this.isLoggedIn = data;
  //         return data;
  //       }
  //       )
  //     );
  // }

}
