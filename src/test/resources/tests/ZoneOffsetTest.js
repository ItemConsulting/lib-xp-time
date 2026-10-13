const t = require("/lib/xp/testing");
const time = require("/lib/time");
const ZoneOffset = time.ZoneOffset;

const plusOne = ZoneOffset.of("+01:00");

exports.testConstants = function () {
  t.assertEquals("Z", ZoneOffset.UTC.getId());
  t.assertEquals(0, ZoneOffset.UTC.getTotalSeconds());
  t.assertEquals("+18:00", ZoneOffset.MAX.getId());
  t.assertEquals("-18:00", ZoneOffset.MIN.getId());
};

exports.testCreate = function () {
  t.assertEquals(plusOne, ZoneOffset.ofHours(1));
  t.assertEquals(plusOne, ZoneOffset.ofTotalSeconds(3600));
  t.assertEquals(plusOne, ZoneOffset.ofHoursMinutesSeconds(1, 0, 0));
  t.assertEquals(plusOne, ZoneOffset.of("+01"));
  t.assertEquals(ZoneOffset.UTC, ZoneOffset.of("Z"));
  t.assertEquals(ZoneOffset.UTC, ZoneOffset.ofHours(0));
  t.assertEquals(ZoneOffset.of("+02:46:40"), ZoneOffset.ofTotalSeconds(10000));
  t.assertEquals(ZoneOffset.of("+02:46:40"), ZoneOffset.ofHoursMinutesSeconds(2, 46, 40));
};

exports.testNegativeOffsets = function () {
  const minusFive = ZoneOffset.ofHours(-5);

  t.assertEquals("-05:00", minusFive.getId());
  t.assertEquals(-18000, minusFive.getTotalSeconds());
  t.assertEquals(minusFive, ZoneOffset.of("-05:00"));
  t.assertEquals("-05:30", ZoneOffset.ofHoursMinutesSeconds(-5, -30, 0).getId());
};

exports.testRejectsInvalidOffsets = function () {
  t.assertThrows(function () {
    ZoneOffset.of("+19:00");
  });
  t.assertThrows(function () {
    ZoneOffset.ofHours(19);
  });
  t.assertThrows(function () {
    ZoneOffset.of("01:00");
  });
  // Hours and minutes must have the same sign
  t.assertThrows(function () {
    ZoneOffset.ofHoursMinutesSeconds(5, -30, 0);
  });
};

exports.testGetters = function () {
  t.assertEquals("+01:00", plusOne.getId());
  t.assertEquals("+01:00", plusOne.toString());
  t.assertEquals(3600, plusOne.getTotalSeconds());
};

exports.testCompareTo = function () {
  const plusTwo = ZoneOffset.ofHours(2);

  // Offsets sort in descending order, so the one further east comes first
  t.assertTrue(plusTwo.compareTo(plusOne) < 0);
  t.assertTrue(plusOne.compareTo(plusTwo) > 0);
  t.assertEquals(0, plusOne.compareTo(ZoneOffset.ofHours(1)));
  t.assertEquals(-6400, ZoneOffset.ofTotalSeconds(10000).compareTo(plusOne));
};
