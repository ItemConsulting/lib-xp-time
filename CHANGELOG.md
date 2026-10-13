# @item-enonic-types/lib-time

## 2.0.0

### Major Changes

- f0f359c: Support Enonic XP 8, and drop support for XP 7.

### Minor Changes

- 53e1fed: Add `ChronoUnit`, the units of time from `NANOS` to `MILLENNIA`.
  
  The date-time classes get the methods that take a unit: `plus()` and `minus()` with an amount and a unit, `until()` to count the whole units to another date or time, and `truncatedTo()`.
- 53e1fed: Add `Duration`, an exact amount of time in hours, minutes and seconds.
  
  It can be added to and subtracted from `Instant`, `LocalTime`, `LocalDateTime`, `OffsetTime`, `OffsetDateTime` and `ZonedDateTime` with `plus()` and `minus()`.
- 53e1fed: Add `Period`, an amount of years, months and days that follows the calendar.
  
  It can be added to and subtracted from `LocalDate`, `LocalDateTime`, `OffsetDateTime` and `ZonedDateTime` with `plus()` and `minus()`, and `LocalDate.until()` gives the `Period` between two dates.

### Patch Changes

- 58e8aa6: Correct type declarations that did not match `java.time`.
- 58e8aa6: Fix `formatDate()` throwing on date strings with a negative UTC offset, such as `2023-06-07T10:00:00-05:00`.
- 58e8aa6: `formatDate()` now formats a `Date` in the system time zone when no `timezoneId` is given.

## 1.6.1

### Patch Changes

- 374eb14: Expose FormatStyle from index.ts

## 1.6.0

### Minor Changes

- 1e44f2c: Add ability for DateTimeFormatter to use FormatStyle options to get localized formatter

## 1.5.0

### Minor Changes

- 4dd8023: Add support for Year

## 1.4.0

### Minor Changes

- 68e25e5: Add support for outputting localized display names for day-of-week and months

## 1.3.0

### Minor Changes

- 36d604c: Add "getEpochSecond" and "toInstant" to "LocalDateTime" and "ZonedDateTime".

## 1.2.1

### Patch Changes

- 7507613: Fix return type of `Locale.filterTags` from `Locale` to the correct `string`.

## 1.2.0

### Minor Changes

- 4e5d813: Add support for java.util.Locale.LanguageRange

## 1.1.0

### Minor Changes

- 9995a5e: Migrate build to tsup
- 2c7f4946: Add missing `isAfter` and `isBefore` method types to `LocalDate` and `LocalDateTime` and `ZonedDateTime`
- a3b4b54b: Add option to provide a `timezoneId` to `formatDate()` so you get the correct time when providing a timezone timestamp

## 1.0.0

### Major Changes

- 283c8faf: General release
