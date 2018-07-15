import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/localstorage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  Email = 'lanvlad@mail.ru';
  Password = '12345';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    const Email = form.value.Email;
    const Password = form.value.Password;

    this.login(Email, Password).subscribe(
      (data: { token: string } ) => {
        if (data) {
          console.log(data);
          this.localStorageService.setItem('auth-token', data.token);
          this.authService.logIn();
          this.router.navigate(['/randUser']);
        } else {
          console.log(data);
          alert('Wrong password or Name');
        }
      },
      error => {
        alert(error.error.error.message);
      }
    );
  }

  login(email, password) {
    return this.http.post(environment.BASE_URL + '/login', {
      email: email,
      password: password
    });
  }
}
