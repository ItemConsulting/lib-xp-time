const testLib = require("/lib/xp/testing");
const zonedDateTimeLib = require("/lib/time/zoned-date-time");
const ZonedDateTime = zonedDateTimeLib.ZonedDateTime;
const zoneIdLib = require("/lib/time/zone-id");
const ZoneId = zoneIdLib.ZoneId;
const instantLib = require("/lib/time/instant");
const Instant = instantLib.Instant;
const monthLib = require("/lib/time/month");
const Month = monthLib.Month;

const ZONED_DATE_TIME = "2023-02-08T00:00+01:00[Europe/Oslo]";
const zonedDateTime = ZonedDateTime.parse(ZONED_DATE_TIME);

const ZONE_ID = "GMT+01:00";
const zoneId = ZoneId.of(ZONE_ID);

exports.testGivenZonedDateTime_testFormatZonedDateTime = function () {
  const zonedDateTime = ZonedDateTime.ofInstant(Instant.parse("2023-02-08T10:15:30.00Z"), zoneId);
  testLib.assertEquals(zonedDateTime.toString(), "2023-02-08T11:15:30+01:00" + "[" + ZONE_ID + "]");
}

exports.testGivenZonedDateTime_testPlusTime = function() {
  const plusHours = zonedDateTime.plusHours(1);
  const plusMinutes = zonedDateTime.plusMinutes(1);
  const plusSeconds = zonedDateTime.plusSeconds(1);
  const plusNanos = zonedDateTime.plusNanos(10000);
  const plusYears = zonedDateTime.plusYears(1);
  const plusMonths = zonedDateTime.plusMonths(1);
  const plusWeeks = zonedDateTime.plusWeeks(1);
  const plusDays = zonedDateTime.plusDays(1);
  testLib.assertEquals(plusHours.toString(), "2023-02-08T01:00+01:00[Europe/Oslo]");
  testLib.assertEquals(plusMinutes.toString(), "2023-02-08T00:01+01:00[Europe/Oslo]");
  testLib.assertEquals(plusSeconds.toString(), "2023-02-08T00:00:01+01:00[Europe/Oslo]");
  testLib.assertEquals(plusNanos.toString(), "2023-02-08T00:00:00.000010+01:00[Europe/Oslo]");
  testLib.assertEquals(plusYears.toString(), "2024-02-08T00:00+01:00[Europe/Oslo]");
  testLib.assertEquals(plusMonths.toString(), "2023-03-08T00:00+01:00[Europe/Oslo]");
  testLib.assertEquals(plusWeeks.toString(), "2023-02-15T00:00+01:00[Europe/Oslo]");
  testLib.assertEquals(plusDays.toString(), "2023-02-09T00:00+01:00[Europe/Oslo]");
}

exports.testGivenZonedDateTime_testMinusTime = function() {
  const minusHours = zonedDateTime.minusHours(1);
  const minusMinutes = zonedDateTime.minusMinutes(1);
  const minusSeconds = zonedDateTime.minusSeconds(1);
  const minusNanos = zonedDateTime.minusNanos(10000);
  const minusYears = zonedDateTime.minusYears(1);
  const minusMonths = zonedDateTime.minusMonths(1);
  const minusWeeks = zonedDateTime.minusWeeks(1);
  const minusDays = zonedDateTime.minusDays(1);
  testLib.assertEquals(minusHours.toString(), "2023-02-07T23:00+01:00[Europe/Oslo]");
  testLib.assertEquals(minusMinutes.toString(), "2023-02-07T23:59+01:00[Europe/Oslo]");
  testLib.assertEquals(minusSeconds.toString(), "2023-02-07T23:59:59+01:00[Europe/Oslo]");
  testLib.assertEquals(minusNanos.toString(), "2023-02-07T23:59:59.999990+01:00[Europe/Oslo]");
  testLib.assertEquals(minusYears.toString(), "2022-02-08T00:00+01:00[Europe/Oslo]");
  testLib.assertEquals(minusMonths.toString(), "2023-01-08T00:00+01:00[Europe/Oslo]");
  testLib.assertEquals(minusWeeks.toString(), "2023-02-01T00:00+01:00[Europe/Oslo]");
  testLib.assertEquals(minusDays.toString(), "2023-02-07T00:00+01:00[Europe/Oslo]");
}

