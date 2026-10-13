const t = require("/lib/xp/testing");
const time = require("/lib/time");
const ChronoUnit = time.ChronoUnit;
const Instant = time.Instant;
const LocalDate = time.LocalDate;
const LocalTime = time.LocalTime;
const LocalDateTime = time.LocalDateTime;
const OffsetDateTime = time.OffsetDateTime;
const ZonedDateTime = time.ZonedDateTime;

const NAMES = [
  "NANOS",
  "MICROS",
  "MILLIS",
  "SECONDS",
  "MINUTES",
  "HOURS",
  "HALF_DAYS",
  "DAYS",
  "WEEKS",
  "MONTHS",
  "YEARS",
  "DECADES",
  "CENTURIES",
  "MILLENNIA",
  "ERAS",
  "FOREVER"
];

const date = LocalDate.parse("2023-02-08");
const dateTime = LocalDateTime.parse("2023-02-08T10:15:30");

exports.testConstants = function () {
  NAMES.forEach(function (name) {
    t.assertTrue(!!ChronoUnit[name], "ChronoUnit." + name + " is missing");
    t.assertEquals(ChronoUnit[name], ChronoUnit.valueOf(name));
  });
  t.assertEquals(NAMES.length, ChronoUnit.values().length);
  t.assertThrows(function () {
    ChronoUnit.valueOf("FORTNIGHTS");
  });
};

exports.testToString = function () {
  // The display name, not the name of the constant
  t.assertEquals("Days", ChronoUnit.DAYS.toString());
  t.assertEquals("HalfDays", ChronoUnit.HALF_DAYS.toString());
};

exports.testBetweenDates = function () {
  const threeWeeksLater = LocalDate.parse("2023-03-01");

  t.assertEquals(21, ChronoUnit.DAYS.between(date, threeWeeksLater));
  t.assertEquals(3, ChronoUnit.WEEKS.between(date, threeWeeksLater));
  t.assertEquals(-21, ChronoUnit.DAYS.between(threeWeeksLater, date));
  t.assertEquals(0, ChronoUnit.DAYS.between(date, date));
  t.assertEquals(32, ChronoUnit.YEARS.between(LocalDate.parse("1990-05-17"), date));
  t.assertEquals(3, ChronoUnit.DECADES.between(LocalDate.parse("1990-05-17"), date));
};

exports.testBetweenCountsWholeUnits = function () {
  t.assertEquals(0, ChronoUnit.MONTHS.between(date, LocalDate.parse("2023-03-07")));
  t.assertEquals(1, ChronoUnit.MONTHS.between(date, LocalDate.parse("2023-03-08")));
  t.assertEquals(2, ChronoUnit.HOURS.between(dateTime, LocalDateTime.parse("2023-02-08T13:00:00")));
  t.assertEquals(164, ChronoUnit.MINUTES.between(dateTime, LocalDateTime.parse("2023-02-08T13:00:00")));
};

exports.testBetweenPointsInTime = function () {
  const start = Instant.parse("2023-02-08T10:15:30Z");

  t.assertEquals(5400, ChronoUnit.SECONDS.between(start, Instant.parse("2023-02-08T11:45:30Z")));
  t.assertEquals(5400000, ChronoUnit.MILLIS.between(start, Instant.parse("2023-02-08T11:45:30Z")));
  // The same instant written with two different offsets
  t.assertEquals(
    0,
    ChronoUnit.SECONDS.between(
      OffsetDateTime.parse("2023-02-08T10:15:30+01:00"),
      OffsetDateTime.parse("2023-02-08T09:15:30Z")
    )
  );
};

exports.testBetweenConvertsEndToTypeOfStart = function () {
  t.assertEquals(2, ChronoUnit.DAYS.between(date, LocalDateTime.parse("2023-02-10T23:00:00")));
};

exports.testBetweenNeedsUnitTheTypeHas = function () {
  t.assertThrows(function () {
    ChronoUnit.HOURS.between(date, LocalDate.parse("2023-02-09"));
  });
  t.assertThrows(function () {
    ChronoUnit.DAYS.between(LocalTime.parse("10:00"), LocalTime.parse("12:00"));
  });
};

exports.testBetweenAcrossDaylightSaving = function () {
  // Summer time in Oslo started on 2023-03-26, so that day was only 23 hours long
  const dayBefore = ZonedDateTime.parse("2023-03-25T12:00:00+01:00[Europe/Oslo]");
  const sameTimeNextDay = ZonedDateTime.parse("2023-03-26T12:00:00+02:00[Europe/Oslo]");

  t.assertEquals(1, ChronoUnit.DAYS.between(dayBefore, sameTimeNextDay));
  t.assertEquals(23, ChronoUnit.HOURS.between(dayBefore, sameTimeNextDay));
};

