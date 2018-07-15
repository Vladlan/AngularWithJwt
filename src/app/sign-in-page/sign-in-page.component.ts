import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {

  Email = 'lanvlad@mail.ru';
  Surname = 'Lan';
  Name = 'Vlad';
  Password = '12345';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit() {}

  submitForm(form: NgForm) {
    const Email = form.value.Email;
    const Surname = form.value.Surname;
    const Name = form.value.Name;
    const Password = form.value.Password;

    this.sendUserToDb(Email, Surname, Name, Password).subscribe(
      (data: {
        message: string,
        token: string,
        expiresIn: number
      }) => {
        console.log(data);
        console.log('User has been added');

        this.authService.logIn(data);
        this.router.navigate(['/']);
      },
      error => {
          alert(error.error.error.message);
      }
    );
  }


  sendUserToDb(email, surname, name, password) {
    return this.http.post(environment.BASE_URL + '/addUser', {
      email: email,
      surname: surname,
      name: name,
      password: password
    });
  }

}
