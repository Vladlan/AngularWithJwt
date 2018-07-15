import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';


@Injectable()
export class RandomUserService {

  randomUser = null;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {}


  getRandomUser(): Observable<any> {
    const url = environment.BASE_URL + '/random-user';
    return this.http.get<Observable<any>>(url)
      .pipe( tap(
        (data) => {
          console.log(data);
          this.randomUser = data.user;
        },
        (error) => {
          console.log(error);
          this.authService.logOut();
          this.router.navigate(['/']);
      }
        )
      );
  }
}
