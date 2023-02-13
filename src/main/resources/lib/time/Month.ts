/**
 * A month-of-year, such as 'July'.
 *
 * Month is an enum representing the 12 months of the year - January, February, March, April, May, June, July, August, September, October, November and December.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/Month.html}
 */
export const Month = Java.type<MonthConstructor>("java.time.Month");

export type MonthNumber = 1|2|3|4|5|6|7|8|9|10|11|12;

export interface MonthConstructor {
  of(month: MonthNumber): Month;
}

export interface Month {
  getValue(): MonthNumber;
  firstDayOfYear(leapYear: boolean): number;
  firstMonthOfQuarter(): Month;
  length(leapYear: boolean): number;
  maxLength(): number;
  minLength(): number;
  minus(months: number): Month;
  plus(months: number): Month;
}
