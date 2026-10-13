const t = require("/lib/xp/testing");
const time = require("/lib/time");
const OffsetDateTime = time.OffsetDateTime;
const LocalDateTime = time.LocalDateTime;
const LocalDate = time.LocalDate;
const LocalTime = time.LocalTime;
const Instant = time.Instant;
const Month = time.Month;
const DayOfWeek = time.DayOfWeek;
const ZoneId = time.ZoneId;
const ZoneOffset = time.ZoneOffset;
const DateTimeFormatter = time.DateTimeFormatter;

// A Wednesday. The same instant as 09:15:30 UTC, which is 1675847730 seconds after the epoch.
const dateTime = OffsetDateTime.parse("2023-02-08T10:15:30+01:00");
const plusOne = ZoneOffset.ofHours(1);
const plusThree = ZoneOffset.ofHours(3);
const oslo = ZoneId.of("Europe/Oslo");
const newYork = ZoneId.of("America/New_York");

exports.testCreate = function () {
  t.assertEquals(dateTime, OffsetDateTime.of(2023, 2, 8, 10, 15, 30, 0, plusOne));
  t.assertEquals(dateTime, OffsetDateTime.of(LocalDate.parse("2023-02-08"), LocalTime.parse("10:15:30"), plusOne));
  t.assertEquals(dateTime, OffsetDateTime.of(LocalDateTime.parse("2023-02-08T10:15:30"), plusOne));
  t.assertEquals(dateTime, OffsetDateTime.ofInstant(Instant.parse("2023-02-08T09:15:30Z"), oslo));
  t.assertEquals(dateTime, OffsetDateTime.parse("2023-02-08T10:15:30+01:00", DateTimeFormatter.ISO_DATE_TIME));
};

exports.testNow = function () {
  t.assertTrue(OffsetDateTime.now().isAfter(dateTime));
  t.assertTrue(OffsetDateTime.now(oslo).isAfter(dateTime));
  t.assertTrue(OffsetDateTime.MIN.isBefore(dateTime));
  t.assertTrue(OffsetDateTime.MAX.isAfter(dateTime));
};

exports.testRejectsInvalidValues = function () {
  // An offset is required
  t.assertThrows(function () {
    OffsetDateTime.parse("2023-02-08T10:15:30");
  });
  t.assertThrows(function () {
    OffsetDateTime.parse("2023-02-30T10:15:30+01:00");
  });
};

