# Time library for Enonic XP

This library is used to 

[![](https://jitpack.io/v/no.item/lib-xp-time.svg)](https://jitpack.io/#no.item/lib-xp-time)

<img src="https://github.com/ItemConsulting/lib-xp-time/raw/main/docs/icon.svg?sanitize=true" width="150">

## Installation

To install this library you need to add a new dependency to your app's build.gradle file.

### Gradle

```groovy
repositories {
  maven { url 'https://jitpack.io' }
}

dependencies {
  include "no.item:lib-xp-time:0.1.0"
}
```

To update the version of *enonic-types* in *package.json* using npm, run the following command:
```bash
npm install --save-dev @item-enonic-types/lib-time
```

### TypeScript

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
In `"/lib/time"` you will find the most common date types & functions wrapped from the respective Java.Time library.
*Example usage from exposed constants in index.ts :*

```typescript
import { LocalDateTime, DateTimeFormatter } from "/lib/time";

//LocalDateTime
const localDateTime = LocalDateTime.parse("2023-02-21T12:15:30");
const plusThreeWeeks = localDateTime.plusWeeks(3);
const formatted = plusThreeWeeks.format(DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss"));
//formatted date will be equal to "14-03-2023 12:15:30"
```

```typescript
import { ZonedDateTime } from "/lib/time";

//ZonedDateTime
const zonedDateTime = ZonedDateTime.parse("2023-02-21T12:15:30+01:00");
const minusFiftyMinutes = zonedDateTime.minusMinutes(50);
const time = minusFiftyMinutes.toLocalTime();
//time will be equal to "11:25:30"
```

### Constants exposed from `"/lib/time"`
The following constants is exposed/exported from `"/lib/time"`:
* `DateTimeFormatter`
* `DayOfWeek`
* `Instant`
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

### Building

To build the project run the following code

```bash
./gradlew build
```

### Deploy locally

Deploy locally for testing purposes:

```bash
./gradlew publishToMavenLocal
```
## Deploy to Jitpack

Go to the [Jitpack page for lib-xp-time](https://jitpack.io/#no.item/lib-xp-time) to deploy from GitHub (after
[creating a new versioned release](https://github.com/ItemConsulting/lib-xp-time/releases/new)).
