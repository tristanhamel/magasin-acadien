import { TestBed } from '@angular/core/testing';

import { Notifications } from './notifications.component';

// let fixture: any;
let notif: any;

describe('App', () => {
  beforeEach(() => {
    // TestBed.configureTestingModule({ declarations: [Notifications]});
    // fixture = TestBed.createComponent(Notifications);
    notif = new Notifications;
  });

  // it ('should work', () => {
  //   expect(fixture.componentInstance instanceof Notifications).toBe(true, 'should create Notifications');
  // });

  it('should toggle component\'s visibility', () => {
    expect(notif.show.content).toBe(false);
    notif.toggleNotifications();
    expect(notif.show.content).toBe(true);
  });
});
