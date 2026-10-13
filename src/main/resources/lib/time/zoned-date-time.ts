import type {
  ChronoUnit,
  DateTimeFormatter,
  DayOfWeek,
  Instant,
  LocalDate,
  LocalDateTime,
  LocalTime,
  Month,
  OffsetDateTime,
  ZoneId,
  ZoneOffset,
} from "/lib/time";
import type { Temporal, TemporalAmount } from "/lib/time/temporal/temporal";

/**
 * ZonedDateTime is an immutable representation of a date-time with a time-zone.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/ZonedDateTime.html}
 */
export const ZonedDateTime = Java.type<ZonedDateTimeConstructor>("java.time.ZonedDateTime");

export interface ZonedDateTimeConstructor {
  now(): ZonedDateTime;
  now(zone: ZoneId): ZonedDateTime;
  of(
    year: number,
    month: number,
    dayOfMonth: number,
    hour: number,
    minute: number,
    second: number,
    nanoOfSecond: number,
    zone: ZoneId,
  ): ZonedDateTime;
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
  minus(amountToSubtract: TemporalAmount): ZonedDateTime;
  minus(amountToSubtract: number, unit: ChronoUnit): ZonedDateTime;
  plus(amountToAdd: TemporalAmount): ZonedDateTime;
  plus(amountToAdd: number, unit: ChronoUnit): ZonedDateTime;
  /**
   * Sets every unit smaller than the given one to zero, so truncating to hours gives the start of the hour
   */
  truncatedTo(unit: ChronoUnit): ZonedDateTime;
  /**
   * The number of whole units until the other one. It is negative if the other one is earlier.
   */
  until(endExclusive: Temporal, unit: ChronoUnit): number;
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
  isAfter(other: ZonedDateTime): boolean;
  isBefore(other: ZonedDateTime): boolean;
  isEqual(other: ZonedDateTime): boolean;
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
  toString(): string;

  // from java.time.chrono.ChronoZonedDateTime
  toEpochSecond(): number;
  toInstant(): Instant;
}
