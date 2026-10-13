const t = require("/lib/xp/testing");
const time = require("/lib/time");
const ZoneId = time.ZoneId;
const ZoneOffset = time.ZoneOffset;

const oslo = ZoneId.of("Europe/Oslo");

exports.testCreate = function () {
  t.assertEquals("Europe/Oslo", oslo.getId());
  t.assertEquals("Europe/Oslo", oslo.toString());
  t.assertEquals("UTC", ZoneId.of("UTC").getId());
  t.assertEquals("GMT+01:00", ZoneId.of("GMT+1").getId());
  // "Z" and plain offsets give a ZoneOffset
  t.assertEquals(ZoneOffset.UTC, ZoneId.of("Z"));
  t.assertEquals(ZoneOffset.ofHours(1), ZoneId.of("+01:00"));
};

exports.testRejectsInvalidZones = function () {
  t.assertThrows(function () {
    ZoneId.of("Europe/Nowhere");
  });
  t.assertThrows(function () {
    ZoneId.of("not a zone");
  });
};

exports.testOfOffset = function () {
  t.assertEquals("UTC+01:00", ZoneId.ofOffset("UTC", ZoneOffset.ofHours(1)).getId());
  t.assertEquals("GMT-05:00", ZoneId.ofOffset("GMT", ZoneOffset.ofHours(-5)).getId());
  t.assertEquals(ZoneOffset.ofHours(1), ZoneId.ofOffset("", ZoneOffset.ofHours(1)));
};

exports.testNormalized = function () {
  // A zone with a fixed offset normalizes to that offset
  t.assertEquals(ZoneOffset.ofHours(1), ZoneId.of("UTC+01:00").normalized());
  t.assertEquals(ZoneOffset.UTC, ZoneId.of("UTC").normalized());
  // A region with daylight saving has no single offset to normalize to
  t.assertEquals(oslo, oslo.normalized());
};

exports.testSystemDefault = function () {
  // build.gradle pins the system time zone of the test JVM to Europe/Oslo
  t.assertEquals(oslo, ZoneId.systemDefault());
};

exports.testGetAvailableZoneIds = function () {
  const zoneIds = ZoneId.getAvailableZoneIds();

  t.assertTrue(zoneIds.contains("Europe/Oslo"));
  t.assertTrue(zoneIds.contains("America/New_York"));
  t.assertFalse(zoneIds.contains("Europe/Nowhere"));
  t.assertFalse(zoneIds.isEmpty());
  t.assertTrue(zoneIds.size() > 100);
};

exports.testShortIds = function () {
  t.assertEquals("America/Los_Angeles", ZoneId.SHORT_IDS.get("PST"));
  t.assertEquals("America/Los_Angeles", ZoneId.of("PST", ZoneId.SHORT_IDS).getId());
  // Without the alias map the short id is not known
  t.assertThrows(function () {
    ZoneId.of("PST");
  });
};
