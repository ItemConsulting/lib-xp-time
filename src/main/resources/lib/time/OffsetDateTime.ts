import {ZoneId} from "/lib/time/ZoneId";
import {ZoneOffset} from "/lib/time/ZoneOffset";
import {LocalDate} from "/lib/time/LocalDate";
import {LocalTime} from "/lib/time/LocalTime";
import {LocalDateTime} from "/lib/time/LocalDateTime";
import {Instant} from "/lib/time/Instant";
import {DateTimeFormatter} from "/lib/time/Util";
import {ZonedDateTime} from "/lib/time/ZonedDateTime";
import {DayOfWeek} from "/lib/time/DayOfWeek";
import {Month, MonthNumber} from "/lib/time/Month";
import {OffsetTime} from "/lib/time/OffsetTime";

/**
 * A date-time with an offset from UTC/Greenwich in the ISO-8601 calendar system, such as 2007-12-03T10:15:30+01:00.
 *
 * OffsetDateTime is an immutable representation of a date-time with an offset. This class stores all date and time fields, to a precision of nanoseconds, as well as the offset from UTC/Greenwich. For example, the value "2nd October 2007 at 13:45:30.123456789 +02:00" can be stored in an OffsetDateTime.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/OffsetDateTime.html}
 */
export const OffsetDateTime = Java.type<OffsetDateTimeConstructor>("java.time.OffsetDateTime");

export interface OffsetDateTimeConstructor {
  MAX: OffsetDateTime;
  MIN: OffsetDateTime;
  now(): OffsetDateTime;
  now(zone: ZoneId): OffsetDateTime;
  of(year: number, month: number, dayOfMonth: number, hour: number, minute: number, second: number, nanoOfSecond: number, offset: ZoneOffset): OffsetDateTime;
  of(date: LocalDate, time: LocalTime, offset: ZoneOffset): OffsetDateTime;
  of(dateTime: LocalDateTime, offset: ZoneOffset): OffsetDateTime;
  ofInstant(instant: Instant, zone: ZoneId): OffsetDateTime;
  parse(text: string): OffsetDateTime;
  parse(text: string, formatter: DateTimeFormatter): OffsetDateTime;
}

export interface OffsetDateTime {
  atZoneSameInstant(zone: ZoneId): ZonedDateTime;
  atZoneSimilarLocal(zone: ZoneId): ZonedDateTime;
  compareTo(other: OffsetDateTime): number;
  format(formatter: DateTimeFormatter): string;
  getDayOfMonth(): number;
  getDayOfWeek(): DayOfWeek;
  getDayOfYear(): number;
  getHour(): number;
  getMinute(): number;
  getMonth(): Month;
  getMonthValue(): number;
  getNano(): number;
  getOffset(): ZoneOffset;
  getSecond(): number;
  getYear(): number;
  hashCode(): number;
  isAfter(other: OffsetDateTime): boolean;
  isBefore(other: OffsetDateTime): boolean;
  isEqual(other: OffsetDateTime): boolean;
  minusDays(days: number): OffsetDateTime;
  minusHours(hours: number): OffsetDateTime;
  minusMinutes(minutes: number): OffsetDateTime;
  minusMonths(months: number): OffsetDateTime;
  minusNanos(nanos: number): OffsetDateTime;
  minusSeconds(seconds: number): OffsetDateTime;
  minusWeeks(weeks: number): OffsetDateTime;
  minusYears(years: number): OffsetDateTime;
  plusDays(days: number): OffsetDateTime;
  plusHours(hours: number): OffsetDateTime;
  plusMinutes(minutes: number): OffsetDateTime;
  plusMonths(months: number): OffsetDateTime;
  plusNanos(nanos: number): OffsetDateTime;
  plusSeconds(seconds: number): OffsetDateTime;
  plusWeeks(weeks: number): OffsetDateTime;
  plusYears(years: number): OffsetDateTime;
  toEpochSecond(): number;
  toInstant(): Instant;
  toLocalDate(): LocalDate;
  toLocalDateTime(): LocalDateTime;
  toLocalTime(): LocalTime;
  toOffsetTime(): OffsetTime;
  toZonedDateTime(): ZonedDateTime;
  withDayOfMonth(dayOfMonth: number): OffsetDateTime;
  withDayOfYear(dayOfYear: number): OffsetDateTime;
  withHour(hour: number): OffsetDateTime;
  withMinute(minute: number): OffsetDateTime;
  withMonth(month: number): OffsetDateTime;
  withNano(nanoOfSecond: number): OffsetDateTime;
  withOffsetSameInstant(offset: ZoneOffset): OffsetDateTime;
  withOffsetSameLocal(offset: ZoneOffset): OffsetDateTime;
  withSecond(second: number): OffsetDateTime;
  withYear(year: number): OffsetDateTime;
}
