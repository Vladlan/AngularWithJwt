import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  isLoggedIn = false;

  logIn() {
    this.isLoggedIn = true;
  }

  logOut() {
    this.isLoggedIn = false;
  }

}
