const testLib = require("/lib/xp/testing");
const offsetTimeLib = require("/lib/time/offset-time");
const OffsetTime = offsetTimeLib.OffsetTime;
const instantLib = require("/lib/time/instant");
const Instant = instantLib.Instant;
const zoneIdLib = require("/lib/time/zone-id");
const ZoneId = zoneIdLib.ZoneId;
const zoneOffsetLib = require("/lib/time/zone-offset");
const ZoneOffset = zoneOffsetLib.ZoneOffset;
const localDateLib = require("/lib/time/local-date");
const LocalDate = localDateLib.LocalDate;

const OFFSET_TIME = "00:00+01:00";
const otParsed = OffsetTime.parse(OFFSET_TIME);

const ZONE_OFFSET = "+01:00";
const zoneOffset = ZoneOffset.of(ZONE_OFFSET);

const LOCAL_DATE = "2023-02-08";
const localDate = LocalDate.parse(LOCAL_DATE);

exports.testGivenOffsetInstant_testFormatOffsetTime = function () {
  const offsetTime = OffsetTime.ofInstant(Instant.parse("2023-02-08T00:00:30.00Z"), ZoneId.of("GMT+1"));
  testLib.assertEquals(offsetTime.toString(), "01:00:30+01:00");
}

exports.testGivenOffsetTime_testPlusTime = function() {
  const plusHours = otParsed.plusHours(1);
  const plusMinutes = otParsed.plusMinutes(1);
  const plusSeconds = otParsed.plusSeconds(1);
  const plusNanos = otParsed.plusNanos(10000);
  testLib.assertEquals(plusHours.toString(), "01:00+01:00");
  testLib.assertEquals(plusMinutes.toString(), "00:01+01:00");
  testLib.assertEquals(plusSeconds.toString(), "00:00:01+01:00");
  testLib.assertEquals(plusNanos.toString(), "00:00:00.000010+01:00");
}

exports.testGivenOffsetTime_testMinusTime = function() {
  const minusHours = otParsed.minusHours(1);
  const minusMinutes = otParsed.minusMinutes(1);
  const minusSeconds = otParsed.minusSeconds(1);
  const minusNanos = otParsed.minusNanos(10000);
  testLib.assertEquals(minusHours.toString(), "23:00+01:00");
  testLib.assertEquals(minusMinutes.toString(), "23:59+01:00");
  testLib.assertEquals(minusSeconds.toString(), "23:59:59+01:00");
  testLib.assertEquals(minusNanos.toString(), "23:59:59.999990+01:00");
}

exports.testGivenOffsetTime_testGetTime = function() {
  const offset = otParsed.getOffset();
  const hour = otParsed.getHour();
  const minute = otParsed.getMinute();
  const second = otParsed.getSecond();
  const nano = otParsed.getNano();
  testLib.assertEquals(offset.toString(), "+01:00");
  testLib.assertEquals(hour, 0);
  testLib.assertEquals(minute, 0);
  testLib.assertEquals(second, 0);
  testLib.assertEquals(nano, 0);
}

exports.testGivenOffsetTime_testWithTime = function() {
  const withOffsetSameLocal = otParsed.withOffsetSameLocal(zoneOffset);
  const withOffsetSameInstant = otParsed.withOffsetSameInstant(zoneOffset);
  const withHour = otParsed.withHour(1);
  const withMinute = otParsed.withMinute(1);
  const withSecond = otParsed.withSecond(1);
  const withNano = otParsed.withNano(10000);
  testLib.assertEquals(withOffsetSameLocal.toString(), "00:00+01:00");
  testLib.assertEquals(withOffsetSameInstant.toString(), "00:00+01:00");
  testLib.assertEquals(withHour.toString(), "01:00+01:00");
  testLib.assertEquals(withMinute.toString(), "00:01+01:00");
  testLib.assertEquals(withSecond.toString(), "00:00:01+01:00");
  testLib.assertEquals(withNano.toString(), "00:00:00.000010+01:00");
}

exports.testGivenOffsetTime_testTimeConversion = function() {
  const atDate = otParsed.atDate(localDate);
  const isAfter = otParsed.isAfter(OffsetTime.parse("00:00+04:00"));
  const isBefore = otParsed.isBefore(OffsetTime.parse("00:00+04:00"));
  const isEqual = otParsed.isEqual(OffsetTime.parse("23:00+02:00"));
  const toEpochSecond = otParsed.toEpochSecond(localDate);
  const toLocalTime = otParsed.toLocalTime();
  testLib.assertEquals(atDate.toString(), "2023-02-08T00:00+01:00");
  testLib.assertTrue(isAfter);
  testLib.assertFalse(isBefore);
  testLib.assertFalse(isEqual);
  testLib.assertEquals(toEpochSecond, 1.6758108E9);
  testLib.assertEquals(toLocalTime.toString(), "00:00");
}
