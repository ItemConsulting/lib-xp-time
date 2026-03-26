/**
 * Enumeration of the style of a localized date, time or date-time formatter.
 *
 * These styles are used when obtaining a date-time style from configuration. See DateTimeFormatter and DateTimeFormatterBuilder for usage.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/FormatStyle.html}
 */
export const FormatStyle = Java.type<FormatStyleConstructor>("java.time.format.FormatStyle");

export interface FormatStyleConstructor {
  FULL: FormatStyle;
  LONG: FormatStyle;
  MEDIUM: FormatStyle;
  SHORT: FormatStyle;

  valueOf(name: string): FormatStyle;
  values(): FormatStyle[];
}

export interface FormatStyle {
  toString(): string;
}
