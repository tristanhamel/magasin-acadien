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
  timeLeft: string;


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
      let hours = Math.floor(time / (1000 * 60 * 60));
      let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((time % (1000 * 60)) / 1000);
      this.timeLeft = hours + 'h ' + minutes + 'min ' + seconds + 's left';

      setInterval(
        () => {
          if (seconds > 0) {
            seconds -= 1 ;
          } else {
            seconds = 59;

            if (minutes > 0) {
              minutes -= 1;
            } else {
              minutes = 59;

              if (hours > 0) {
                hours -= 1;
              } else {
                this.timeLeft = 'The deadline to place bids on this product has passed.';
                return;
              }
            }
          }
          this.timeLeft = hours + 'h ' + minutes + 'min ' + seconds + 's left';
        },
      1000);
    }
  }
}
