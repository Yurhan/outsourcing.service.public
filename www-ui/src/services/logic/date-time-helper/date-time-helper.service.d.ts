export interface IDateTimeHelperService {
  toDatetimeLocal(date: Date): string;
  getNextMonthDate(date: Date): Date;
  getPrevMonthDate(date: Date): Date;
  formatTime(time: number): string;
}
