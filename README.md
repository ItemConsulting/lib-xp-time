# Time library for Enonic XP

This library enables the usage of classes from the [`java.time`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/package-summary.html) package from Enonic XP application code.
Other JavaScript-based time libraries like _Moment.js_ or _date-fns_ will negatively impact your bundle size and build time. This library is only a **thin TypeScript-wrapper** around the excellent core `java.time` library already present in your system!

[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/lib-xp-time)](https://repo.itemtest.no/#/releases/no/item/lib-xp-time)
![Enonic XP8 badge](https://market.enonic.com/badges/xp8.svg)

<img src="https://github.com/ItemConsulting/lib-xp-time/raw/main/docs/icon.svg?sanitize=true" width="150">

## Installation

Version 2 of this library requires Enonic XP 8, and is built against XP 8.0.0. Use version 1.x for Enonic XP 7.

To install this library you need to add a new dependency to your app's build.gradle file.

### Gradle

```groovy
repositories {
  maven { url "https://repo.itemtest.no/releases" }
}

dependencies {
  include "no.item:lib-xp-time:2.0.0"
}
```

### TypeScript

To update the version of *enonic-types* in *package.json* using npm, run the following command:
```bash
npm i -D @item-enonic-types/lib-time
```

You can add the following changes to your *tsconfig.json* to get TypeScript-support.

```diff
{
  "compilerOptions": {
+   "baseUrl": "./",
+   "paths": {
+     "/lib/xp/*": ["./node_modules/@enonic-types/lib-*"],
+     "/lib/*": [ "./node_modules/@item-enonic-types/lib-*" ,"./src/main/resources/lib/*"],
+   }
  }
}
```

### Usage

You can import `java.time` and  `java.time.format` classes from `"/lib/time"`.

*Example of date math on a `LocalDateTime` using `"/lib/time"`:*

```typescript
import { LocalDateTime, DateTimeFormatter } from "/lib/time";

const today = LocalDateTime.parse("2023-02-21T12:15:30");
const formatter = DateTimeFormatter.ofPattern("dd.MM hh:mm")
const inThreeWeeksStr = today
  .plusWeeks(3)
  .format(formatter);
// inThreeWeeksStr = "14.03 12:15"
```

*Example of doing time math using a `ZonedDateTime`:*

```typescript
import { ZonedDateTime } from "/lib/time";

const date = ZonedDateTime.parse("2023-02-21T12:15:30+01:00");
const fiftyMinutesAgo = date.minusMinutes(50);
const time = fiftyMinutesAgo.toLocalTime();
// time = "11:25:30"
```

### Amounts of time with `Duration`, `Period` and `ChronoUnit`

There are two kinds of amounts of time, and they behave differently:

- A `Duration` is an exact amount of time in hours, minutes and seconds. A day is always 24 hours. Use it for what a
  stopwatch would measure, such as the length of a video or how long ago something was published.
- A `Period` is an amount of years, months and days that follows the calendar. Use it for what a calendar would
  measure, such as an age or "valid for 6 months".

```typescript
import { Duration, Instant, LocalDate, Period } from "/lib/time";

const published = Instant.parse("2023-02-08T10:15:30Z");
const now = Instant.parse("2023-02-08T11:45:30Z");
const sincePublished = Duration.between(published, now);
// sincePublished.toMinutes() = 90
// sincePublished.toString() = "PT1H30M"

const age = Period.between(LocalDate.parse("1990-05-17"), LocalDate.parse("2023-02-08"));
// age.getYears() = 32
```

Both can be added to and subtracted from the date-time classes with `plus()` and `minus()`, and both can be parsed
from ISO-8601 text such as `"PT1H30M"` and `"P1Y2M3D"`. A `Duration` can only be added to something with a time of
day, and a `Period` only to something with a date.

```typescript
import { Duration, LocalDate, LocalDateTime, Period } from "/lib/time";

const expires = LocalDate.parse("2023-01-31").plus(Period.ofMonths(1));
// expires = "2023-02-28"

const ends = LocalDateTime.parse("2023-02-08T23:15:30").plus(Duration.ofMinutes(90));
// ends = "2023-02-09T00:45:30"
```

The difference between the two shows when the clocks change. Summer time in Oslo started on 26 March 2023, so that
day was only 23 hours long:

```typescript
import { Duration, Period, ZonedDateTime } from "/lib/time";

const dayBefore = ZonedDateTime.parse("2023-03-25T12:00:00+01:00[Europe/Oslo]");

dayBefore.plus(Period.ofDays(1));   // "2023-03-26T12:00+02:00[Europe/Oslo]", the same time the next day
dayBefore.plus(Duration.ofDays(1)); // "2023-03-26T13:00+02:00[Europe/Oslo]", exactly 24 hours later
```

`ChronoUnit` is the list of units, from `NANOS` to `MILLENNIA`. It counts whole units between two dates or times, and
is used with `plus()`, `minus()`, `until()` and `truncatedTo()`.

```typescript
import { ChronoUnit, LocalDate, LocalDateTime } from "/lib/time";

const daysUntilEvent = ChronoUnit.DAYS.between(LocalDate.parse("2023-02-08"), LocalDate.parse("2023-03-01"));
// daysUntilEvent = 21

const inThreeWeeks = LocalDate.parse("2023-02-08").plus(3, ChronoUnit.WEEKS);
// inThreeWeeks = "2023-03-01"

const startOfHour = LocalDateTime.parse("2023-02-08T10:15:30").truncatedTo(ChronoUnit.HOURS);
// startOfHour = "2023-02-08T10:00"
```

### Formatting dates with `formatDate()`

The utility function `formatDate()` formats a date in one call. It takes a
[pattern](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/format/DateTimeFormatter.html#patterns),
and optionally a `locale` and a `timezoneId`.

```typescript
import { formatDate } from "/lib/time";

const today = formatDate({
  date: "2023-02-21",
  pattern: "EEEE d. MMMM yyyy",
  locale: "no"
});
// today = "tirsdag 21. februar 2023"
```

*Use `timezoneId` to convert a point in time to a time zone:*

```typescript
import { formatDate } from "/lib/time";

const time = formatDate({
  date: "2023-02-21T12:15:30Z",
  pattern: "dd.MM.yyyy HH:mm",
  timezoneId: "Europe/Oslo"
});
// time = "21.02.2023 13:15"
```

The `date` can be a JavaScript `Date` or a string, and `formatDate()` returns `undefined` if it is `undefined`, `null`
or an empty string.

| `date`                                             | Example                                  | Without `timezoneId`                 | With `timezoneId`          |
|----------------------------------------------------|------------------------------------------|--------------------------------------|----------------------------|
| `Date`                                             | `new Date()`                             | Shown in the time zone of the server | Converted to the time zone |
| Date and time with `Z`, an offset or a zone id     | `"2023-02-21T12:15:30+01:00"`            | Shown as written                     | Converted to the time zone |
| Date and time without an offset                    | `"2023-02-21T12:15:30"`                  | Shown as written                     | Shown as written           |
| Date                                               | `"2023-02-21"`                           | Shown as written                     | Shown as written           |

A `timezoneId` that is not a valid time zone falls back to the time zone of the server.

*Example of using `Locale` in formatting a `LocalDateTime` and get a normalized timestamp :*
```typescript
import { LocalDateTime, DateTimeFormatter, Locale } from "/lib/time";

const today = LocalDateTime.parse("2023-02-21T12:15:30");
const formatter = DateTimeFormatter.ofPattern("EEEE d. MMMM yyyy hh:mm:ss", new Locale("no"));
const time = today.format(formatter);
// time = "tirsdag 21. februar 2023 12:15:30"
```

*Example of using the `LanguageRange` utility to find the preferred locale among the ones supported by the application.*

```typescript
import { LanguageRange, Locale } from "/lib/time";
import { getSupportedLocales } from "/lib/xp/i18n";
import type { Request, Response } from "@enonic-types/core";

export function get(req: Request): Response {
  const languageRange = LanguageRange.parse(req.headers["Accept-Language"]);
  
  const locale: string = Locale.filterTags(
    languageRange, 
    getSupportedLocales(["i18n/phrases"])
  )[0];
  
  ...
}

```

### Lists and sets from Java

Some methods return a Java collection instead of a JavaScript array. They are typed as `JavaList` and `JavaSet`:

- A `JavaList`, such as the result of `LanguageRange.parse()` and `Locale.filterTags()`, can be read by index, has a
  `length` and can be looped over with `forEach()`. It also has `size()`, `get()`, `contains()` and `isEmpty()`. Array
  methods such as `map()` and `filter()` are not available on every script engine, so they are left out of the type.
- A `JavaSet`, such as the result of `ZoneId.getAvailableZoneIds()`, has `size()`, `contains()`, `isEmpty()` and
  `forEach()`. It has no order, so it can not be read by index.

```typescript
import { ZoneId } from "/lib/time";

const isKnownTimeZone = ZoneId.getAvailableZoneIds().contains("Europe/Oslo");
// isKnownTimeZone = true
```

### Exported from `"/lib/time"`

The following classes are exported from `"/lib/time"`:

* `ChronoUnit`
* `DateTimeFormatter`
* `DayOfWeek`
* `Duration`
* `FormatStyle`
* `Instant`
* `LanguageRange`
* `LocalDate`
* `LocalDateTime`
* `Locale`
* `LocalTime`
* `Month`
* `OffsetDateTime`
* `OffsetTime`
* `Period`
* `TextStyle`
* `Year`
* `ZonedDateTime`
* `ZoneId`
* `ZoneOffset`

Together with the function `formatDate()`, and the types `JavaList`, `JavaSet`, `MonthNumber`,
`Temporal`, `TemporalAmount` and `TimeTemporal`.

## Development

### Building

Building requires Java 25, which is what Enonic XP 8 compiles against. Node.js is downloaded by Gradle, in the version
given in *.nvmrc*.

To build the project, run the following command

```bash
./gradlew build
```

This checks the code with Biome and TypeScript, bundles it with tsdown, runs the tests and builds the jar.
`enonic project build` does the same, when the project is linked to an XP 8 sandbox.

### Testing

The tests are JavaScript files in *src/test/resources/tests*. Every file named *\*Test.js* is picked up, and every
function it exports with a name starting with `test` is run as a test of its own, so there is nothing to register.

They run on both of the script engines of XP 8: `./gradlew test` uses Nashorn, and `./gradlew testGraalJS` uses
GraalJS. The time zone of the tests is set to Europe/Oslo in *build.gradle*, so they give the same result on every
machine.

### Deploying locally

To deploy to a local sandbox, run the following command

```bash
enonic project deploy
```

### Releasing

Releases are made by GitHub Actions, using [Changesets](https://github.com/changesets/changesets).

1. Describe your change by running `npx changeset`, and commit the file it creates together with the change.
2. When the change is merged to `main`, a pull request named "Version Packages" is opened or updated. It bumps the
   version and writes the changelog.
3. Merging that pull request publishes the types to npm, tags the release on GitHub and publishes the jar to
   [repo.itemtest.no](https://repo.itemtest.no/#/releases/no/item/lib-xp-time).
