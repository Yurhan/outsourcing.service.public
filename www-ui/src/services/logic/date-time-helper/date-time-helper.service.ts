import { IDateTimeHelperService } from './date-time-helper.service.d';

import * as dateformat from 'dateformat';

export class DateTimeHelperService implements IDateTimeHelperService {

  public toDatetimeLocal(date: Date): string {
    console.log(date);
    // let ten = function (i) {
    //   return (i < 10 ? '0' : '') + i;
    // },
    //   YYYY = date.getFullYear(),
    //   MM = ten(date.getMonth() + 1),
    //   DD = ten(date.getDate()),
    //   HH = ten(date.getHours()),
    //   II = ten(date.getMinutes()),
    //   SS = ten(date.getSeconds())
    //   ;
    // return YYYY + '-' + MM + '-' + DD + 'T' +
    //   HH + ':' + II + ':' + SS;
    return dateformat(date, 'isoDateTime');
  }

  public getNextMonthDate(date: Date): Date {
    let month, year;
    if (date.getMonth() === 11) {
      month = 0;
      year = date.getFullYear() + 1;
    } else {
      month = date.getMonth() + 1;
      year = date.getFullYear();
    }
    return new Date(year, month, 1);
  }

  public getPrevMonthDate(date: Date): Date {
    let month, year;

    if (date.getMonth() === 0) {
      month = 11;
      year = date.getFullYear() - 1;
    } else {
      month = date.getMonth() - 1;
      year = date.getFullYear();
    }
    return new Date(year, month, 1);
  }

  public formatTime(time: number): string {
    let sec = time % 60;
    let min = Math.floor(time / 60);
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }
}
