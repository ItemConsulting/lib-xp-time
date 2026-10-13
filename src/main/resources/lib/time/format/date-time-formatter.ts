import type {
  Instant,
  LocalDate,
  LocalDateTime,
  Locale,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
  Year,
  ZonedDateTime,
  ZoneId,
} from "/lib/time";
import type { FormatStyle } from "/lib/time/format/format-style";

/**
 * Formatter for printing and parsing date-time objects.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/format/DateTimeFormatter.html}
 */
export const DateTimeFormatter = Java.type<DateTimeFormatterConstructor>("java.time.format.DateTimeFormatter");

/**
 * The date-time objects in this library that a formatter can print
 */
export type Temporal =
  | Instant
  | LocalDate
  | LocalDateTime
  | LocalTime
  | OffsetDateTime
  | OffsetTime
  | Year
  | ZonedDateTime;

export interface DateTimeFormatter {
  format(temporal: Temporal): string;
  getLocale(): Locale;
  getZone(): ZoneId;
  localizedBy(locale: Locale): DateTimeFormatter;
  withLocale(locale: Locale): DateTimeFormatter;
  withZone(zone: ZoneId): DateTimeFormatter;
}

export interface DateTimeFormatterConstructor {
  BASIC_ISO_DATE: DateTimeFormatter;
  ISO_DATE: DateTimeFormatter;
  ISO_DATE_TIME: DateTimeFormatter;
  ISO_INSTANT: DateTimeFormatter;
  ISO_LOCAL_DATE: DateTimeFormatter;
  ISO_LOCAL_DATE_TIME: DateTimeFormatter;
  ISO_LOCAL_TIME: DateTimeFormatter;
  ISO_OFFSET_DATE: DateTimeFormatter;
  ISO_OFFSET_DATE_TIME: DateTimeFormatter;
  ISO_OFFSET_TIME: DateTimeFormatter;
  ISO_ORDINAL_DATE: DateTimeFormatter;
  ISO_TIME: DateTimeFormatter;
  ISO_WEEK_DATE: DateTimeFormatter;
  ISO_ZONED_DATE_TIME: DateTimeFormatter;
  RFC_1123_DATE_TIME: DateTimeFormatter;
  ofLocalizedDate(dateStyle: FormatStyle): DateTimeFormatter;
  ofLocalizedTime(timeStyle: FormatStyle): DateTimeFormatter;
  ofLocalizedDateTime(dateTimeStyle: FormatStyle): DateTimeFormatter;
  ofLocalizedDateTime(dateStyle: FormatStyle, timeStyle: FormatStyle): DateTimeFormatter;
  ofPattern(pattern: string): DateTimeFormatter;
  ofPattern(pattern: string, locale: Locale): DateTimeFormatter;
}
