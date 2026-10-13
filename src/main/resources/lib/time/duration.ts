import type { ChronoUnit } from "/lib/time";
import type { TimeTemporal } from "/lib/time/temporal/temporal";

/**
 * A time-based amount of time, such as '34.5 seconds'.
 *
 * This class models a quantity or amount of time in terms of seconds and nanoseconds. A day is always exactly 24 hours.
 * Use Period for an amount of time in years, months and days that follows the calendar.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/Duration.html}
 */
export const Duration = Java.type<DurationConstructor>("java.time.Duration");

export interface DurationConstructor {
  ZERO: Duration;
  between(startInclusive: TimeTemporal, endExclusive: TimeTemporal): Duration;
  of(amount: number, unit: ChronoUnit): Duration;
  ofDays(days: number): Duration;
  ofHours(hours: number): Duration;
  ofMillis(millis: number): Duration;
  ofMinutes(minutes: number): Duration;
  ofNanos(nanos: number): Duration;
  ofSeconds(seconds: number): Duration;
  ofSeconds(seconds: number, nanoAdjustment: number): Duration;
  /**
   * Parses an ISO-8601 duration, such as "PT1H30M" or "P2DT3H".
   */
  parse(text: string): Duration;
}

export interface Duration {
  abs(): Duration;
  compareTo(otherDuration: Duration): number;
  dividedBy(divisor: number): Duration;
  /**
   * The number of whole times the other duration fits in this one
   */
  dividedBy(divisor: Duration): number;
  equals(otherDuration: unknown): boolean;
  getNano(): number;
  getSeconds(): number;
  hashCode(): number;
  isNegative(): boolean;
  isPositive(): boolean;
  isZero(): boolean;
  minus(duration: Duration): Duration;
  minus(amountToSubtract: number, unit: ChronoUnit): Duration;
  minusDays(daysToSubtract: number): Duration;
  minusHours(hoursToSubtract: number): Duration;
  minusMillis(millisToSubtract: number): Duration;
  minusMinutes(minutesToSubtract: number): Duration;
  minusNanos(nanosToSubtract: number): Duration;
  minusSeconds(secondsToSubtract: number): Duration;
  multipliedBy(multiplicand: number): Duration;
  negated(): Duration;
  plus(duration: Duration): Duration;
  plus(amountToAdd: number, unit: ChronoUnit): Duration;
  plusDays(daysToAdd: number): Duration;
  plusHours(hoursToAdd: number): Duration;
  plusMillis(millisToAdd: number): Duration;
  plusMinutes(minutesToAdd: number): Duration;
  plusNanos(nanosToAdd: number): Duration;
  plusSeconds(secondsToAdd: number): Duration;
  /**
   * The whole duration in days, where a day is 24 hours
   */
  toDays(): number;
  toDaysPart(): number;
  /**
   * The whole duration in hours. Use toHoursPart() for the hours left after the days are taken out.
   */
  toHours(): number;
  toHoursPart(): number;
  toMillis(): number;
  toMillisPart(): number;
  toMinutes(): number;
  toMinutesPart(): number;
  toNanos(): number;
  toNanosPart(): number;
  toSeconds(): number;
  toSecondsPart(): number;
  /**
   * The ISO-8601 representation, such as "PT1H30M"
   */
  toString(): string;
  truncatedTo(unit: ChronoUnit): Duration;
  withNanos(nanoOfSecond: number): Duration;
  withSeconds(seconds: number): Duration;
}
