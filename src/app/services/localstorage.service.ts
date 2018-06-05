import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  setItem(key: string, value: any): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    const item = localStorage.getItem(key);
    if (item === null) {
      return '';
    } else {
      return localStorage.getItem(key);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
