const t = require("/lib/xp/testing");
const time = require("/lib/time");
const LocalDateTime = time.LocalDateTime;
const LocalDate = time.LocalDate;
const LocalTime = time.LocalTime;
const OffsetDateTime = time.OffsetDateTime;
const ZonedDateTime = time.ZonedDateTime;
const Instant = time.Instant;
const Month = time.Month;
const DayOfWeek = time.DayOfWeek;
const ZoneId = time.ZoneId;
const ZoneOffset = time.ZoneOffset;
const Locale = time.Locale;
const DateTimeFormatter = time.DateTimeFormatter;

// A Wednesday. 11:15:30 UTC on this date is 1675854930 seconds after the epoch.
const dateTime = LocalDateTime.parse("2023-02-08T11:15:30");
const oslo = ZoneId.of("Europe/Oslo");

exports.testCreate = function () {
  t.assertEquals("2023-02-08T11:15", LocalDateTime.of(2023, 2, 8, 11, 15).toString());
  t.assertEquals(dateTime, LocalDateTime.of(2023, 2, 8, 11, 15, 30));
  t.assertEquals("2023-02-08T11:15:30.000000001", LocalDateTime.of(2023, 2, 8, 11, 15, 30, 1).toString());
  t.assertEquals("2023-02-08T11:15", LocalDateTime.of(2023, Month.FEBRUARY, 8, 11, 15).toString());
  t.assertEquals(dateTime, LocalDateTime.of(2023, Month.FEBRUARY, 8, 11, 15, 30));
  t.assertEquals(dateTime, LocalDateTime.of(2023, Month.FEBRUARY, 8, 11, 15, 30, 0));
  t.assertEquals(dateTime, LocalDateTime.of(LocalDate.parse("2023-02-08"), LocalTime.parse("11:15:30")));
  t.assertEquals(dateTime, LocalDateTime.ofEpochSecond(1675854930, 0, ZoneOffset.UTC));
  t.assertEquals(dateTime, LocalDateTime.ofInstant(Instant.parse("2023-02-08T10:15:30Z"), oslo));
  t.assertEquals(
    "2023-02-08T11:15",
    LocalDateTime.parse("08.02.2023 11:15", DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")).toString()
  );
};

exports.testNow = function () {
  t.assertTrue(LocalDateTime.now().isAfter(dateTime));
  t.assertTrue(LocalDateTime.now(oslo).isAfter(dateTime));
  t.assertTrue(LocalDateTime.MIN.isBefore(dateTime));
  t.assertTrue(LocalDateTime.MAX.isAfter(dateTime));
};

exports.testRejectsInvalidValues = function () {
  t.assertThrows(function () {
    LocalDateTime.parse("2023-02-30T11:15:30");
  });
  // A LocalDateTime has no offset
  t.assertThrows(function () {
    LocalDateTime.parse("2023-02-08T11:15:30Z");
  });
  t.assertThrows(function () {
    LocalDateTime.of(2023, 2, 8, 24, 0);
  });
};

exports.testFormat = function () {
  t.assertEquals("2023-02-08T11:15:30", dateTime.toString());
  t.assertEquals("20230208", dateTime.format(DateTimeFormatter.BASIC_ISO_DATE));
  t.assertEquals("2023-02-08T11:15:30", dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
  t.assertEquals("08.02.2023 11:15", dateTime.format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")));
};

exports.testFormatWithLocale = function () {
  const pattern = "EEEE d. MMMM yyyy HH:mm:ss";

  t.assertEquals(
    "onsdag 8. februar 2023 11:15:30",
    dateTime.format(DateTimeFormatter.ofPattern(pattern).withLocale(new Locale("no")))
  );
  t.assertEquals(
    "Wednesday 8. February 2023 11:15:30",
    dateTime.format(DateTimeFormatter.ofPattern(pattern, Locale.ENGLISH))
  );
};

exports.testPlus = function () {
  t.assertEquals("2025-02-08T11:15:30", dateTime.plusYears(2).toString());
  t.assertEquals("2023-04-08T11:15:30", dateTime.plusMonths(2).toString());
  t.assertEquals("2023-02-22T11:15:30", dateTime.plusWeeks(2).toString());
  t.assertEquals("2023-02-10T11:15:30", dateTime.plusDays(2).toString());
  t.assertEquals("2023-02-08T12:15:30", dateTime.plusHours(1).toString());
  t.assertEquals("2023-02-08T11:28:30", dateTime.plusMinutes(13).toString());
  t.assertEquals("2023-02-08T11:15:43", dateTime.plusSeconds(13).toString());
  t.assertEquals("2023-02-08T11:15:30.000000001", dateTime.plusNanos(1).toString());
  // Carries into the next day
  t.assertEquals("2023-02-09T00:15:30", dateTime.plusHours(13).toString());
};

exports.testMinus = function () {
  t.assertEquals("2021-02-08T11:15:30", dateTime.minusYears(2).toString());
  t.assertEquals("2022-12-08T11:15:30", dateTime.minusMonths(2).toString());
  t.assertEquals("2023-01-25T11:15:30", dateTime.minusWeeks(2).toString());
  t.assertEquals("2023-02-06T11:15:30", dateTime.minusDays(2).toString());
  t.assertEquals("2023-02-08T10:15:30", dateTime.minusHours(1).toString());
  t.assertEquals("2023-02-08T11:02:30", dateTime.minusMinutes(13).toString());
  t.assertEquals("2023-02-08T11:15:17", dateTime.minusSeconds(13).toString());
  t.assertEquals("2023-02-08T11:15:29.999999999", dateTime.minusNanos(1).toString());
  // Borrows from the previous day
  t.assertEquals("2023-02-07T23:15:30", dateTime.minusHours(12).toString());
};

exports.testGetters = function () {
  t.assertEquals(2023, dateTime.getYear());
  t.assertEquals(Month.FEBRUARY, dateTime.getMonth());
  t.assertEquals(2, dateTime.getMonthValue());
  t.assertEquals(8, dateTime.getDayOfMonth());
  t.assertEquals(39, dateTime.getDayOfYear());
  t.assertEquals(DayOfWeek.WEDNESDAY, dateTime.getDayOfWeek());
  t.assertEquals(11, dateTime.getHour());
  t.assertEquals(15, dateTime.getMinute());
  t.assertEquals(30, dateTime.getSecond());
  t.assertEquals(0, dateTime.getNano());
};

exports.testWith = function () {
  t.assertEquals("1996-02-08T11:15:30", dateTime.withYear(1996).toString());
  t.assertEquals("2023-12-08T11:15:30", dateTime.withMonth(12).toString());
  t.assertEquals("2023-02-01T11:15:30", dateTime.withDayOfMonth(1).toString());
  t.assertEquals("2023-12-31T11:15:30", dateTime.withDayOfYear(365).toString());
  t.assertEquals("2023-02-08T01:15:30", dateTime.withHour(1).toString());
  t.assertEquals("2023-02-08T11:01:30", dateTime.withMinute(1).toString());
  t.assertEquals("2023-02-08T11:15:01", dateTime.withSecond(1).toString());
  t.assertEquals("2023-02-08T11:15:30.000010", dateTime.withNano(10000).toString());
};

exports.testCompare = function () {
  const later = dateTime.plusSeconds(1);

  t.assertTrue(later.isAfter(dateTime));
  t.assertFalse(later.isBefore(dateTime));
  t.assertTrue(dateTime.isBefore(later));
  t.assertFalse(dateTime.isEqual(later));
  t.assertTrue(dateTime.isEqual(LocalDateTime.of(2023, 2, 8, 11, 15, 30)));
};

exports.testConversions = function () {
  t.assertEquals("2023-02-08", dateTime.toLocalDate().toString());
  t.assertEquals("11:15:30", dateTime.toLocalTime().toString());
  t.assertEquals(OffsetDateTime.parse("2023-02-08T11:15:30Z"), dateTime.atOffset(ZoneOffset.UTC));
  t.assertEquals(ZonedDateTime.parse("2023-02-08T11:15:30+01:00[Europe/Oslo]"), dateTime.atZone(oslo));
  t.assertEquals(1675854930, dateTime.toEpochSecond(ZoneOffset.UTC));
  t.assertEquals("2023-02-08T11:15:30Z", dateTime.toInstant(ZoneOffset.UTC).toString());
  t.assertEquals("2023-02-08T10:15:30Z", dateTime.toInstant(ZoneOffset.ofHours(1)).toString());
};

exports.testAtZoneInDaylightSavingGap = function () {
  // Clocks in Oslo went from 02:00 straight to 03:00 on this night, so 02:30 never happened
  const inGap = LocalDateTime.parse("2023-03-26T02:30:00");

  t.assertEquals("2023-03-26T03:30+02:00[Europe/Oslo]", inGap.atZone(oslo).toString());
};