exports.testUnitProperties = function () {
  t.assertEquals("PT1H", ChronoUnit.HOURS.getDuration().toString());
  t.assertEquals("PT24H", ChronoUnit.DAYS.getDuration().toString());
  t.assertEquals("PT168H", ChronoUnit.WEEKS.getDuration().toString());

  t.assertTrue(ChronoUnit.HOURS.isTimeBased());
  t.assertFalse(ChronoUnit.HOURS.isDateBased());
  t.assertTrue(ChronoUnit.DAYS.isDateBased());
  t.assertFalse(ChronoUnit.DAYS.isTimeBased());

  // A day is not always 24 hours, so its duration is an estimate
  t.assertTrue(ChronoUnit.DAYS.isDurationEstimated());
  t.assertFalse(ChronoUnit.HOURS.isDurationEstimated());
};

exports.testPlusAndMinusWithUnit = function () {
  t.assertEquals("2023-03-01", date.plus(3, ChronoUnit.WEEKS).toString());
  t.assertEquals("2013-02-08", date.minus(1, ChronoUnit.DECADES).toString());
  t.assertEquals("2023-02-08T11:45:30", dateTime.plus(90, ChronoUnit.MINUTES).toString());
  t.assertEquals("2023-02-07T22:15:30", dateTime.minus(12, ChronoUnit.HOURS).toString());
  t.assertEquals("11:15:30", LocalTime.parse("10:15:30").plus(1, ChronoUnit.HOURS).toString());
  t.assertEquals("2023-02-09T10:15:30Z", Instant.parse("2023-02-08T10:15:30Z").plus(1, ChronoUnit.DAYS).toString());
  t.assertEquals(
    "2023-03-08T10:15:30+01:00[Europe/Oslo]",
    ZonedDateTime.parse("2023-02-08T10:15:30+01:00[Europe/Oslo]").plus(1, ChronoUnit.MONTHS).toString()
  );
  t.assertThrows(function () {
    date.plus(1, ChronoUnit.HOURS);
  });
};

exports.testUntil = function () {
  const threeWeeksLater = LocalDate.parse("2023-03-01");

  t.assertEquals(21, date.until(threeWeeksLater, ChronoUnit.DAYS));
  t.assertEquals(-3, threeWeeksLater.until(date, ChronoUnit.WEEKS));
  t.assertEquals("P21D", date.until(threeWeeksLater).toString());
  t.assertEquals(164, dateTime.until(LocalDateTime.parse("2023-02-08T13:00:00"), ChronoUnit.MINUTES));
  t.assertEquals(90, LocalTime.parse("10:15").until(LocalTime.parse("11:45"), ChronoUnit.MINUTES));
};

exports.testTimeAgo = function () {
  const published = Instant.parse("2023-02-05T08:00:00Z");
  const now = Instant.parse("2023-02-08T10:15:30Z");

  t.assertEquals(3, ChronoUnit.DAYS.between(published, now));
  t.assertEquals(74, ChronoUnit.HOURS.between(published, now));
  t.assertEquals(3, published.until(now, ChronoUnit.DAYS));
};

exports.testTruncatedTo = function () {
  t.assertEquals("2023-02-08T10:15", dateTime.truncatedTo(ChronoUnit.MINUTES).toString());
  t.assertEquals("2023-02-08T10:00", dateTime.truncatedTo(ChronoUnit.HOURS).toString());
  t.assertEquals("2023-02-08T00:00", dateTime.truncatedTo(ChronoUnit.DAYS).toString());
  t.assertEquals("10:15", LocalTime.parse("10:15:30.123").truncatedTo(ChronoUnit.MINUTES).toString());
  t.assertEquals(
    "2023-02-08T10:15:30Z",
    Instant.parse("2023-02-08T10:15:30.123Z").truncatedTo(ChronoUnit.SECONDS).toString()
  );
  t.assertEquals(
    "2023-02-08T00:00+01:00[Europe/Oslo]",
    ZonedDateTime.parse("2023-02-08T10:15:30+01:00[Europe/Oslo]").truncatedTo(ChronoUnit.DAYS).toString()
  );
  // Nothing larger than a day can be truncated to
  t.assertThrows(function () {
    dateTime.truncatedTo(ChronoUnit.MONTHS);
  });
};
