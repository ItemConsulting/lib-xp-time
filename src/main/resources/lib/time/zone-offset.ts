/**
 * A time-zone offset from Greenwich/UTC, such as +02:00.
 *
 * A time-zone offset is the amount of time that a time-zone differs from Greenwich/UTC. This is usually a fixed number of hours and minutes.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/ZoneOffset.html}
 */
export const ZoneOffset = Java.type<ZoneOffsetConstructor>("java.time.ZoneOffset");

export interface ZoneOffsetConstructor {
  MAX: ZoneOffset;
  MIN: ZoneOffset;
  UTC: ZoneOffset;
  of(offsetId: string): ZoneOffset;
  ofHours(hours: number): ZoneOffset;
  ofHoursMinutesSeconds(hours: number, minutes: number, seconds: number): ZoneOffset;
  ofTotalSeconds(totalSeconds: number): ZoneOffset;
}

export interface ZoneOffset {
  compareTo(other: ZoneOffset): number;
  getId(): string;
  getTotalSeconds(): number;
  hashCode(): number;
  toString(): string;
}
