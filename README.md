# Time library for Enonic XP

This library enables the usage of classes from the [`java.time`](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/package-summary.html) package from Enonic XP application code.
Other JavaScript-based time libraries like _Moment.js_ or _date-fns_ will negatively impact your bundle size and build time. This library is only a **thin TypeScript-wrapper** around the excellent core `java.time` library already present in your system!

[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/lib-xp-time)](https://repo.itemtest.no/#/releases/no/item/lib-xp-time)

<img src="https://github.com/ItemConsulting/lib-xp-time/raw/main/docs/icon.svg?sanitize=true" width="150">

## Installation

To install this library you need to add a new dependency to your app's build.gradle file.

### Gradle

```groovy
repositories {
  maven { url "https://repo.itemtest.no/releases" }
}

dependencies {
  include "no.item:lib-xp-time:1.1.0"
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

*This library also exposes a utility function `formatDate()` to simply format a date:*

```typescript
import { formatDate } from "/lib/time";

const today = formatDate({
  date: "2023-02-21",
  pattern: "dd-MM-yyyy",
  locale: "no"
});
// today = "21-02-2023"
```
*Use `formatDate()` with a given timezoneId*
```typescript
import { formatDate } from "/lib/time";

const today = formatDate({
  date: "2023-02-21",
  pattern: "dd-MM-yyyy",
  locale: "no",
  timezoneId: "Europe/Oslo"
});
// today = "21-02-2023"
```

*Example of using `Locale` in formatting a `LocalDateTime` and get a normalized timestamp :*
```typescript
import { LocalDateTime, DateTimeFormatter, Locale } from "/lib/time";

const today = LocalDateTime.parse("2023-02-21T12:15:30");
const formatter = DateTimeFormatter.ofPattern("EEEE d. MMMM yyyy hh:mm:ss", new Locale("no"));
const time = today.format(formatter);
// time = "tirsdag 21. februar 2023 12:15:30"
```

*Example of using hte `LanguageRange` utility to find the preferred locale among the ones supported by the application.*

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

### Constants exposed from `"/lib/time"`
The following classes is exposed/exported from `"/lib/time"`:
* `DateTimeFormatter`
* `DayOfWeek`
* `Instant`
* `LanguageRange`
* `LocalDate`
* `LocalDateTime`
* `Locale`
* `LocalTime`
* `Month`
* `OffsetDateTime`
* `OffsetTime`
* `ZonedDateTime`
* `ZoneId`
* `ZoneOffset`

## Deploying

### Building

To build the project, run the following command

```bash
enonic project build
```

You will find the jar-file at _./build/libs/item.jar_

### Deploying locally

To deploy to a local sandbox, run the following command

```bash
enonic project deploy
```

### Deploy to Maven

```bash
./gradlew publish -P com.enonic.xp.app.production=true
```
