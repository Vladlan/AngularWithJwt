import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  isLoggedIn = false;

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
  }

}
