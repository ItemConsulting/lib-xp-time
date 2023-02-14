import {LocalDate} from "/lib/time/local-date";
import {LocalDateTime} from "/lib/time/local-date-time";
import {ZonedDateTime} from "/lib/time/zoned-date-time";
import {Locale} from "/lib/time/util";
import {DateTimeFormatter} from "/lib/time/format/date-time-formatter";

export type {DayOfWeek} from "/lib/time/day-of-week";
export type {LocalDateTime} from "/lib/time/local-date-time";
export type {ZonedDateTime} from "/lib/time/zoned-date-time";
export type {Locale} from "/lib/time/util";
export type {DateTimeFormatter} from "/lib/time/format/date-time-formatter";
export type {Instant} from "/lib/time/instant";
export type {LocalDate} from "/lib/time/local-date";
export type {LocalTime} from "/lib/time/local-time";
export type {Month} from "/lib/time/month";
export type {OffsetDateTime} from "/lib/time/offset-date-time";
export type {OffsetTime} from "/lib/time/offset-time";
export type {ZoneId} from "/lib/time/zone-id";
export type {ZoneOffset} from "/lib/time/zone-offset";

/**
 * Format a date to a string
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html#patterns}
 *
 * @param date The date as a string
 * @param pattern The shape of the output string
 * @param locale The locale of the country you are formatting to
 */
export function formatDate({ date, pattern, locale }: FormatDateParams): string {
  const formatter = DateTimeFormatter.ofPattern(pattern, locale ? new Locale(locale) : undefined);
  const dateStr = typeof date === "string" ? date : date.toISOString();

  return isDateWithoutTime(dateStr)
    ? LocalDate.parse(dateStr).format(formatter)
    : isZonedDateTime(dateStr)
      ? ZonedDateTime.parse(dateStr).format(formatter)
      : LocalDateTime.parse(dateStr).format(formatter);
}

function isDateWithoutTime(dateStr: string): boolean {
  return dateStr.length === 10;
}

function isZonedDateTime(date: string): boolean {
  return date.charAt(date.length - 1) === "Z" || date.indexOf("+") !== -1;
}

export interface FormatDateParams {
  date: string | Date;
  pattern: string;
  locale?: string | undefined;
}
