const testLib = require("/lib/xp/testing");
const offsetDateTimeLib = require("/lib/time/offset-date-time");
const OffsetDateTime = offsetDateTimeLib.OffsetDateTime;
const formatLib = require("/lib/time/format/date-time-formatter");
const DateTimeFormatter = formatLib.DateTimeFormatter;
const zoneIdLib = require("/lib/time/zone-id")
const ZoneId = zoneIdLib.ZoneId;
const zoneOffsetLib = require("/lib/time/zone-offset")
const ZoneOffset = zoneOffsetLib.ZoneOffset;
const monthLib = require("/lib/time");
const Month = monthLib.Month;

const OFFSET_DATE_TIME = "2023-02-08T00:00:00+01:00";
const odtParsed = OffsetDateTime.parse(OFFSET_DATE_TIME);

const ZONE_ID = "Europe/Oslo";
const zoneId = ZoneId.of(ZONE_ID);

const ZONE_OFFSET = "+01:00";
const zoneOffset = ZoneOffset.of(ZONE_OFFSET);

exports.testGivenOffsetDateTime_testFormatOffsetDateTime = function () {
  const offsetDateTime = OffsetDateTime.MIN;
  const formatted = offsetDateTime.format(DateTimeFormatter.ISO_OFFSET_TIME);
  testLib.assertEquals(formatted, "00:00:00+18:00");
}

exports.testGivenOffsetDateTime_testPlusTime = function() {
  const plusHours = odtParsed.plusHours(1);
  const plusMinutes = odtParsed.plusMinutes(1);
  const plusSeconds = odtParsed.plusSeconds(1);
  const plusYears = odtParsed.plusYears(1);
  const plusMonths = odtParsed.plusMonths(1);
  const plusWeeks = odtParsed.plusWeeks(1);
  const plusDays = odtParsed.plusDays(1);
  const plusNanos = odtParsed.plusNanos(10000);
  testLib.assertEquals(plusHours.toString(), "2023-02-08T01:00+01:00");
  testLib.assertEquals(plusMinutes.toString(), "2023-02-08T00:01+01:00");
  testLib.assertEquals(plusSeconds.toString(), "2023-02-08T00:00:01+01:00");
  testLib.assertEquals(plusNanos.toString(), "2023-02-08T00:00:00.000010+01:00");
  testLib.assertEquals(plusYears.toString(), "2024-02-08T00:00+01:00");
  testLib.assertEquals(plusMonths.toString(), "2023-03-08T00:00+01:00");
  testLib.assertEquals(plusWeeks.toString(), "2023-02-15T00:00+01:00");
  testLib.assertEquals(plusDays.toString(), "2023-02-09T00:00+01:00");
}

exports.testGivenOffsetDateTime_testMinusTime = function() {
  const minusHours = odtParsed.minusHours(1);
  const minusMinutes = odtParsed.minusMinutes(1);
  const minusSeconds = odtParsed.minusSeconds(1);
  const minusYears = odtParsed.minusYears(1);
  const minusMonths = odtParsed.minusMonths(1);
  const minusWeeks = odtParsed.minusWeeks(1);
  const minusDays = odtParsed.minusDays(1);
  const minusNanos = odtParsed.minusNanos(10000);
  testLib.assertEquals(minusHours.toString(), "2023-02-07T23:00+01:00");
  testLib.assertEquals(minusMinutes.toString(), "2023-02-07T23:59+01:00");
  testLib.assertEquals(minusSeconds.toString(), "2023-02-07T23:59:59+01:00");
  testLib.assertEquals(minusNanos.toString(), "2023-02-07T23:59:59.999990+01:00");
  testLib.assertEquals(minusYears.toString(), "2022-02-08T00:00+01:00");
  testLib.assertEquals(minusMonths.toString(), "2023-01-08T00:00+01:00");
  testLib.assertEquals(minusWeeks.toString(), "2023-02-01T00:00+01:00");
  testLib.assertEquals(minusDays.toString(), "2023-02-07T00:00+01:00");
}

