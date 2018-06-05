import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  Name = 'Vlad';
  Password = '12345';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit() {
  }

  submitForm(form: NgForm) {
    const Name = form.value.Name;
    const Password = form.value.Password;

    this.login(Name, Password).subscribe(
      (data: boolean) => {
        console.log(data);
        if (data) {
          this.authService.logIn();
          this.router.navigate(['/randUser']);

        } else {
          alert('Wrong password or Name');
        }
      },
      error => { alert(error); }
    );
  }

  login(name, password) {
    return this.http.post(environment.BASE_URL + '/login', {
      name: name,
      password: password
    });
  }
}
