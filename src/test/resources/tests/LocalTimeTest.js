const t = require("/lib/xp/testing");
const time = require("/lib/time");
const LocalTime = time.LocalTime;
const LocalDate = time.LocalDate;
const Instant = time.Instant;
const ZoneId = time.ZoneId;
const ZoneOffset = time.ZoneOffset;
const DateTimeFormatter = time.DateTimeFormatter;

const localTime = LocalTime.parse("10:15:30");
const date = LocalDate.parse("2023-02-08");
const oslo = ZoneId.of("Europe/Oslo");

exports.testConstants = function () {
  t.assertEquals("00:00", LocalTime.MIDNIGHT.toString());
  t.assertEquals("00:00", LocalTime.MIN.toString());
  t.assertEquals("12:00", LocalTime.NOON.toString());
  t.assertEquals("23:59:59.999999999", LocalTime.MAX.toString());
};

exports.testCreate = function () {
  t.assertEquals("10:15", LocalTime.of(10, 15).toString());
  t.assertEquals(localTime, LocalTime.of(10, 15, 30));
  t.assertEquals("10:15:30.000000001", LocalTime.of(10, 15, 30, 1).toString());
  t.assertEquals("01:01:01", LocalTime.ofSecondOfDay(3661).toString());
  t.assertEquals("00:00:01", LocalTime.ofNanoOfDay(1000000000).toString());
  t.assertEquals("10:15", LocalTime.parse("10.15", DateTimeFormatter.ofPattern("HH.mm")).toString());
  // Oslo is one hour ahead of UTC in winter
  t.assertEquals("11:15:30", LocalTime.ofInstant(Instant.parse("2023-02-08T10:15:30Z"), oslo).toString());
};

exports.testNow = function () {
  t.assertTrue(!!LocalTime.now());
  t.assertTrue(!!LocalTime.now(oslo));
};

exports.testRejectsInvalidTimes = function () {
  t.assertThrows(function () {
    LocalTime.parse("25:00");
  });
  t.assertThrows(function () {
    LocalTime.of(10, 60);
  });
};

exports.testFormat = function () {
  t.assertEquals("10:15:30", localTime.toString());
  t.assertEquals("10:15:30", localTime.format(DateTimeFormatter.ISO_LOCAL_TIME));
  t.assertEquals("10:15", localTime.format(DateTimeFormatter.ofPattern("HH:mm")));
  t.assertEquals("10.15.30", localTime.format(DateTimeFormatter.ofPattern("HH.mm.ss")));
};

exports.testPlus = function () {
  t.assertEquals("11:15:30", localTime.plusHours(1).toString());
  t.assertEquals("10:16:30", localTime.plusMinutes(1).toString());
  t.assertEquals("10:15:31", localTime.plusSeconds(1).toString());
  t.assertEquals("10:15:30.000010", localTime.plusNanos(10000).toString());
  // Carries into the next unit
  t.assertEquals("11:00:30", localTime.plusMinutes(45).toString());
  t.assertEquals("10:16", localTime.plusSeconds(30).toString());
};

exports.testMinus = function () {
  t.assertEquals("09:15:30", localTime.minusHours(1).toString());
  t.assertEquals("10:14:30", localTime.minusMinutes(1).toString());
  t.assertEquals("10:15:29", localTime.minusSeconds(1).toString());
  t.assertEquals("10:15:29.999990", localTime.minusNanos(10000).toString());
};

exports.testWrapsAroundMidnight = function () {
  t.assertEquals("00:30", LocalTime.parse("23:30").plusHours(1).toString());
  t.assertEquals("23:00", LocalTime.MIDNIGHT.minusHours(1).toString());
  t.assertEquals("23:59:59", LocalTime.MIDNIGHT.minusSeconds(1).toString());
  t.assertEquals(localTime, localTime.plusHours(24));
};

exports.testGetters = function () {
  t.assertEquals(10, localTime.getHour());
  t.assertEquals(15, localTime.getMinute());
  t.assertEquals(30, localTime.getSecond());
  t.assertEquals(0, localTime.getNano());
  t.assertEquals(500, localTime.withNano(500).getNano());
  t.assertEquals(36930, localTime.toSecondOfDay());
  t.assertEquals(36930000000000, localTime.toNanoOfDay());
};

exports.testWith = function () {
  t.assertEquals("01:15:30", localTime.withHour(1).toString());
  t.assertEquals("10:01:30", localTime.withMinute(1).toString());
  t.assertEquals("10:15:01", localTime.withSecond(1).toString());
  t.assertEquals("10:15:30.000010", localTime.withNano(10000).toString());
  t.assertThrows(function () {
    localTime.withHour(24);
  });
};

exports.testCompare = function () {
  const later = LocalTime.parse("10:15:31");

  t.assertTrue(later.isAfter(localTime));
  t.assertFalse(later.isBefore(localTime));
  t.assertTrue(localTime.isBefore(later));
  t.assertFalse(localTime.isAfter(localTime));
  t.assertTrue(localTime.compareTo(later) < 0);
  t.assertTrue(later.compareTo(localTime) > 0);
  t.assertEquals(0, localTime.compareTo(LocalTime.of(10, 15, 30)));
};

exports.testConversions = function () {
  t.assertEquals("2023-02-08T10:15:30", localTime.atDate(date).toString());
  t.assertEquals("10:15:30Z", localTime.atOffset(ZoneOffset.UTC).toString());
  t.assertEquals("10:15:30+01:00", localTime.atOffset(ZoneOffset.ofHours(1)).toString());
  t.assertEquals(1675851330, localTime.toEpochSecond(date, ZoneOffset.UTC));
  t.assertEquals(1675851330 - 3600, localTime.toEpochSecond(date, ZoneOffset.ofHours(1)));
};
