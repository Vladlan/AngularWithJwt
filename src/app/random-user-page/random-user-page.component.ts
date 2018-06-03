import { Component } from '@angular/core';
import {RandomUserService} from '../services/random-user-service';

@Component({
  selector: 'app-random-user-page',
  templateUrl: './random-user-page.component.html',
  styleUrls: ['./random-user-page.component.css']
})
export class RandomUserPageComponent {
  constructor(private randomUserService: RandomUserService) {}

  randomUser = null;

  getRandomUser() {
    this.randomUserService.getRandomUser()
      .subscribe(
        (data: any) => {
          this.randomUser = data;
        }
      );
  }

}
