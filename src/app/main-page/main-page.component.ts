import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    // if user entered again we need to check does he/she need to login again
    this.authService.isAuth().then((isLoggedIn: boolean) => {
      // so if user entered some time ago and has his token valid in local storage
      // we need to change "isLoggedIn" variable to true
      if (!isLoggedIn) {
        this.authService.check().subscribe();
      }
    });
  }

}
