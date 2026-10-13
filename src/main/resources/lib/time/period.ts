import type { LocalDate } from "/lib/time";

/**
 * A date-based amount of time in the ISO-8601 calendar system, such as '2 years, 3 months and 4 days'.
 *
 * This class models a quantity or amount of time in terms of years, months and days. How long that is depends on the
 * date it is added to: a month can be 28 to 31 days. Use Duration for an exact amount of time.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/Period.html}
 */
export const Period = Java.type<PeriodConstructor>("java.time.Period");

export interface PeriodConstructor {
  ZERO: Period;
  between(startDateInclusive: LocalDate, endDateExclusive: LocalDate): Period;
  of(years: number, months: number, days: number): Period;
  ofDays(days: number): Period;
  ofMonths(months: number): Period;
  ofWeeks(weeks: number): Period;
  ofYears(years: number): Period;
  /**
   * Parses an ISO-8601 period, such as "P1Y2M3D" or "P2W".
   */
  parse(text: string): Period;
}

export interface Period {
  equals(otherPeriod: unknown): boolean;
  getDays(): number;
  getMonths(): number;
  getYears(): number;
  hashCode(): number;
  isNegative(): boolean;
  isZero(): boolean;
  minus(amountToSubtract: Period): Period;
  minusDays(daysToSubtract: number): Period;
  minusMonths(monthsToSubtract: number): Period;
  minusYears(yearsToSubtract: number): Period;
  multipliedBy(scalar: number): Period;
  negated(): Period;
  /**
   * Moves whole years out of the months, so "P15M" becomes "P1Y3M". The days are left as they are.
   */
  normalized(): Period;
  plus(amountToAdd: Period): Period;
  plusDays(daysToAdd: number): Period;
  plusMonths(monthsToAdd: number): Period;
  plusYears(yearsToAdd: number): Period;
  /**
   * The ISO-8601 representation, such as "P1Y2M3D"
   */
  toString(): string;
  toTotalMonths(): number;
  withDays(days: number): Period;
  withMonths(months: number): Period;
  withYears(years: number): Period;
}
