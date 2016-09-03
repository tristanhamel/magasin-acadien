import {Component, OnChanges} from '@angular/core';

import './time-counter.scss';

@Component({
  host: {
    class: 'time-counter'
  },
  selector: 'time-counter',
  template: require('./time-counter.html'),
  inputs: [
    'deadline'
   ],
})

export class TimeCounter implements OnChanges {
//   time: number;
  timeLeft: string;
//  deadline: Date;
  seconds: number;
  minutes: number;
  hours: number;

  ngOnChanges(changes: any) {
    var deadline: number = changes.deadline.currentValue;
    if (deadline) {
      this.parseTime(deadline);
    }
  }

  parseTime(deadline: number) {
    const time = (deadline * 1000) - Date.now();

    if (time > 1000 * 60 * 60 * 48) {
      // there are more than 2 days left
      this.timeLeft = (Math.floor(time / (1000 * 60 * 60))) + ' days left';
    } else if (time > 1000 * 60 * 60 * 24) {
      // there is between 48 and 24 hours left
      this.timeLeft = (Math.floor(time / (1000 * 60 * 60))) + ' hours left';
    } else if (time < 0) {
      // the deadline is passed
      this.timeLeft = 'The deadline to place bids on this product has passed.';
    } else {
      // there is less than 24 hours left
      this.hours = Math.floor(time / (1000 * 60 * 60));
      this.minutes = (time % (1000 * 60 * 60)) / (1000 * 60);
      this.seconds = (time % (1000 * 60)) / 1000;
      this.timeLeft = this.hours + ' h ' + this.minutes + ' min ' + this.seconds + ' sec left';

      setInterval(
        () => {
          if (this.seconds > 0) {
            this.seconds -= 1 ;
          } else {
            this.seconds = 59;

            if (this.minutes > 0) {
              this.minutes -= 1;
            } else {
              this.minutes = 59;

              if (this.hours > 0) {
                this.hours -= 1;
              } else {
                this.timeLeft = 'The deadline to place bids on this product has passed.';
              }
            }
          }
        },
      1000);
    }
  }
}
