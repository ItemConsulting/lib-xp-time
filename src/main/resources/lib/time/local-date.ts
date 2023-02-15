import type {
  DateTimeFormatter,
  ZoneId,
  Month,
  Instant,
  LocalDateTime,
  ZonedDateTime,
  LocalTime,
  OffsetTime,
  OffsetDateTime,
  DayOfWeek,
  ZoneOffset,
} from "/lib/time";

/**
 * A date without a time-zone in the ISO-8601 calendar system, such as 2007-12-03.
 *
 * LocalDate is an immutable date-time object that represents a date, often viewed as year-month-day. Other date fields, such as day-of-year, day-of-week and week-of-year, can also be accessed. For example, the value "2nd October 2007" can be stored in a LocalDate.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/LocalDate.html}
 */
export const LocalDate = Java.type<LocalDateConstructor>("java.time.LocalDate");

interface LocalDateConstructor {
  EPOCH: LocalDate;
  MAX: LocalDate;
  MIN: LocalDate;
  now(): LocalDate;
  now(zone: ZoneId): LocalDate;
  of(year: number, month: number, dayOfMonth: number): LocalDate;
  of(year: number, month: Month, dayOfMonth: number): LocalDate;
  ofEpochDay(epochDay: number): LocalDate;
  ofInstant(instant: Instant, zone: ZoneId): LocalDate;
  ofYearDay(year: number, dayOfYear: number): LocalDate;
  parse(text: string): LocalDate;
  parse(text: string, formatter: DateTimeFormatter): LocalDate;
}

export interface LocalDate {
  atStartOfDay(): LocalDateTime;
  atStartOfDay(zone: ZoneId): ZonedDateTime;
  atTime(hour: number, minute: number): LocalDateTime;
  atTime(hour: number, minute: number, second: number): LocalDateTime;
  atTime(hour: number, minute: number, second: number, nanoOfSecond: number): LocalDateTime;
  atTime(time: LocalTime): LocalDateTime;
  atTime(time: OffsetTime): OffsetDateTime;
  datesUntil(endExclusive: LocalDate): unknown;
  format(formatter: DateTimeFormatter): string;
  getDayOfMonth(): number;
  getDayOfWeek(): DayOfWeek;
  getDayOfYear(): number;
  getMonth(): Month;
  getMonthValue(): number;
  getYear(): number;
  hashCode(): number;
  isLeapYear(): boolean;
  lengthOfMonth(): number;
  lengthOfYear(): number;
  minusDays(daysToSubtract: number): LocalDate;
  minusMonths(monthsToSubtract: number): LocalDate;
  minusWeeks(weeksToSubtract: number): LocalDate;
  minusYears(yearsToSubtract: number): LocalDate;
  plusDays(daysToAdd: number): LocalDate;
  plusMonths(monthsToAdd: number): LocalDate;
  plusWeeks(weeksToAdd: number): LocalDate;
  plusYears(yearsToAdd: number): LocalDate;
  toEpochSecond(time: LocalTime, offset: ZoneOffset): number;
  withDayOfMonth(dayOfMonth: number): LocalDate;
  withDayOfYear(dayOfYear: number): LocalDate;
  withMonth(month: number): LocalDate;
  withYear(year: number): LocalDate;
}
