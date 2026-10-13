const t = require("/lib/xp/testing");
const time = require("/lib/time");
const OffsetTime = time.OffsetTime;
const LocalTime = time.LocalTime;
const LocalDate = time.LocalDate;
const Instant = time.Instant;
const ZoneId = time.ZoneId;
const ZoneOffset = time.ZoneOffset;
const DateTimeFormatter = time.DateTimeFormatter;

// The same instant as 09:15:30 UTC
const offsetTime = OffsetTime.parse("10:15:30+01:00");
const plusOne = ZoneOffset.ofHours(1);
const plusThree = ZoneOffset.ofHours(3);
const date = LocalDate.parse("2023-02-08");

exports.testCreate = function () {
  t.assertEquals(offsetTime, OffsetTime.of(10, 15, 30, 0, plusOne));
  t.assertEquals(offsetTime, OffsetTime.of(LocalTime.parse("10:15:30"), plusOne));
  t.assertEquals(offsetTime, OffsetTime.ofInstant(Instant.parse("2023-02-08T09:15:30Z"), ZoneId.of("Europe/Oslo")));
  t.assertEquals(offsetTime, OffsetTime.parse("10:15:30+01:00", DateTimeFormatter.ISO_OFFSET_TIME));
};

exports.testNow = function () {
  t.assertTrue(!!OffsetTime.now());
  t.assertEquals(plusThree, OffsetTime.now(plusThree).getOffset());
};

exports.testConstants = function () {
  // The earliest and latest times on the time-line, so the offsets are the opposite extremes
  t.assertEquals("00:00+18:00", OffsetTime.MIN.toString());
  t.assertEquals("23:59:59.999999999-18:00", OffsetTime.MAX.toString());
};

exports.testRejectsInvalidValues = function () {
  // An offset is required
  t.assertThrows(function () {
    OffsetTime.parse("10:15:30");
  });
  t.assertThrows(function () {
    OffsetTime.parse("25:00+01:00");
  });
};

exports.testFormat = function () {
  t.assertEquals("10:15:30+01:00", offsetTime.toString());
  t.assertEquals("10:15:30+01:00", offsetTime.format(DateTimeFormatter.ISO_OFFSET_TIME));
  t.assertEquals("10:15", offsetTime.format(DateTimeFormatter.ofPattern("HH:mm")));
};

exports.testPlus = function () {
  t.assertEquals("11:15:30+01:00", offsetTime.plusHours(1).toString());
  t.assertEquals("10:16:30+01:00", offsetTime.plusMinutes(1).toString());
  t.assertEquals("10:15:31+01:00", offsetTime.plusSeconds(1).toString());
  t.assertEquals("10:15:30.000010+01:00", offsetTime.plusNanos(10000).toString());
  // Wraps around midnight
  t.assertEquals("00:15:30+01:00", offsetTime.plusHours(14).toString());
};

exports.testMinus = function () {
  t.assertEquals("09:15:30+01:00", offsetTime.minusHours(1).toString());
  t.assertEquals("10:14:30+01:00", offsetTime.minusMinutes(1).toString());
  t.assertEquals("10:15:29+01:00", offsetTime.minusSeconds(1).toString());
  t.assertEquals("10:15:29.999990+01:00", offsetTime.minusNanos(10000).toString());
  // Wraps around midnight
  t.assertEquals("23:15:30+01:00", offsetTime.minusHours(11).toString());
};

exports.testGetters = function () {
  t.assertEquals(10, offsetTime.getHour());
  t.assertEquals(15, offsetTime.getMinute());
  t.assertEquals(30, offsetTime.getSecond());
  t.assertEquals(0, offsetTime.getNano());
  t.assertEquals(plusOne, offsetTime.getOffset());
};

exports.testWith = function () {
  t.assertEquals("01:15:30+01:00", offsetTime.withHour(1).toString());
  t.assertEquals("10:01:30+01:00", offsetTime.withMinute(1).toString());
  t.assertEquals("10:15:01+01:00", offsetTime.withSecond(1).toString());
  t.assertEquals("10:15:30.000010+01:00", offsetTime.withNano(10000).toString());
};

exports.testWithOffset = function () {
  // Same instant: the clock time moves with the offset
  t.assertEquals("12:15:30+03:00", offsetTime.withOffsetSameInstant(plusThree).toString());
  t.assertTrue(offsetTime.isEqual(offsetTime.withOffsetSameInstant(plusThree)));

  // Same local time: the clock time stays, so the instant moves
  t.assertEquals("10:15:30+03:00", offsetTime.withOffsetSameLocal(plusThree).toString());
  t.assertFalse(offsetTime.isEqual(offsetTime.withOffsetSameLocal(plusThree)));
};

exports.testCompare = function () {
  const later = offsetTime.plusSeconds(1);

  t.assertTrue(later.isAfter(offsetTime));
  t.assertFalse(later.isBefore(offsetTime));
  t.assertTrue(offsetTime.isBefore(later));
  t.assertFalse(offsetTime.isEqual(later));
  t.assertTrue(offsetTime.compareTo(later) < 0);
  t.assertEquals(0, offsetTime.compareTo(OffsetTime.parse("10:15:30+01:00")));
};

exports.testCompareAcrossOffsets = function () {
  const sameInstantInUtc = OffsetTime.parse("09:15:30Z");

  // isEqual() compares the instant, equals() also compares the offset
  t.assertTrue(offsetTime.isEqual(sameInstantInUtc));
  t.assertNotEquals(offsetTime, sameInstantInUtc);

  // The same clock time further east is an earlier instant
  const furtherEast = OffsetTime.parse("10:15:30+04:00");
  t.assertTrue(offsetTime.isAfter(furtherEast));
  t.assertFalse(offsetTime.isBefore(furtherEast));
  t.assertFalse(offsetTime.isEqual(furtherEast));
};

exports.testConversions = function () {
  t.assertEquals("2023-02-08T10:15:30+01:00", offsetTime.atDate(date).toString());
  t.assertEquals(1675847730, offsetTime.toEpochSecond(date));
  t.assertEquals("10:15:30", offsetTime.toLocalTime().toString());
};
