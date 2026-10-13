const t = require("/lib/xp/testing");
const time = require("/lib/time");
const Instant = time.Instant;
const ZoneId = time.ZoneId;
const ZoneOffset = time.ZoneOffset;

// 1675851330 seconds after the epoch
const instant = Instant.parse("2023-02-08T10:15:30Z");

exports.testCreate = function () {
  t.assertEquals(instant, Instant.ofEpochSecond(1675851330));
  t.assertEquals(instant, Instant.ofEpochMilli(1675851330000));
  t.assertEquals(instant, Instant.ofEpochSecond(1675851330, 0));
  t.assertEquals("2023-02-08T10:15:30.000000500Z", Instant.ofEpochSecond(1675851330, 500).toString());
  t.assertEquals("1970-01-01T00:00:00Z", Instant.ofEpochSecond(0).toString());
  // An offset is converted to UTC
  t.assertEquals(instant, Instant.parse("2023-02-08T11:15:30+01:00"));
};

exports.testNow = function () {
  t.assertTrue(Instant.now().isAfter(instant));
};

exports.testRejectsInvalidValues = function () {
  // An instant needs an offset to be placed on the time-line
  t.assertThrows(function () {
    Instant.parse("2023-02-08T10:15:30");
  });
  t.assertThrows(function () {
    Instant.parse("2023-02-08");
  });
};

exports.testGetters = function () {
  t.assertEquals(1675851330, instant.getEpochSecond());
  t.assertEquals(0, instant.getNano());
  t.assertEquals(1675851330000, instant.toEpochMilli());
  t.assertEquals(500000000, instant.plusMillis(500).getNano());
  t.assertEquals(1675851330500, instant.plusMillis(500).toEpochMilli());
};

exports.testPlus = function () {
  t.assertEquals("2023-02-08T10:16:00Z", instant.plusSeconds(30).toString());
  t.assertEquals("2023-02-08T10:15:30.500Z", instant.plusMillis(500).toString());
  t.assertEquals("2023-02-08T10:15:30.000000001Z", instant.plusNanos(1).toString());
  t.assertEquals("2023-02-09T10:15:30Z", instant.plusSeconds(86400).toString());
};

exports.testMinus = function () {
  t.assertEquals("2023-02-08T10:15:00Z", instant.minusSeconds(30).toString());
  t.assertEquals("2023-02-08T10:15:29.500Z", instant.minusMillis(500).toString());
  t.assertEquals("2023-02-08T10:15:29.999999999Z", instant.minusNanos(1).toString());
  t.assertEquals("2023-02-07T10:15:30Z", instant.minusSeconds(86400).toString());
};

exports.testCompare = function () {
  const later = instant.plusNanos(1);

  t.assertTrue(later.isAfter(instant));
  t.assertFalse(later.isBefore(instant));
  t.assertTrue(instant.isBefore(later));
  t.assertFalse(instant.isAfter(instant));
  t.assertTrue(instant.compareTo(later) < 0);
  t.assertTrue(later.compareTo(instant) > 0);
  t.assertEquals(0, instant.compareTo(Instant.ofEpochSecond(1675851330)));
  t.assertTrue(instant.equals(Instant.ofEpochSecond(1675851330)));
  t.assertFalse(instant.equals(later));
};

exports.testConversions = function () {
  t.assertEquals("2023-02-08T10:15:30Z", instant.toString());
  t.assertEquals("2023-02-08T10:15:30Z", instant.atOffset(ZoneOffset.UTC).toString());
  t.assertEquals("2023-02-08T11:15:30+01:00", instant.atOffset(ZoneOffset.ofHours(1)).toString());
  t.assertEquals("2023-02-08T11:15:30+01:00[Europe/Oslo]", instant.atZone(ZoneId.of("Europe/Oslo")).toString());
  t.assertEquals(
    "2023-02-08T05:15:30-05:00[America/New_York]",
    instant.atZone(ZoneId.of("America/New_York")).toString()
  );
};

exports.testRoundTripsThroughJavaScriptDate = function () {
  const date = new Date(Date.UTC(2023, 1, 8, 10, 15, 30));

  t.assertEquals(instant, Instant.ofEpochMilli(date.getTime()));
  t.assertEquals(instant, Instant.parse(date.toISOString()));
  t.assertEquals(date.getTime(), instant.toEpochMilli());
};
