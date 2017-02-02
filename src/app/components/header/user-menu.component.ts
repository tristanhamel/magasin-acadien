import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import './user-menu.scss';

import { User } from '../../models';
import { Authenticate } from '../../services/services';

@Component({
  selector: 'user-menu',
  template: require('./user-menu.html')
})

export class UserMenu implements OnInit {
  currentUser: User;
  show: boolean;

  constructor(
    private userService: Authenticate,
    private router: Router
  ) {
    this.show = false;

    this.router.events.subscribe( event => {
      if (event instanceof NavigationStart) {
        this.show = false;
      }
    });
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
    this.userService.logout();
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

  onLogin($event: boolean): void {
    if ($event) {
      this.toggleMenu();
    }
  }
}
