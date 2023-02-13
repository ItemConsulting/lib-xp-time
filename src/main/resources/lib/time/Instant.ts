import {ZoneOffset} from "/lib/time/ZoneOffset";
import {OffsetDateTime} from "/lib/time/OffsetDateTime";
import {ZoneId} from "/lib/time/ZoneId";
import {ZonedDateTime} from "/lib/time/ZonedDateTime";

/**
 * An instantaneous point on the time-line.
 *
 * This class models a single instantaneous point on the time-line. This might be used to record event time-stamps in the application.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/Instant.html}
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
  atOffset(offset: ZoneOffset): OffsetDateTime;
  atZone(zone: ZoneId): ZonedDateTime;
  compareTo(otherInstant: Instant): number;
  equals(otherInstant: Object): boolean;
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
