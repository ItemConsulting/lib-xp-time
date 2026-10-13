const t = require("/lib/xp/testing");
const time = require("/lib/time");
const ZonedDateTime = time.ZonedDateTime;
const LocalDateTime = time.LocalDateTime;
const LocalDate = time.LocalDate;
const LocalTime = time.LocalTime;
const Instant = time.Instant;
const Month = time.Month;
const DayOfWeek = time.DayOfWeek;
const ZoneId = time.ZoneId;
const ZoneOffset = time.ZoneOffset;
const Locale = time.Locale;
const DateTimeFormatter = time.DateTimeFormatter;

const oslo = ZoneId.of("Europe/Oslo");
const newYork = ZoneId.of("America/New_York");
const plusOne = ZoneOffset.ofHours(1);
const plusTwo = ZoneOffset.ofHours(2);

// A Wednesday in winter. The same instant as 09:15:30 UTC, which is 1675847730 seconds after the epoch.
const dateTime = ZonedDateTime.parse("2023-02-08T10:15:30+01:00[Europe/Oslo]");
const localDateTime = LocalDateTime.parse("2023-02-08T10:15:30");

exports.testCreate = function () {
  t.assertEquals(dateTime, ZonedDateTime.of(2023, 2, 8, 10, 15, 30, 0, oslo));
  t.assertEquals(dateTime, ZonedDateTime.of(LocalDate.parse("2023-02-08"), LocalTime.parse("10:15:30"), oslo));
  t.assertEquals(dateTime, ZonedDateTime.of(localDateTime, oslo));
  t.assertEquals(dateTime, ZonedDateTime.ofInstant(Instant.parse("2023-02-08T09:15:30Z"), oslo));
  t.assertEquals(dateTime, ZonedDateTime.ofInstant(localDateTime, plusOne, oslo));
  t.assertEquals(dateTime, ZonedDateTime.ofLocal(localDateTime, oslo, plusOne));
  t.assertEquals(dateTime, ZonedDateTime.ofStrict(localDateTime, plusOne, oslo));
  t.assertEquals(
    dateTime,
    ZonedDateTime.parse("2023-02-08T10:15:30+01:00[Europe/Oslo]", DateTimeFormatter.ISO_ZONED_DATE_TIME)
  );
};

exports.testOfStrictRejectsWrongOffset = function () {
  // Oslo is at +01:00 in February
  t.assertThrows(function () {
    ZonedDateTime.ofStrict(localDateTime, plusTwo, oslo);
  });
};

exports.testNow = function () {
  t.assertTrue(ZonedDateTime.now().isAfter(dateTime));
  t.assertEquals(newYork, ZonedDateTime.now(newYork).getZone());
};

