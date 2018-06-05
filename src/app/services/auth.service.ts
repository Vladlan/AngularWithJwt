import {Injectable} from '@angular/core';
import {LocalStorageService} from './localstorage.service';

@Injectable()
export class AuthService {

  isLoggedIn = false;

  constructor(private localStorageService: LocalStorageService) {}

  logIn() {
    this.isLoggedIn = true;
  }

  isAuth() {
    return new Promise( (res, rej) => {
      setTimeout( () => { res(this.isLoggedIn);
      }, 100);
    });
  }

  logOut() {
    this.isLoggedIn = false;
    this.localStorageService.removeItem('auth-token');
  }

}
