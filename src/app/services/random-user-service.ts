import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';


@Injectable()
export class RandomUserService {

  randomUser = null;

  constructor(private http: HttpClient) {
  }


  getRandomUser(): Observable<any> {
    const url = environment.BASE_URL + '/random-user';
    return this.http.get<Observable<any>>(url)
      .pipe( tap(data => this.randomUser = data ));
  }
}
