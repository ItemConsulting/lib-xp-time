import type {
  DateTimeFormatter,
  Month,
  LocalDate,
  LocalTime,
  ZoneOffset,
  Instant,
  ZoneId,
  DayOfWeek,
  OffsetDateTime,
  ZonedDateTime,
} from "/lib/time";

/**
 * LocalDateTime is an immutable date-time object that represents a date-time
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/LocalDateTime.html}
 */
export const LocalDateTime = Java.type<LocalDateTimeConstructor>("java.time.LocalDateTime");

export interface LocalDateTimeConstructor {
  MAX: LocalDateTime;
  MIN: LocalDateTime;
  now(): LocalDateTime;
  now(zone: ZoneId): LocalDateTime;
  parse(text: string): LocalDateTime;
  parse(text: string, formatter: DateTimeFormatter): LocalDateTime;
  of(year: number, month: number, dayOfMonth: number, hour: number, minute: number): LocalDateTime;
  of(year: number, month: number, dayOfMonth: number, hour: number, minute: number, second: number): LocalDateTime;
  of(
    year: number,
    month: number,
    dayOfMonth: number,
    hour: number,
    minute: number,
    second: number,
    nanoOfSecond: number,
  ): LocalDateTime;
  of(
    year: number,
    month: Month,
    dayOfMonth: number,
    hour: number,
    minute: number,
    second: number,
    nanoOfSecond: number,
  ): LocalDateTime;
  of(
    year: number,
    month: Month,
    dayOfMonth: number,
    hour: number,
    minute: number,
    second: number,
    nanoOfSecond: number,
  ): LocalDateTime;
  of(
    year: number,
    month: Month,
    dayOfMonth: number,
    hour: number,
    minute: number,
    second: number,
    nanoOfSecond: number,
  ): LocalDateTime;
  of(date: LocalDate, time: LocalTime): LocalDateTime;
  ofEpochSecond(epochSecond: number, nanoOfSecond: number, offset: ZoneOffset): LocalDateTime;
  ofInstant(instant: Instant, zone: ZoneId): LocalDateTime;
}

export interface LocalDateTime {
  atOffset(offset: ZoneOffset): OffsetDateTime;
  atZone(zone: ZoneId): ZonedDateTime;
  format(formatter: DateTimeFormatter): string;
  toString(): string;
  hashCode(): number;
  getDayOfMonth(): number;
  getDayOfWeek(): DayOfWeek;
  getDayOfYear(): number;
  getHour(): number;
  getMinute(): number;
  getMonth(): Month;
  getMonthValue(): number;
  getNano(): number;
  getSecond(): number;
  getYear(): number;
  isAfter(other: LocalDateTime): boolean;
  isBefore(other: LocalDateTime): boolean;
  isEqual(other: LocalDateTime): boolean;
  minusDays(days: number): LocalDateTime;
  minusHours(hours: number): LocalDateTime;
  minusMinutes(minutes: number): LocalDateTime;
  minusMonths(months: number): LocalDateTime;
  minusNanos(nanos: number): LocalDateTime;
  minusSeconds(seconds: number): LocalDateTime;
  minusWeeks(weeks: number): LocalDateTime;
  minusYears(years: number): LocalDateTime;
  plusDays(days: number): LocalDateTime;
  plusHours(hours: number): LocalDateTime;
  plusMinutes(minutes: number): LocalDateTime;
  plusMonths(months: number): LocalDateTime;
  plusNanos(nanos: number): LocalDateTime;
  plusSeconds(seconds: number): LocalDateTime;
  plusWeeks(weeks: number): LocalDateTime;
  plusYears(years: number): LocalDateTime;
  toLocalDate(): LocalDate;
  toLocalTime(): LocalTime;
  withDayOfMonth(dayOfMonth: number): LocalDateTime;
  withDayOfYear(dayOfYear: number): LocalDateTime;
  withHour(hour: number): LocalDateTime;
  withMinute(minute: number): LocalDateTime;
  withMonth(month: number): LocalDateTime;
  withNano(nano: number): LocalDateTime;
  withSecond(second: number): LocalDateTime;
  withYear(year: number): LocalDateTime;

  // from java.time.chrono.ChronoLocalDateTime
  toEpochSecond(offset: ZoneOffset): number;
  toInstant(offset: ZoneOffset): Instant;
}
