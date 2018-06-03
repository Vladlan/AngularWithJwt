import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class RandomUserService {
  constructor(private http: HttpClient) {}


  getRandomUser(): Observable<any> {
    const url = 'http://localhost:3000/random-user';
    return this.http.get<Observable<any>>(url);
  }
}
