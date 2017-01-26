import {Component} from '@angular/core';

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

export class AppComponent {
}
