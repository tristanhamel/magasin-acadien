import {Component, OnInit} from '@angular/core';
import {Authenticate} from './app/services/authenticate.service';

@Component({
  selector: 'Root',
  template:
`<div class="main-container">
  <header></header>
  <div class="main-content">
    <router-outlet></router-outlet>
  </div>
  <Footer></Footer>
</div>`
})

export class AppComponent implements OnInit{
  constructor(private authenticate: Authenticate) {

  }

  ngOnInit(): void {
    this.authenticate.checkLocalStorage();
  }
}
