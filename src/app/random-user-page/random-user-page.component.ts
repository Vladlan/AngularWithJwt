import {Component, OnInit} from '@angular/core';
import {RandomUserService} from '../services/random-user-service';

@Component({
  selector: 'app-random-user-page',
  templateUrl: './random-user-page.component.html',
  styleUrls: ['./random-user-page.component.css']
})
export class RandomUserPageComponent implements OnInit {
  constructor(private randomUserService: RandomUserService) {}

  randomUser = null;

  ngOnInit() {
    this.randomUser = this.randomUserService.randomUser;
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
