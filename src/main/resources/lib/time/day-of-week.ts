/**
 *  DayOfWeek is an enum representing the 7 days of the week - Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/DayOfWeek.html}
 */
export const DayOfWeek = Java.type<DayOfWeekConstructor>("java.time.DayOfWeek");

export type WeekDayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface DayOfWeekConstructor {
  of(dayOfWeek: WeekDayNumber): DayOfWeek;
  valueOf(name: string): DayOfWeek;
  values(): DayOfWeek[];
}

export interface DayOfWeek {
  getValue(): WeekDayNumber;
  minus(days: number): DayOfWeek;
  plus(days: number): DayOfWeek;
  toString(): string;
}
