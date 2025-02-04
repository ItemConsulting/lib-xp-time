import { LocalDate } from "/lib/time/local-date";
import { ZoneId } from "/lib/time/zone-id";
import { LocalDateTime } from "/lib/time/local-date-time";
import { ZonedDateTime } from "/lib/time/zoned-date-time";
import { Locale } from "/lib/time/util";
import { DateTimeFormatter } from "/lib/time/format/date-time-formatter";

export { DayOfWeek } from "/lib/time/day-of-week";
export { LocalDateTime } from "/lib/time/local-date-time";
export { ZonedDateTime } from "/lib/time/zoned-date-time";
export { Locale, LanguageRange } from "/lib/time/util";
export { DateTimeFormatter } from "/lib/time/format/date-time-formatter";
export { Instant } from "/lib/time/instant";
export { LocalDate } from "/lib/time/local-date";
export { LocalTime } from "/lib/time/local-time";
export { Month } from "/lib/time/month";
export { OffsetDateTime } from "/lib/time/offset-date-time";
export { OffsetTime } from "/lib/time/offset-time";
export { ZoneId } from "/lib/time/zone-id";
export { ZoneOffset } from "/lib/time/zone-offset";

/**
 * Format a date to a string
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html#patterns}
 *
 * @param date The date as a string
 * @param pattern The shape of the output string
 * @param locale The locale of the country you are formatting to
 */
export function formatDate({ date, pattern, locale, timezoneId }: FormatDateParams): string;
export function formatDate({ date, pattern, locale, timezoneId }: FormatDateParamsAllowNullable): string | undefined;
export function formatDate({ date, pattern, locale, timezoneId }: FormatDateParamsAllowNullable): string | undefined {
  if (!date) {
    return undefined;
  }

  const localeOrDefault = locale ? new Locale(locale) : Locale.getDefault();

  let zoneIdOrDefault = undefined;
  if (timezoneId) {
    try {
      zoneIdOrDefault = ZoneId.of(timezoneId);
    } catch {
      zoneIdOrDefault = ZoneId.systemDefault();
    }
  }

  const formatter =
    timezoneId && zoneIdOrDefault
      ? DateTimeFormatter.ofPattern(pattern, localeOrDefault).withZone(zoneIdOrDefault)
      : DateTimeFormatter.ofPattern(pattern, localeOrDefault);

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
  timezoneId?: string | undefined;
}

export interface FormatDateParamsAllowNullable {
  date: string | Date | undefined | null;
  pattern: string;
  locale?: string | undefined;
  timezoneId?: string | undefined;
}
