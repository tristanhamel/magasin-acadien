import { Component } from '@angular/core';

import { NewUser } from '../../models';
import { Authenticate } from '../../services/authenticate.service';

import './signup.scss';

@Component({
  selector: 'signup',
  template: require('./signup.html')
})

export class Signup {
  model: NewUser = new NewUser;
  showError: boolean = false;
  submitted: boolean = false;
  success: boolean = false;

  constructor(private authenticate: Authenticate) {
  }

  onSubmit() {
    this.submitted = true;

    this.authenticate.signup(this.model)
      .subscribe( result => {
        this.submitted = false;
        if ( result ) {
          this.success = true;
        } else {
          this.showError = true;
        }
      });
  }
}
