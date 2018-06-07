import {Component, OnInit} from '@angular/core';
import {RandomUserService} from '../services/random-user-service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-random-user-page',
  templateUrl: './random-user-page.component.html',
  styleUrls: ['./random-user-page.component.css']
})
export class RandomUserPageComponent implements OnInit {
  constructor(
    private randomUserService: RandomUserService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  randomUser = null;

  ngOnInit() {
    this.randomUser = this.randomUserService.randomUser;

    // if user entered again we need to check does he/she need to login again
    this.authService.isAuth().then((isLoggedIn: boolean) => {
      // so if user entered some time ago and has his token valid in local storage
      // we need to change "isLoggedIn" variable to true
      if (!isLoggedIn) {
        this.authService.check().subscribe(
          (data: boolean) => {
            if (!data) {
              this.router.navigate(['/']);
            }
          }
        );
      }
    });
  }

  getRandomUser() {
    this.randomUserService.getRandomUser()
      .subscribe(
        (data: any) => {
          this.randomUser = this.randomUserService.randomUser;
        }
      );
  }

}
