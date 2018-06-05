import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';


@Injectable()
export class RandomUserService {
  constructor(private http: HttpClient) {}


  getRandomUser(): Observable<any> {
    const url = environment.BASE_URL + '/random-user';
    return this.http.get<Observable<any>>(url);
  }
}
