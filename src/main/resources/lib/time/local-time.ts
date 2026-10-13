import type {
  ChronoUnit,
  DateTimeFormatter,
  Duration,
  Instant,
  LocalDate,
  LocalDateTime,
  OffsetTime,
  ZoneId,
  ZoneOffset,
} from "/lib/time";
import type { Temporal } from "/lib/time/temporal/temporal";

/**
 * A time without a time-zone in the ISO-8601 calendar system, such as 10:15:30.
 *
 * LocalTime is an immutable date-time object that represents a time, often viewed as hour-minute-second. Time is represented to nanosecond precision. For example, the value "13:45.30.123456789" can be stored in a LocalTime.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalTime.html}
 */
export const LocalTime = Java.type<LocalTimeConstructor>("java.time.LocalTime");

export interface LocalTimeConstructor {
  MAX: LocalTime;
  MIDNIGHT: LocalTime;
  MIN: LocalTime;
  NOON: LocalTime;
  now(): LocalTime;
  now(zone: ZoneId): LocalTime;
  of(hour: number, minute: number): LocalTime;
  of(hour: number, minute: number, second: number): LocalTime;
  of(hour: number, minute: number, second: number, nanoOfSecond: number): LocalTime;
  ofInstant(instant: Instant, zone: ZoneId): LocalTime;
  ofNanoOfDay(nanoOfDay: number): LocalTime;
  ofSecondOfDay(SecondOfDay: number): LocalTime;
  parse(text: string): LocalTime;
  parse(text: string, formatter: DateTimeFormatter): LocalTime;
}

export interface LocalTime {
  minus(amountToSubtract: Duration): LocalTime;
  minus(amountToSubtract: number, unit: ChronoUnit): LocalTime;
  plus(amountToAdd: Duration): LocalTime;
  plus(amountToAdd: number, unit: ChronoUnit): LocalTime;
  /**
   * Sets every unit smaller than the given one to zero, so truncating to hours gives the start of the hour
   */
  truncatedTo(unit: ChronoUnit): LocalTime;
  /**
   * The number of whole units until the other one. It is negative if the other one is earlier.
   */
  until(endExclusive: Temporal, unit: ChronoUnit): number;
  atDate(date: LocalDate): LocalDateTime;
  atOffset(offset: ZoneOffset): OffsetTime;
  compareTo(other: LocalTime): number;
  format(formatter: DateTimeFormatter): string;
  toString(): string;
  hashCode(): number;
  getHour(): number;
  getMinute(): number;
  getNano(): number;
  getSecond(): number;
  isAfter(other: LocalTime): boolean;
  isBefore(other: LocalTime): boolean;
  minusHours(hoursToSubtract: number): LocalTime;
  minusMinutes(minutesToSubtract: number): LocalTime;
  minusNanos(nanosToSubtract: number): LocalTime;
  minusSeconds(secondsToSubtract: number): LocalTime;
  plusHours(hoursToAdd: number): LocalTime;
  plusMinutes(minutesToAdd: number): LocalTime;
  plusNanos(nanosToAdd: number): LocalTime;
  plusSeconds(secondsToAdd: number): LocalTime;
  toEpochSecond(date: LocalDate, offset: ZoneOffset): number;
  toNanoOfDay(): number;
  toSecondOfDay(): number;
  withHour(hour: number): LocalTime;
  withMinute(minute: number): LocalTime;
  withNano(nano: number): LocalTime;
  withSecond(second: number): LocalTime;
}
