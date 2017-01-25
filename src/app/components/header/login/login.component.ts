import { Component, Output, EventEmitter } from '@angular/core';
import { Authenticate } from '../../../services/services';

import './login.scss';

@Component({
  selector: 'login',
  template: `
<div class="login">
  <form (ngSubmit)="onSubmit()">
    <label for="email">
      Email
    </label>
    <input id="email"
           type="text" 
           name="email"
           [(ngModel)]="model.email"
           required>
    <label for="password">
      Password
    </label>
    <input id="password"
           type="password"
           name="password"
           [(ngModel)]="model.password"
           required>
    <input type="submit" 
           value="Submit">
  </form>
</div>
`
})

export class Login {
  model: {
    email: string,
    password: string
  };


  @Output() onLogin: EventEmitter<any> = new EventEmitter();

  constructor(private authenticate: Authenticate) {
    this.model = {
      email: '',
      password: ''
    };
  }

  onSubmit(): void {
    this.authenticate.login(this.model.email, this.model.password)
      .subscribe( result => {
        if (result) {
          // TODO: do sth meaningful on success
        } else {
          // TODO: do sth meaningful on failure
        }
        this.onLogin.emit(result);
      });
  }
}
