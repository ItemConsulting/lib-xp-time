import { DateTimeFormatter } from "/lib/time/format/date-time-formatter";
import { LocalDate } from "/lib/time/local-date";
import { LocalDateTime } from "/lib/time/local-date-time";
import { Locale } from "/lib/time/util";
import { ZoneId } from "/lib/time/zone-id";
import { ZonedDateTime } from "/lib/time/zoned-date-time";

export { DayOfWeek } from "/lib/time/day-of-week";
export { DateTimeFormatter } from "/lib/time/format/date-time-formatter";
export { FormatStyle } from "/lib/time/format/format-style";
export { TextStyle } from "/lib/time/format/text-style";
export { Instant } from "/lib/time/instant";
export { LocalDate } from "/lib/time/local-date";
export { LocalDateTime } from "/lib/time/local-date-time";
export { LocalTime } from "/lib/time/local-time";
export { Month, type MonthNumber } from "/lib/time/month";
export { OffsetDateTime } from "/lib/time/offset-date-time";
export { OffsetTime } from "/lib/time/offset-time";
export { type JavaList, type JavaSet, LanguageRange, Locale } from "/lib/time/util";
export { Year } from "/lib/time/year";
export { ZoneId } from "/lib/time/zone-id";
export { ZoneOffset } from "/lib/time/zone-offset";
export { ZonedDateTime } from "/lib/time/zoned-date-time";

/**
 * Format a date to a string
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/format/DateTimeFormatter.html#patterns}
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

  let zoneIdOrDefault: ZoneId | undefined;
  if (timezoneId) {
    try {
      zoneIdOrDefault = ZoneId.of(timezoneId);
    } catch {
      zoneIdOrDefault = ZoneId.systemDefault();
    }
  }

  // A Date is a point in time, and toISOString() below writes it in UTC. Without a time zone to convert it to,
  // it would be printed in UTC as well, so it is shown in the system time zone, like the Date itself does.
  if (!zoneIdOrDefault && typeof date !== "string") {
    zoneIdOrDefault = ZoneId.systemDefault();
  }

  const formatter = zoneIdOrDefault
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

// Ends with "Z" or a UTC offset such as "+02:00" or "-05:00", optionally followed by a zone id in brackets
const ZONED_DATE_TIME_SUFFIX = /(Z|[+-]\d{2}:\d{2}(:\d{2})?)(\[[^\]]+\])?$/;

function isZonedDateTime(date: string): boolean {
  return ZONED_DATE_TIME_SUFFIX.test(date);
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
