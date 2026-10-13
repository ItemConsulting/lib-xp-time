const t = require("/lib/xp/testing");
const time = require("/lib/time");
const LocalDate = time.LocalDate;
const LocalTime = time.LocalTime;
const OffsetTime = time.OffsetTime;
const Instant = time.Instant;
const Month = time.Month;
const DayOfWeek = time.DayOfWeek;
const ZoneId = time.ZoneId;
const ZoneOffset = time.ZoneOffset;
const DateTimeFormatter = time.DateTimeFormatter;

// A Wednesday, and day 39 of a year that is not a leap year
const date = LocalDate.parse("2023-02-08");
const oslo = ZoneId.of("Europe/Oslo");

exports.testCreate = function () {
  t.assertEquals(date, LocalDate.of(2023, 2, 8));
  t.assertEquals(date, LocalDate.of(2023, Month.FEBRUARY, 8));
  t.assertEquals(date, LocalDate.ofYearDay(2023, 39));
  t.assertEquals(date, LocalDate.parse("08.02.2023", DateTimeFormatter.ofPattern("dd.MM.yyyy")));
  t.assertEquals(LocalDate.EPOCH, LocalDate.ofEpochDay(0));
  t.assertEquals("1970-01-01", LocalDate.EPOCH.toString());
  // 23:30 UTC is already the next day in Oslo
  t.assertEquals(date, LocalDate.ofInstant(Instant.parse("2023-02-07T23:30:00Z"), oslo));
};

exports.testNow = function () {
  t.assertTrue(LocalDate.now().isAfter(date));
  t.assertTrue(LocalDate.now(oslo).isAfter(date));
  t.assertTrue(LocalDate.MIN.isBefore(date));
  t.assertTrue(LocalDate.MAX.isAfter(date));
};

exports.testRejectsInvalidDates = function () {
  t.assertThrows(function () {
    LocalDate.parse("2023-02-30");
  });
  t.assertThrows(function () {
    LocalDate.of(2023, 13, 1);
  });
  t.assertThrows(function () {
    LocalDate.parse("not a date");
  });
};

exports.testFormat = function () {
  t.assertEquals("2023-02-08", date.toString());
  t.assertEquals("2023-W06-3", date.format(DateTimeFormatter.ISO_WEEK_DATE));
  t.assertEquals("2023-039", date.format(DateTimeFormatter.ISO_ORDINAL_DATE));
  t.assertEquals("20230208", date.format(DateTimeFormatter.BASIC_ISO_DATE));
  t.assertEquals("08.02.2023", date.format(DateTimeFormatter.ofPattern("dd.MM.yyyy")));
};

exports.testPlus = function () {
  t.assertEquals("2023-02-09", date.plusDays(1).toString());
  t.assertEquals("2023-02-15", date.plusWeeks(1).toString());
  t.assertEquals("2023-03-08", date.plusMonths(1).toString());
  t.assertEquals("2024-02-08", date.plusYears(1).toString());
  // Rolls over month and year
  t.assertEquals("2023-03-01", date.plusDays(21).toString());
  t.assertEquals("2024-01-01", LocalDate.parse("2023-12-31").plusDays(1).toString());
};

exports.testMinus = function () {
  t.assertEquals("2023-02-07", date.minusDays(1).toString());
  t.assertEquals("2023-02-01", date.minusWeeks(1).toString());
  t.assertEquals("2023-01-08", date.minusMonths(1).toString());
  t.assertEquals("2022-02-08", date.minusYears(1).toString());
  t.assertEquals("2022-12-31", LocalDate.parse("2023-01-01").minusDays(1).toString());
};

exports.testPlusClampsToLastDayOfMonth = function () {
  t.assertEquals("2023-02-28", LocalDate.parse("2023-01-31").plusMonths(1).toString());
  t.assertEquals("2024-02-29", LocalDate.parse("2024-01-31").plusMonths(1).toString());
  t.assertEquals("2025-02-28", LocalDate.parse("2024-02-29").plusYears(1).toString());
};

exports.testGetters = function () {
  t.assertEquals(2023, date.getYear());
  t.assertEquals(2, date.getMonthValue());
  t.assertEquals(Month.FEBRUARY, date.getMonth());
  t.assertEquals(8, date.getDayOfMonth());
  t.assertEquals(39, date.getDayOfYear());
  t.assertEquals(DayOfWeek.WEDNESDAY, date.getDayOfWeek());
};

exports.testLengths = function () {
  t.assertFalse(date.isLeapYear());
  t.assertEquals(28, date.lengthOfMonth());
  t.assertEquals(365, date.lengthOfYear());

  const leapDay = LocalDate.parse("2024-02-29");
  t.assertTrue(leapDay.isLeapYear());
  t.assertEquals(29, leapDay.lengthOfMonth());
  t.assertEquals(366, leapDay.lengthOfYear());
};

exports.testWith = function () {
  t.assertEquals("2023-02-28", date.withDayOfMonth(28).toString());
  t.assertEquals("2023-01-01", date.withDayOfYear(1).toString());
  t.assertEquals("2023-03-08", date.withMonth(3).toString());
  t.assertEquals("1776-02-08", date.withYear(1776).toString());
  t.assertThrows(function () {
    date.withDayOfMonth(30);
  });
};

exports.testCompare = function () {
  const dayBefore = LocalDate.parse("2023-02-07");

  t.assertTrue(date.isAfter(dayBefore));
  t.assertFalse(date.isBefore(dayBefore));
  t.assertTrue(dayBefore.isBefore(date));
  t.assertFalse(date.isEqual(dayBefore));
  t.assertTrue(date.isEqual(LocalDate.of(2023, 2, 8)));
  t.assertFalse(date.isAfter(date));
  t.assertFalse(date.isBefore(date));
};

exports.testAtTime = function () {
  t.assertEquals("2023-02-08T00:00", date.atStartOfDay().toString());
  t.assertEquals("2023-02-08T00:00+01:00[Europe/Oslo]", date.atStartOfDay(oslo).toString());
  t.assertEquals("2023-02-08T10:15", date.atTime(10, 15).toString());
  t.assertEquals("2023-02-08T10:15:30", date.atTime(10, 15, 30).toString());
  t.assertEquals("2023-02-08T10:15:30.000000001", date.atTime(10, 15, 30, 1).toString());
  t.assertEquals("2023-02-08T10:15:30", date.atTime(LocalTime.parse("10:15:30")).toString());
  t.assertEquals("2023-02-08T10:15:30+02:00", date.atTime(OffsetTime.parse("10:15:30+02:00")).toString());
};

exports.testToEpochSecond = function () {
  t.assertEquals(1675814400, date.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC));
  // One hour ahead of UTC means one hour earlier on the time-line
  t.assertEquals(1675814400 - 3600, date.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.ofHours(1)));
};
