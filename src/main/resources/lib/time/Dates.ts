import {LocalDate} from "/lib/time/LocalDate";
import {LocalDateTime} from "/lib/time/LocalDateTime";
import {ZonedDateTime} from "/lib/time/ZonedDateTime";
import {DateTimeFormatter, Locale} from "/lib/time/Util";

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

export function createTimeElementMarkup({ date, pattern, locale }: CreateTimeElementMarkup): string {
  return date ? `<time datetime="${date}">${formatDate({ date, pattern, locale })}</time>` : "";
}

export function createTimeIntervalMarkup(
  { startDate, endDate }: CreateTimeIntervalMarkupParams,
  locale: string
): string | undefined {
  if (startDate || endDate) {
    const start = createTimeElementMarkup({
      date: startDate,
      pattern: "yyyy",
      locale,
    });
    const end = createTimeElementMarkup({
      date: endDate,
      pattern: "yyyy",
      locale,
    });
    return `${start} - ${end}`;
  }
  return undefined;
}
interface CreateTimeIntervalMarkupParams {
  startDate?: string | undefined;
  endDate?: string | undefined;
}

interface CreateTimeElementMarkup {
  date?: string;
  pattern: string;
  locale: string;
}

export interface FormatDateParams {
  date: string | Date;
  pattern: string;
  locale?: string | undefined;
}
