import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import './user-menu.scss';

import { User } from '../../models';
import { UserService, Authenticate } from '../../services/services';

@Component({
    selector: 'user-menu',
    template: require('./user-menu.html')
})

export class UserMenu implements OnInit {
  currentUser: User;
  show: boolean;
  showSignup: boolean;
  showLogin: boolean;

  constructor(
    private userService: UserService,
    private authenticate: Authenticate,
    private router: Router
  ) {
    this.show = false;
    this.showSignup = false;
  }

  ngOnInit(): void {
    this.userService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        }
      );
  }

  logout(): void {
    this.authenticate.logout();
    this.router.navigate([''])
      .then( (response: boolean) => {
        if (response) {
          this.show = false;
        }
      });
  }

  toggleMenu(): void {
    this.show = !this.show;
  }

  toggleLogin(): void {
    this.showSignup = false;
    this.showLogin = !this.showLogin;
  }

  toggleSignup(): void {
    this.showLogin = false;
    this.showSignup = !this.showSignup;
  }

  onLogin($event: boolean): void {
    if ($event) {
      this.toggleMenu();
    }
  }
}
