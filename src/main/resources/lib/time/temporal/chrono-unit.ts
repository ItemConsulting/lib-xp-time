import type { Duration } from "/lib/time";
import type { Temporal } from "/lib/time/temporal/temporal";

/**
 * A standard set of date periods units.
 *
 * This set of units provide unit-based access to manipulate a date, time or date-time. For example,
 * `ChronoUnit.DAYS.between(start, end)` gives the number of whole days between two dates.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/ChronoUnit.html}
 */
export const ChronoUnit = Java.type<ChronoUnitConstructor>("java.time.temporal.ChronoUnit");

export interface ChronoUnitConstructor {
  NANOS: ChronoUnit;
  MICROS: ChronoUnit;
  MILLIS: ChronoUnit;
  SECONDS: ChronoUnit;
  MINUTES: ChronoUnit;
  HOURS: ChronoUnit;
  HALF_DAYS: ChronoUnit;
  DAYS: ChronoUnit;
  WEEKS: ChronoUnit;
  MONTHS: ChronoUnit;
  YEARS: ChronoUnit;
  DECADES: ChronoUnit;
  CENTURIES: ChronoUnit;
  MILLENNIA: ChronoUnit;
  ERAS: ChronoUnit;
  FOREVER: ChronoUnit;

  valueOf(name: string): ChronoUnit;
  values(): ChronoUnit[];
}

export interface ChronoUnit {
  /**
   * The number of whole units between the two. It is negative if the end is before the start.
   */
  between(startInclusive: Temporal, endExclusive: Temporal): number;
  getDuration(): Duration;
  isDateBased(): boolean;
  isDurationEstimated(): boolean;
  isTimeBased(): boolean;
  toString(): string;
}