exports.testGivenZonedDateTime_testWithTime = function() {
  const withDayOfYear = zonedDateTime.withDayOfYear(1);
  const withDayOfMonth = zonedDateTime.withDayOfMonth(1);
  const withHour = zonedDateTime.withHour(1);
  const withMinute = zonedDateTime.withMinute(1);
  const withSecond = zonedDateTime.withSecond(1);
  const withNano = zonedDateTime.withNano(10000);
  const withYear = zonedDateTime.withYear(2000);
  const withMonth = zonedDateTime.withMonth(1);
  const withEarlierOffsetAtOverlap = zonedDateTime.withEarlierOffsetAtOverlap();
  const withFixedOffsetZone = zonedDateTime.withFixedOffsetZone();
  const withLaterOffsetAtOverlap = zonedDateTime.withLaterOffsetAtOverlap();
  const withZoneSameInstant = zonedDateTime.withZoneSameInstant(zoneId);
  const withZoneSameLocal = zonedDateTime.withZoneSameLocal(zoneId);
  testLib.assertEquals(withDayOfYear.toString(), "2023-01-01T00:00+01:00[Europe/Oslo]");
  testLib.assertEquals(withDayOfMonth.toString(), "2023-02-01T00:00+01:00[Europe/Oslo]")
  testLib.assertEquals(withHour.toString(), "2023-02-08T01:00+01:00[Europe/Oslo]")
  testLib.assertEquals(withMinute.toString(), "2023-02-08T00:01+01:00[Europe/Oslo]")
  testLib.assertEquals(withSecond.toString(), "2023-02-08T00:00:01+01:00[Europe/Oslo]")
  testLib.assertEquals(withNano.toString(), "2023-02-08T00:00:00.000010+01:00[Europe/Oslo]")
  testLib.assertEquals(withYear.toString(), "2000-02-08T00:00+01:00[Europe/Oslo]")
  testLib.assertEquals(withMonth.toString(), "2023-01-08T00:00+01:00[Europe/Oslo]")
  testLib.assertEquals(withEarlierOffsetAtOverlap.toString(), "2023-02-08T00:00+01:00[Europe/Oslo]")
  testLib.assertEquals(withFixedOffsetZone.toString(), "2023-02-08T00:00+01:00")
  testLib.assertEquals(withLaterOffsetAtOverlap.toString(), "2023-02-08T00:00+01:00[Europe/Oslo]")
  testLib.assertEquals(withZoneSameInstant.toString(), "2023-02-08T00:00+01:00[GMT+01:00]")
  testLib.assertEquals(withZoneSameLocal.toString(), "2023-02-08T00:00+01:00[GMT+01:00]")
}

exports.testGivenZonedDateTime_testGetTime = function() {
  const hour = zonedDateTime.getHour();
  const minute = zonedDateTime.getMinute();
  const second = zonedDateTime.getSecond();
  const nano = zonedDateTime.getNano();
  const year = zonedDateTime.getYear();
  const month = zonedDateTime.getMonth();
  const monthValue = zonedDateTime.getMonthValue();
  const dayOfMonth = zonedDateTime.getDayOfMonth();
  const dayOfYear = zonedDateTime.getDayOfYear();
  const dayOfWeek = zonedDateTime.getDayOfWeek();
  const offset = zonedDateTime.getOffset();
  const zone = zonedDateTime.getZone();
  testLib.assertEquals(hour, 0);
  testLib.assertEquals(minute, 0);
  testLib.assertEquals(second, 0);
  testLib.assertEquals(nano, 0);
  testLib.assertEquals(year, 2023);
  testLib.assertEquals(month, Month.of(2));
  testLib.assertEquals(monthValue, 2);
  testLib.assertEquals(dayOfMonth, 8);
  testLib.assertEquals(dayOfYear, 39);
  testLib.assertEquals(dayOfWeek.getValue(), 3);
  testLib.assertEquals(offset.toString(), "+01:00");
  testLib.assertEquals(zone.toString(), "Europe/Oslo");
}

exports.testGivenZonedDateTime_testTimeConversion = function() {
  const toLocalDate = zonedDateTime.toLocalDate();
  const toLocalDateTime = zonedDateTime.toLocalDateTime();
  const toLocalTime = zonedDateTime.toLocalTime();
  const toOffsetDateTime = zonedDateTime.toOffsetDateTime();
  testLib.assertEquals(toLocalDate.toString(), "2023-02-08");
  testLib.assertEquals(toLocalDateTime.toString(), "2023-02-08T00:00");
  testLib.assertEquals(toLocalTime.toString(), "00:00");
  testLib.assertEquals(toOffsetDateTime.toString(), "2023-02-08T00:00+01:00");
}