exports.testFormat = function () {
  t.assertEquals("2023-02-08T10:15:30+01:00", dateTime.toString());
  t.assertEquals("2023-02-08T10:15:30+01:00", dateTime.format(DateTimeFormatter.ISO_DATE_TIME));
  t.assertEquals("10:15:30+01:00", dateTime.format(DateTimeFormatter.ISO_OFFSET_TIME));
  t.assertEquals("Wed, 8 Feb 2023 10:15:30 +0100", dateTime.format(DateTimeFormatter.RFC_1123_DATE_TIME));
  t.assertEquals("2023-02-08T09:15:30Z", dateTime.format(DateTimeFormatter.ISO_INSTANT));
  t.assertEquals("08.02.2023 10:15 +01:00", dateTime.format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm xxx")));
};

exports.testPlus = function () {
  t.assertEquals("2024-02-08T10:15:30+01:00", dateTime.plusYears(1).toString());
  t.assertEquals("2023-03-08T10:15:30+01:00", dateTime.plusMonths(1).toString());
  t.assertEquals("2023-02-15T10:15:30+01:00", dateTime.plusWeeks(1).toString());
  t.assertEquals("2023-02-09T10:15:30+01:00", dateTime.plusDays(1).toString());
  t.assertEquals("2023-02-08T11:15:30+01:00", dateTime.plusHours(1).toString());
  t.assertEquals("2023-02-08T10:16:30+01:00", dateTime.plusMinutes(1).toString());
  t.assertEquals("2023-02-08T10:15:31+01:00", dateTime.plusSeconds(1).toString());
  t.assertEquals("2023-02-08T10:15:30.000010+01:00", dateTime.plusNanos(10000).toString());
};

exports.testMinus = function () {
  t.assertEquals("2022-02-08T10:15:30+01:00", dateTime.minusYears(1).toString());
  t.assertEquals("2023-01-08T10:15:30+01:00", dateTime.minusMonths(1).toString());
  t.assertEquals("2023-02-01T10:15:30+01:00", dateTime.minusWeeks(1).toString());
  t.assertEquals("2023-02-07T10:15:30+01:00", dateTime.minusDays(1).toString());
  t.assertEquals("2023-02-08T09:15:30+01:00", dateTime.minusHours(1).toString());
  t.assertEquals("2023-02-08T10:14:30+01:00", dateTime.minusMinutes(1).toString());
  t.assertEquals("2023-02-08T10:15:29+01:00", dateTime.minusSeconds(1).toString());
  t.assertEquals("2023-02-08T10:15:29.999990+01:00", dateTime.minusNanos(10000).toString());
  // Borrows from the previous day
  t.assertEquals("2023-02-07T23:15:30+01:00", dateTime.minusHours(11).toString());
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
};

exports.testWith = function () {
  t.assertEquals("2000-02-08T10:15:30+01:00", dateTime.withYear(2000).toString());
  t.assertEquals("2023-01-08T10:15:30+01:00", dateTime.withMonth(1).toString());
  t.assertEquals("2023-02-01T10:15:30+01:00", dateTime.withDayOfMonth(1).toString());
  t.assertEquals("2023-01-01T10:15:30+01:00", dateTime.withDayOfYear(1).toString());
  t.assertEquals("2023-02-08T01:15:30+01:00", dateTime.withHour(1).toString());
  t.assertEquals("2023-02-08T10:01:30+01:00", dateTime.withMinute(1).toString());
  t.assertEquals("2023-02-08T10:15:01+01:00", dateTime.withSecond(1).toString());
  t.assertEquals("2023-02-08T10:15:30.000001+01:00", dateTime.withNano(1000).toString());
};

exports.testWithOffset = function () {
  // Same instant: the clock time moves with the offset
  t.assertEquals("2023-02-08T12:15:30+03:00", dateTime.withOffsetSameInstant(plusThree).toString());
  t.assertTrue(dateTime.isEqual(dateTime.withOffsetSameInstant(plusThree)));

  // Same local time: the clock time stays, so the instant moves
  t.assertEquals("2023-02-08T10:15:30+03:00", dateTime.withOffsetSameLocal(plusThree).toString());
  t.assertFalse(dateTime.isEqual(dateTime.withOffsetSameLocal(plusThree)));
};

exports.testCompare = function () {
  const later = dateTime.plusSeconds(1);

  t.assertTrue(later.isAfter(dateTime));
  t.assertFalse(later.isBefore(dateTime));
  t.assertTrue(dateTime.isBefore(later));
  t.assertFalse(dateTime.isEqual(later));
  t.assertTrue(dateTime.compareTo(later) < 0);
  t.assertTrue(later.compareTo(dateTime) > 0);
  t.assertEquals(0, dateTime.compareTo(OffsetDateTime.parse("2023-02-08T10:15:30+01:00")));
};

exports.testCompareAcrossOffsets = function () {
  const sameInstantInUtc = OffsetDateTime.parse("2023-02-08T09:15:30Z");

  // isEqual() compares the instant, equals() also compares the offset
  t.assertTrue(dateTime.isEqual(sameInstantInUtc));
  t.assertNotEquals(dateTime, sameInstantInUtc);
  t.assertFalse(dateTime.isAfter(sameInstantInUtc));
  t.assertFalse(dateTime.isBefore(sameInstantInUtc));

  // The same clock time further east is an earlier instant
  t.assertTrue(dateTime.isAfter(OffsetDateTime.parse("2023-02-08T10:15:30+03:00")));
};

exports.testAtZone = function () {
  t.assertEquals("2023-02-08T10:15:30+01:00[Europe/Oslo]", dateTime.atZoneSameInstant(oslo).toString());
  t.assertEquals("2023-02-08T04:15:30-05:00[America/New_York]", dateTime.atZoneSameInstant(newYork).toString());
  t.assertEquals("2023-02-08T10:15:30-05:00[America/New_York]", dateTime.atZoneSimilarLocal(newYork).toString());
};

exports.testConversions = function () {
  t.assertEquals(1675847730, dateTime.toEpochSecond());
  t.assertEquals("2023-02-08T09:15:30Z", dateTime.toInstant().toString());
  t.assertEquals("2023-02-08", dateTime.toLocalDate().toString());
  t.assertEquals("2023-02-08T10:15:30", dateTime.toLocalDateTime().toString());
  t.assertEquals("10:15:30", dateTime.toLocalTime().toString());
  t.assertEquals("10:15:30+01:00", dateTime.toOffsetTime().toString());
  t.assertEquals("2023-02-08T10:15:30+01:00", dateTime.toZonedDateTime().toString());
};
