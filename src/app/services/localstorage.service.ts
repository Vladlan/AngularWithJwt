import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  setItem(token: string, value: any): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(token, value);
  }

  removeItem(token: string): void {
    localStorage.removeItem(token);
  }

}
