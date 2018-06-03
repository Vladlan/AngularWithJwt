import {AfterContentChecked, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  isLogined = false;
  currentUrl = '';

  constructor(private route: ActivatedRoute) {
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked()');
    if (this.route.snapshot.children.length > 0) {
      this.currentUrl = this.route.snapshot.children[0].routeConfig.path;
    }
  }

  logIn() {
    this.isLogined = !this.isLogined;
    console.log(this.route.snapshot.children[0].routeConfig.path);
  }


}