exports.testGivenOffsetDateTime_testTime = function() {
  const atZoneSameInstant = odtParsed.atZoneSameInstant(zoneId)
  const atZoneSimilarLocal = odtParsed.atZoneSimilarLocal(zoneId);
  const isAfter = odtParsed.isAfter(OffsetDateTime.parse("2000-02-08T00:00+01:00"));
  const isBefore = odtParsed.isBefore(OffsetDateTime.parse("2069-02-08T00:00+01:00"));
  const isEqual = odtParsed.isEqual(OffsetDateTime.parse(OFFSET_DATE_TIME));
  testLib.assertEquals(atZoneSameInstant.toString(), "2023-02-08T00:00+01:00" + "[Europe/Oslo]");
  testLib.assertEquals(atZoneSimilarLocal.toString(), "2023-02-08T00:00+01:00" + "[Europe/Oslo]")
  testLib.assertTrue(isAfter);
  testLib.assertTrue(isBefore);
  testLib.assertTrue(isEqual);
}

exports.testGivenOffsetDateTime_testWithTime = function() {
  const withDayOfMonth = odtParsed.withDayOfMonth(1);
  const withHour = odtParsed.withHour(1);
  const withMonth = odtParsed.withMonth(1);
  const withNano = odtParsed.withNano(1000);
  const withYear = odtParsed.withYear(2000);
  const withDayOfYear = odtParsed.withDayOfYear(1);
  const withMinute = odtParsed.withMinute(1);
  const withSecond = odtParsed.withSecond(1);
  const withOffsetSameInstant = odtParsed.withOffsetSameInstant(zoneOffset);
  const withOffsetSameLocal = odtParsed.withOffsetSameLocal(zoneOffset);
  testLib.assertEquals(withDayOfMonth.toString(), "2023-02-01T00:00+01:00");
  testLib.assertEquals(withHour.toString(), "2023-02-08T01:00+01:00");
  testLib.assertEquals(withMonth.toString(), "2023-01-08T00:00+01:00");
  testLib.assertEquals(withNano.toString(), "2023-02-08T00:00:00.000001+01:00");
  testLib.assertEquals(withYear.toString(), "2000-02-08T00:00+01:00");
  testLib.assertEquals(withDayOfYear.toString(), "2023-01-01T00:00+01:00");
  testLib.assertEquals(withMinute.toString(), "2023-02-08T00:01+01:00");
  testLib.assertEquals(withSecond.toString(), "2023-02-08T00:00:01+01:00");
  testLib.assertEquals(withOffsetSameLocal.toString(), "2023-02-08T00:00+01:00");
  testLib.assertEquals(withOffsetSameInstant.toString(), "2023-02-08T00:00+01:00");
}

exports.testGivenOffsetDateTime_testGetTime = function() {
  const dayOfMonth = odtParsed.getDayOfMonth();
  const offset = odtParsed.getOffset();
  const month = odtParsed.getMonth();
  const hour = odtParsed.getHour();
  const year = odtParsed.getYear();
  const dayOfWeek = odtParsed.getDayOfWeek();
  const dayOfYear = odtParsed.getDayOfYear();
  const minute = odtParsed.getMinute();
  const monthValue = odtParsed.getMonthValue();
  const second = odtParsed.getSecond();
  const nano = odtParsed.getNano();
  testLib.assertEquals(dayOfMonth, 8);
  testLib.assertEquals(offset.toString(), "+01:00");
  testLib.assertEquals(month, Month.of(2));
  testLib.assertEquals(hour, 0);
  testLib.assertEquals(year, 2023);
  testLib.assertEquals(dayOfWeek.getValue(), 3);
  testLib.assertEquals(dayOfYear, 39);
  testLib.assertEquals(minute, 0);
  testLib.assertEquals(monthValue, 2);
  testLib.assertEquals(second, 0);
  testLib.assertEquals(nano, 0);
}

exports.testGivenOffsetDateTime_testTimeConversion = function() {
  const toEpochSecond = odtParsed.toEpochSecond();
  const toInstant = odtParsed.toInstant();
  const toLocalDate = odtParsed.toLocalDate();
  const toLocalDateTime = odtParsed.toLocalDateTime();
  const toLocalTime = odtParsed.toLocalTime();
  const toOffsetTime = odtParsed.toOffsetTime();
  const toZonedDateTime = odtParsed.toZonedDateTime();
  testLib.assertEquals(toEpochSecond, 1.6758108E9);
  testLib.assertEquals(toInstant.toString(), "2023-02-07T23:00:00Z");
  testLib.assertEquals(toLocalDate.toString(), "2023-02-08");
  testLib.assertEquals(toLocalDateTime.toString(), "2023-02-08T00:00");
  testLib.assertEquals(toLocalTime.toString(), "00:00");
  testLib.assertEquals(toOffsetTime.toString(), "00:00+01:00");
  testLib.assertEquals(toZonedDateTime.toString(), "2023-02-08T00:00+01:00");
}
