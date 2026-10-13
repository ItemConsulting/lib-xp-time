import type {
  Duration,
  Instant,
  LocalDate,
  LocalDateTime,
  LocalTime,
  OffsetDateTime,
  OffsetTime,
  Period,
  Year,
  ZonedDateTime,
} from "/lib/time";

/**
 * The date-time objects in this library: the ones that can be formatted, compared and have time added to them.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/Temporal.html}
 */
export type Temporal =
  | Instant
  | LocalDate
  | LocalDateTime
  | LocalTime
  | OffsetDateTime
  | OffsetTime
  | Year
  | ZonedDateTime;

/**
 * The date-time objects that have a time of day, which is what an exact amount of time can be measured between.
 */
export type TimeTemporal = Instant | LocalDateTime | LocalTime | OffsetDateTime | OffsetTime | ZonedDateTime;

/**
 * An amount of time, that can be added to or subtracted from a date-time object.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAmount.html}
 */
export type TemporalAmount = Duration | Period;