exports.testFormat = function () {
  t.assertEquals("2023-02-08T10:15:30+01:00[Europe/Oslo]", dateTime.toString());
  t.assertEquals("2023-02-08T10:15:30+01:00[Europe/Oslo]", dateTime.format(DateTimeFormatter.ISO_ZONED_DATE_TIME));
  t.assertEquals("2023-02-08T09:15:30Z", dateTime.format(DateTimeFormatter.ISO_INSTANT));
  t.assertEquals("08.02.2023 10:15 Europe/Oslo", dateTime.format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm VV")));
  t.assertEquals(
    "onsdag 8. februar 2023",
    dateTime.format(DateTimeFormatter.ofPattern("EEEE d. MMMM yyyy", new Locale("no")))
  );
};

exports.testPlus = function () {
  t.assertEquals("2024-02-08T10:15:30+01:00[Europe/Oslo]", dateTime.plusYears(1).toString());
  t.assertEquals("2023-03-08T10:15:30+01:00[Europe/Oslo]", dateTime.plusMonths(1).toString());
  t.assertEquals("2023-02-15T10:15:30+01:00[Europe/Oslo]", dateTime.plusWeeks(1).toString());
  t.assertEquals("2023-02-09T10:15:30+01:00[Europe/Oslo]", dateTime.plusDays(1).toString());
  t.assertEquals("2023-02-08T11:15:30+01:00[Europe/Oslo]", dateTime.plusHours(1).toString());
  t.assertEquals("2023-02-08T10:16:30+01:00[Europe/Oslo]", dateTime.plusMinutes(1).toString());
  t.assertEquals("2023-02-08T10:15:31+01:00[Europe/Oslo]", dateTime.plusSeconds(1).toString());
  t.assertEquals("2023-02-08T10:15:30.000010+01:00[Europe/Oslo]", dateTime.plusNanos(10000).toString());
};

exports.testMinus = function () {
  t.assertEquals("2022-02-08T10:15:30+01:00[Europe/Oslo]", dateTime.minusYears(1).toString());
  t.assertEquals("2023-01-08T10:15:30+01:00[Europe/Oslo]", dateTime.minusMonths(1).toString());
  t.assertEquals("2023-02-01T10:15:30+01:00[Europe/Oslo]", dateTime.minusWeeks(1).toString());
  t.assertEquals("2023-02-07T10:15:30+01:00[Europe/Oslo]", dateTime.minusDays(1).toString());
  t.assertEquals("2023-02-08T09:15:30+01:00[Europe/Oslo]", dateTime.minusHours(1).toString());
  t.assertEquals("2023-02-08T10:14:30+01:00[Europe/Oslo]", dateTime.minusMinutes(1).toString());
  t.assertEquals("2023-02-08T10:15:29+01:00[Europe/Oslo]", dateTime.minusSeconds(1).toString());
  t.assertEquals("2023-02-08T10:15:29.999990+01:00[Europe/Oslo]", dateTime.minusNanos(10000).toString());
};

exports.testPlusAcrossDaylightSavingStart = function () {
  // Summer time in Oslo started 2023-03-26 at 02:00, so that day was only 23 hours long
  const dayBefore = ZonedDateTime.parse("2023-03-25T12:00:00+01:00[Europe/Oslo]");

  // Adding a day keeps the clock time, and the offset changes
  t.assertEquals("2023-03-26T12:00+02:00[Europe/Oslo]", dayBefore.plusDays(1).toString());
  // Adding 24 hours moves along the time-line, so the clock time ends up an hour later
  t.assertEquals("2023-03-26T13:00+02:00[Europe/Oslo]", dayBefore.plusHours(24).toString());
};

exports.testMinusAcrossDaylightSavingEnd = function () {
  // Summer time in Oslo ended 2023-10-29 at 03:00, so that day was 25 hours long
  const dayAfter = ZonedDateTime.parse("2023-10-30T12:00:00+01:00[Europe/Oslo]");

  t.assertEquals("2023-10-29T12:00+01:00[Europe/Oslo]", dayAfter.minusDays(1).toString());
  t.assertEquals("2023-10-28T12:00+02:00[Europe/Oslo]", dayAfter.minusDays(2).toString());
  t.assertEquals("2023-10-28T13:00+02:00[Europe/Oslo]", dayAfter.minusHours(48).toString());
};

exports.testGetters = function () {
  t.assertEquals(2023, dateTime.getYear());
  t.assertEquals(Month.FEBRUARY, dateTime.getMonth());
  t.assertEquals(2, dateTime.getMonthValue());
  t.assertEquals(8, dateTime.getDayOfMonth());
  t.assertEquals(39, dateTime.getDayOfYear());
  t.assertEquals(DayOfWeek.WEDNESDAY, dateTime.getDayOfWeek());
  t.assertEquals(10, dateTime.getHour());
  t.assertEquals(15, dateTime.getMinute());
  t.assertEquals(30, dateTime.getSecond());
  t.assertEquals(0, dateTime.getNano());
  t.assertEquals(plusOne, dateTime.getOffset());
  t.assertEquals(oslo, dateTime.getZone());
};

exports.testOffsetFollowsDaylightSaving = function () {
  t.assertEquals(plusOne, dateTime.getOffset());
  t.assertEquals(plusTwo, dateTime.withMonth(7).getOffset());
};

exports.testWith = function () {
  t.assertEquals("2000-02-08T10:15:30+01:00[Europe/Oslo]", dateTime.withYear(2000).toString());
  t.assertEquals("2023-01-08T10:15:30+01:00[Europe/Oslo]", dateTime.withMonth(1).toString());
  t.assertEquals("2023-02-01T10:15:30+01:00[Europe/Oslo]", dateTime.withDayOfMonth(1).toString());
  t.assertEquals("2023-01-01T10:15:30+01:00[Europe/Oslo]", dateTime.withDayOfYear(1).toString());
  t.assertEquals("2023-02-08T01:15:30+01:00[Europe/Oslo]", dateTime.withHour(1).toString());
  t.assertEquals("2023-02-08T10:01:30+01:00[Europe/Oslo]", dateTime.withMinute(1).toString());
  t.assertEquals("2023-02-08T10:15:01+01:00[Europe/Oslo]", dateTime.withSecond(1).toString());
  t.assertEquals("2023-02-08T10:15:30.000010+01:00[Europe/Oslo]", dateTime.withNano(10000).toString());
};

exports.testWithZone = function () {
  // Same instant: the clock time moves with the zone
  t.assertEquals("2023-02-08T04:15:30-05:00[America/New_York]", dateTime.withZoneSameInstant(newYork).toString());
  t.assertTrue(dateTime.isEqual(dateTime.withZoneSameInstant(newYork)));

  // Same local time: the clock time stays, so the instant moves
  t.assertEquals("2023-02-08T10:15:30-05:00[America/New_York]", dateTime.withZoneSameLocal(newYork).toString());
  t.assertFalse(dateTime.isEqual(dateTime.withZoneSameLocal(newYork)));

  t.assertEquals("2023-02-08T10:15:30+01:00", dateTime.withFixedOffsetZone().toString());
};

exports.testOffsetAtOverlap = function () {
  // Clocks in Oslo went from 03:00 back to 02:00 on this night, so 02:30 happened twice
  const inOverlap = ZonedDateTime.of(LocalDateTime.parse("2023-10-29T02:30:00"), oslo);

  // The first one, in summer time, is the default
  t.assertEquals("2023-10-29T02:30+02:00[Europe/Oslo]", inOverlap.toString());
  t.assertEquals("2023-10-29T02:30+01:00[Europe/Oslo]", inOverlap.withLaterOffsetAtOverlap().toString());
  t.assertEquals(
    "2023-10-29T02:30+02:00[Europe/Oslo]",
    inOverlap.withLaterOffsetAtOverlap().withEarlierOffsetAtOverlap().toString()
  );
  t.assertEquals(
    "2023-10-29T02:30+01:00[Europe/Oslo]",
    ZonedDateTime.ofLocal(LocalDateTime.parse("2023-10-29T02:30:00"), oslo, plusOne).toString()
  );

  // Outside an overlap there is nothing to choose between
  t.assertEquals(dateTime, dateTime.withEarlierOffsetAtOverlap());
  t.assertEquals(dateTime, dateTime.withLaterOffsetAtOverlap());
};

exports.testCompare = function () {
  const later = dateTime.plusSeconds(1);

  t.assertTrue(later.isAfter(dateTime));
  t.assertFalse(later.isBefore(dateTime));
  t.assertTrue(dateTime.isBefore(later));
  t.assertFalse(dateTime.isEqual(later));

  // isEqual() compares the instant, equals() also compares the zone
  const sameInstantInNewYork = ZonedDateTime.parse("2023-02-08T04:15:30-05:00[America/New_York]");
  t.assertTrue(dateTime.isEqual(sameInstantInNewYork));
  t.assertNotEquals(dateTime, sameInstantInNewYork);
};

exports.testConversions = function () {
  t.assertEquals(1675847730, dateTime.toEpochSecond());
  t.assertEquals("2023-02-08T09:15:30Z", dateTime.toInstant().toString());
  t.assertEquals("2023-02-08", dateTime.toLocalDate().toString());
  t.assertEquals("2023-02-08T10:15:30", dateTime.toLocalDateTime().toString());
  t.assertEquals("10:15:30", dateTime.toLocalTime().toString());
  t.assertEquals("2023-02-08T10:15:30+01:00", dateTime.toOffsetDateTime().toString());
};
