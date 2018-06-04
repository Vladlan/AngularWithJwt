import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  submitted = false;

  constructor(private http: HttpClient, appComponent: AppComponent) {}


  ngOnInit() {}

  submitForm(form: NgForm) {
    this.submitted = true;
    console.log('form submitted');
    console.log(form);
    const Name = form.value.Name;
    const Password = form.value.Password;

    this.login(Name, Password).subscribe(
      (data: any) => {
        console.log(data);
      }
    );

  }

  login(name, password) {
    const API_URL = 'http://localhost:3000';
    return this.http.post(API_URL + '/login', {
      name: name,
      password: password
    } );
  }
}
