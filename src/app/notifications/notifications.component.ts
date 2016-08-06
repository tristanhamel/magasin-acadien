import {Component} from '@angular/core';

import './notifications.scss';

@Component({
  selector: 'notifications',
  template: require('./notifications.html')
})

export class Notifications {
  show = {
    content: false
  };

  toggleNotifications() {
    this.show.content = !this.show.content;
  }
}
