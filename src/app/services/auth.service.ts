import {Injectable} from '@angular/core';
import {LocalStorageService} from './localstorage.service';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  constructor(
    private localStorageService: LocalStorageService
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
}
