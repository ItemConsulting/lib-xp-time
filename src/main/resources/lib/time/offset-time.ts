import type { ZoneId, ZoneOffset, LocalDate, LocalTime, Instant, DateTimeFormatter, OffsetDateTime } from "/lib/time";

/**
 * A time without a time-zone in the ISO-8601 calendar system, such as 10:15:30.
 *
 * LocalTime is an immutable date-time object that represents a time, often viewed as hour-minute-second. Time is represented to nanosecond precision. For example, the value "13:45.30.123456789" can be stored in a LocalTime.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/OffsetTime.html}
 */
export const OffsetTime = Java.type<OffsetTimeConstructor>("java.time.OffsetTime");

export interface OffsetTimeConstructor {
  MAX: OffsetTime;
  MIN: OffsetTime;
  now(): OffsetTime;
  now(zone: ZoneId): OffsetTime;
  of(hour: number, minute: number, second: number, nanoOfSecond: number, offset: ZoneOffset): OffsetTime;
  of(time: LocalTime, offset: ZoneOffset): OffsetTime;
  ofInstant(instant: Instant, zone: ZoneId): OffsetTime;
  parse(text: string): OffsetTime;
  parse(text: string, formatter: DateTimeFormatter): OffsetTime;
}

export interface OffsetTime {
  atDate(date: LocalDate): OffsetDateTime;
  compareTo(other: OffsetTime): number;
  format(formatter: DateTimeFormatter): string;
  getHour(): number;
  getMinute(): number;
  getNano(): number;
  getOffset(): ZoneOffset;
  getSecond(): number;
  hashCode(): number;
  toString(): string;
  isAfter(other: OffsetTime): boolean;
  isBefore(other: OffsetTime): boolean;
  isEqual(other: OffsetTime): boolean;
  minusHours(hours: number): OffsetTime;
  minusMinutes(minutes: number): OffsetTime;
  minusNanos(nanos: number): OffsetTime;
  minusSeconds(seconds: number): OffsetTime;
  plusHours(hours: number): OffsetTime;
  plusMinutes(minutes: number): OffsetTime;
  plusNanos(nanos: number): OffsetTime;
  plusSeconds(seconds: number): OffsetTime;
  toEpochSecond(date: LocalDate): number;
  toLocalTime(): LocalTime;
  withHour(hour: number): OffsetTime;
  withMinute(minute: number): OffsetTime;
  withNano(nanoOfSecond: number): OffsetTime;
  withOffsetSameInstant(offset: ZoneOffset): OffsetTime;
  withOffsetSameLocal(offset: ZoneOffset): OffsetTime;
  withSecond(second: number): OffsetTime;
}
