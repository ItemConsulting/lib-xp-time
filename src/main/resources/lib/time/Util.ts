import {ZoneId} from "/lib/time/ZoneId";

/**
 * A Locale object represents a specific geographical, political, or cultural region.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Locale.html}
 */
export const Locale = Java.type<LocaleConstructor>("java.util.Locale");

/**
 * Formatter for printing and parsing date-time objects.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html}
 */
export const DateTimeFormatter = Java.type<DateTimeFormatterConstructor>("java.time.format.DateTimeFormatter");

export interface DateTimeFormatter {
  getLocale(): Locale;
  getZone(): ZoneId;
  localizedBy(locale: Locale): DateTimeFormatter;
  withLocale(locale: Locale): DateTimeFormatter;
  withZone(zone: ZoneId): DateTimeFormatter;
}

export interface DateTimeFormatterConstructor {
  new(): DateTimeFormatter;
  BASIC_ISO_DATE: DateTimeFormatter;
  ISO_DATE: DateTimeFormatter;
  ISO_DATE_TIME: DateTimeFormatter;
  ISO_INSTANT: DateTimeFormatter;
  ISO_LOCAL_DATE: DateTimeFormatter;
  ISO_LOCAL_DATE_TIME: DateTimeFormatter;
  ISO_LOCAL_TIME: DateTimeFormatter;
  ISO_OFFSET_TIME: DateTimeFormatter;
  ISO_ORDINAL_DATE: DateTimeFormatter;
  ISO_TIME: DateTimeFormatter;
  ISO_WEEK_DATE: DateTimeFormatter;
  ISO_ZONED_DATE_TIME: DateTimeFormatter;
  RFC_1123_DATE_TIME: DateTimeFormatter;
  ofPattern(pattern: string): DateTimeFormatter;
  ofPattern(pattern: string, locale?: Locale): DateTimeFormatter;
}

export interface LocaleConstructor {
  new (language: string): Locale;
}

export interface Locale {
  getSubLocale(): string;
}
