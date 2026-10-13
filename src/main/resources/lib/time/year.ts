import type { DateTimeFormatter } from "./format/date-time-formatter";
import type { LocalDate } from "./local-date";
import type { ZoneId } from "./zone-id";

/**
 * A year in the ISO-8601 calendar system, such as 2007.
 * Year is an immutable date-time object that represents a year. Any field that can be derived from a year can be obtained.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/Year.html}
 */
export const Year = Java.type<YearConstructor>("java.time.Year");

export interface YearConstructor {
  now(): Year;
  now(zone: ZoneId): Year;
  of(isoYear: number): Year;
  parse(text: string): Year;
  parse(text: string, formatter: DateTimeFormatter): Year;
  isLeap(year: number): boolean;
}

export interface Year {
  getValue(): number;
  toString(): string;
  hashCode(): number;
  atDay(dayOfYear: number): LocalDate;
  compareTo(other: Year): number;
  format(formatter: DateTimeFormatter): string;
  isAfter(other: Year): boolean;
  isBefore(other: Year): boolean;
  isLeap(): boolean;
  minusYears(yearsToSubtract: number): Year;
  plusYears(yearsToAdd: number): Year;
}
