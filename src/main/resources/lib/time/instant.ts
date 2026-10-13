import type { ChronoUnit, Duration, OffsetDateTime, ZonedDateTime, ZoneId, ZoneOffset } from "/lib/time";
import type { Temporal } from "/lib/time/temporal/temporal";

/**
 * An instantaneous point on the time-line.
 *
 * This class models a single instantaneous point on the time-line. This might be used to record event time-stamps in the application.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/Instant.html}
 */
export const Instant = Java.type<InstantConstructor>("java.time.Instant");

export interface InstantConstructor {
  now(): Instant;
  ofEpochMilli(epochMilli: number): Instant;
  ofEpochSecond(epochSecond: number): Instant;
  ofEpochSecond(epochSecond: number, nanoAdjustment: number): Instant;
  parse(text: string): Instant;
}

export interface Instant {
  minus(amountToSubtract: Duration): Instant;
  minus(amountToSubtract: number, unit: ChronoUnit): Instant;
  plus(amountToAdd: Duration): Instant;
  plus(amountToAdd: number, unit: ChronoUnit): Instant;
  /**
   * Sets every unit smaller than the given one to zero, so truncating to hours gives the start of the hour
   */
  truncatedTo(unit: ChronoUnit): Instant;
  /**
   * The number of whole units until the other one. It is negative if the other one is earlier.
   */
  until(endExclusive: Temporal, unit: ChronoUnit): number;
  atOffset(offset: ZoneOffset): OffsetDateTime;
  atZone(zone: ZoneId): ZonedDateTime;
  compareTo(otherInstant: Instant): number;
  equals(otherInstant: unknown): boolean;
  toString(): string;
  getEpochSecond(): number;
  getNano(): number;
  isAfter(otherInstant: Instant): boolean;
  isBefore(otherInstant: Instant): boolean;
  minusMillis(millisToSubtract: number): Instant;
  minusNanos(nanosToSubtract: number): Instant;
  minusSeconds(secondsToSubtract: number): Instant;
  plusMillis(millisToAdd: number): Instant;
  plusNanos(nanosToAdd: number): Instant;
  plusSeconds(secondsToAdd: number): Instant;
  toEpochMilli(): number;
}
