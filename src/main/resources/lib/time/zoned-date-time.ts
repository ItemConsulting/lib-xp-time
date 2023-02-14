import type {DateTimeFormatter, ZoneId, ZoneOffset, LocalDate, LocalTime, LocalDateTime,
  Instant, OffsetDateTime, DayOfWeek, Month} from "/lib/time";

/**
 * ZonedDateTime is an immutable representation of a date-time with a time-zone.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/ZonedDateTime.html}
 */
export const ZonedDateTime = Java.type<ZonedDateTimeConstructor>("java.time.ZonedDateTime");

export interface ZonedDateTimeConstructor {
  now(): ZonedDateTime;
  now(zone: ZoneId): ZonedDateTime;
  of(year: number, month: number, dayOfMonth: number, hour: number, minute: number, second: number, nanoOfSecond: number, zone: ZoneId): ZonedDateTime;
  of(date: LocalDate, time: LocalTime, zone: ZoneId): ZonedDateTime;
  of(localDateTime: LocalDateTime, zone: ZoneId): ZonedDateTime;
  ofInstant(instant: Instant, zone: ZoneId): ZonedDateTime;
  ofInstant(localDateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId): ZonedDateTime;
  ofLocal(localDateTime: LocalDateTime, zone: ZoneId, preferredOffset: ZoneOffset): ZonedDateTime;
  ofStrict(localDateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId): ZonedDateTime;
  parse(text: string): ZonedDateTime;
  parse(text: string, formatter: DateTimeFormatter): ZonedDateTime;
}

export interface ZonedDateTime {
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
  getZone(): ZoneId;
  hashCode(): number;
  minusDays(days: number): ZonedDateTime;
  minusHours(hours: number): ZonedDateTime;
  minusMinutes(minutes: number): ZonedDateTime;
  minusMonths(months: number): ZonedDateTime;
  minusNanos(nanos: number): ZonedDateTime;
  minusSeconds(seconds: number): ZonedDateTime;
  minusWeeks(weeks: number): ZonedDateTime;
  minusYears(years: number): ZonedDateTime;
  plusDays(days: number): ZonedDateTime;
  plusHours(hours: number): ZonedDateTime;
  plusMinutes(minutes: number): ZonedDateTime;
  plusMonths(months: number): ZonedDateTime;
  plusNanos(nanos: number): ZonedDateTime;
  plusSeconds(seconds: number): ZonedDateTime;
  plusWeeks(weeks: number): ZonedDateTime;
  plusYears(years: number): ZonedDateTime;
  toLocalDate(): LocalDate;
  toLocalDateTime(): LocalDateTime;
  toLocalTime(): LocalTime;
  toOffsetDateTime(): OffsetDateTime;
  withDayOfMonth(dayOfMonth: number): ZonedDateTime;
  withDayOfYear(dayOfYear: number): ZonedDateTime;
  withEarlierOffsetAtOverlap(): ZonedDateTime;
  withFixedOffsetZone(): ZonedDateTime;
  withHour(hour: number): ZonedDateTime;
  withLaterOffsetAtOverlap(): ZonedDateTime;
  withMinute(minute: number): ZonedDateTime;
  withMonth(month: number): ZonedDateTime;
  withNano(nanoOfSecond: number): ZonedDateTime;
  withSecond(second: number): ZonedDateTime;
  withYear(year: number): ZonedDateTime;
  withZoneSameInstant(zone: ZoneId): ZonedDateTime;
  withZoneSameLocal(zone: ZoneId): ZonedDateTime;
}
