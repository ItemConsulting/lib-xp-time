const testLib = require("/lib/xp/testing");
const localTimeLib = require("/lib/time/local-time");
const LocalTime = localTimeLib.LocalTime;
const localDateLib = require("/lib/time/local-date");
const LocalDate = localDateLib.LocalDate;
const zoneOffsetLib = require("/lib/time/zone-offset");
const ZoneOffset = zoneOffsetLib.ZoneOffset;
const formatLib = require("/lib/time/format/date-time-formatter");
const DateTimeFormatter = formatLib.DateTimeFormatter;

const LOCAL_TIME = "00:00:00";
const ltParsed = LocalTime.parse(LOCAL_TIME);

const LOCAL_DATE = "2023-02-08";
const ldParsed = LocalDate.parse(LOCAL_DATE);

exports.testGivenLocalTime_testFormatLocalTime = function () {
  const formatted = ltParsed.format(DateTimeFormatter.ISO_LOCAL_TIME);
  testLib.assertEquals(formatted, "00:00:00");
}

exports.testGivenLocalTime_testPlusTime = function() {
  const plusHours = ltParsed.plusHours(1);
  const plusMinutes = ltParsed.plusMinutes(1);
  const plusSeconds = ltParsed.plusSeconds(1);
  const plusNanos = ltParsed.plusNanos(10000);
  testLib.assertEquals(plusHours.toString(), "01:00");
  testLib.assertEquals(plusMinutes.toString(), "00:01");
  testLib.assertEquals(plusSeconds.toString(), "00:00:01");
  testLib.assertEquals(plusNanos.toString(), "00:00:00.000010");
}

exports.testGivenLocalTime_testMinusTime = function() {
  const minusHours = ltParsed.minusHours(1);
  const minusMinutes = ltParsed.minusMinutes(1);
  const minusSeconds = ltParsed.minusSeconds(1);
  const minusNanos = ltParsed.minusNanos(10000);
  testLib.assertEquals(minusHours.toString(), "23:00");
  testLib.assertEquals(minusMinutes.toString(), "23:59");
  testLib.assertEquals(minusSeconds.toString(), "23:59:59");
  testLib.assertEquals(minusNanos.toString(), "23:59:59.999990");
}

exports.testGivenLocalTime_testTime = function() {
  const atDate = ltParsed.atDate(ldParsed);
  const atOffset = ltParsed.atOffset(ZoneOffset.UTC);
  const hour = ltParsed.getHour();
  const isAfter = ltParsed.isBefore(LocalTime.parse("01:00"));
  const withNano = ltParsed.withNano(10000);
  const toEpochSecond = ltParsed.toEpochSecond(ldParsed, ZoneOffset.UTC);
  testLib.assertEquals(atDate.toString(), "2023-02-08T00:00");
  testLib.assertEquals(atOffset.toString(), "00:00Z");
  testLib.assertEquals(hour, 0);
  testLib.assertTrue(isAfter);
  testLib.assertEquals(withNano.toString(), "00:00:00.000010");
  testLib.assertEquals(toEpochSecond, 1675814400);
}
