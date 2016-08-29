import {Component} from '@angular/core';

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

export class TimeCounter {
  time: Number;
  timeLeft: string;
  deadline: Date;
  seconds: number;
  minutes: number;
  hours: number;

  constructor() {
    console.log(this.deadline);
    const time = Date.now() - this.deadline.getTime();

    if (time > 1000 * 60 * 60 * 48) {
      this.timeLeft = (Math.floor(time / (1000 * 60 * 60))) + ' days left';
    } else if (time > 1000 * 60 * 60 * 24) {
      this.timeLeft = (Math.floor(time / (1000 * 60 * 60 * 24))) + ' hours left';
    } else if (time < 0) {
      this.timeLeft = 'The deadline to place bids on this product has passed.';
    } else {
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
