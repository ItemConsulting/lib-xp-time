const testLib = require("/lib/xp/testing");
const localDateTimeLib = require("/lib/time/local-date-time");
const LocalDateTime = localDateTimeLib.LocalDateTime;
const formatLib = require("/lib/time/format/date-time-formatter");
const DateTimeFormatter = formatLib.DateTimeFormatter;
const monthLib = require("/lib/time/month");
const zoneOffsetLib = require("/lib/time/zone-offset");
const zoneIdLib = require("/lib/time/zone-id");
const offsetDateTimeLib = require("/lib/time/offset-date-time");
const zonedDateTimeLib = require("/lib/time/zoned-date-time");
const ZonedDateTime = zonedDateTimeLib.ZonedDateTime;
const OffsetDateTime = offsetDateTimeLib.OffsetDateTime;
const ZoneId = zoneIdLib.ZoneId;
const ZoneOffset = zoneOffsetLib.ZoneOffset;
const Month = monthLib.Month;

const EXAMPLE_LOCAL_DATE_TIME = "2023-02-08T11:15:30";
const ldtParsed = LocalDateTime.parse(EXAMPLE_LOCAL_DATE_TIME);

const ZONE_ID_OSLO_NORMALIZED = "Europe/Oslo";

exports.testGivenLocalDateTime_testFormatLocalDateTime = function () {
  const localDateTime = LocalDateTime.of(2023, Month.of(2), 8, 13, 22, 11, 11);
  const formatted = localDateTime.format(DateTimeFormatter.BASIC_ISO_DATE);
  testLib.assertEquals(formatted, "20230208");
}

exports.testGivenLocalDateTime_testPlusTime = function () {
  const ldtPlusHours = ldtParsed.plusHours(1);
  const ldtPlusSeconds = ldtParsed.plusSeconds(13);
  const ldtPlusMinutes = ldtParsed.plusMinutes(13);
  const ldtPlusNanos = ldtParsed.plusNanos(1);
  const ldtPlusYears = ldtParsed.plusYears(2);
  const ldtPlusMonths = ldtParsed.plusMonths(2);
  const ldtPlusWeeks = ldtParsed.plusWeeks(2);
  const ldtPlusDays = ldtParsed.plusDays(2);
  testLib.assertEquals(ldtPlusHours.toString(), "2023-02-08T12:15:30");
  testLib.assertEquals(ldtPlusSeconds.toString(), "2023-02-08T11:15:43");
  testLib.assertEquals(ldtPlusMinutes.toString(), "2023-02-08T11:28:30");
  testLib.assertEquals(ldtPlusNanos.toString(), "2023-02-08T11:15:30.000000001");
  testLib.assertEquals(ldtPlusYears.toString(), "2025-02-08T11:15:30");
  testLib.assertEquals(ldtPlusMonths.toString(), "2023-04-08T11:15:30");
  testLib.assertEquals(ldtPlusWeeks.toString(), "2023-02-22T11:15:30");
  testLib.assertEquals(ldtPlusDays.toString(), "2023-02-10T11:15:30");
}

exports.testGivenLocalDateTime_testMinusTime = function () {
  const ldtMinusHours = ldtParsed.minusHours(1);
  const ldtMinusSeconds = ldtParsed.minusSeconds(13);
  const ldtMinusMinutes = ldtParsed.minusMinutes(13);
  const ldtMinusNanos = ldtParsed.minusNanos(1);
  const ldtMinusYears = ldtParsed.minusYears(2);
  const ldtMinusMonths = ldtParsed.minusMonths(2);
  const ldtMinusWeeks = ldtParsed.minusWeeks(2);
  const ldtMinusDays = ldtParsed.minusDays(2);
  testLib.assertEquals(ldtMinusHours.toString(), "2023-02-08T10:15:30");
  testLib.assertEquals(ldtMinusSeconds.toString(), "2023-02-08T11:15:17");
  testLib.assertEquals(ldtMinusMinutes.toString(), "2023-02-08T11:02:30");
  testLib.assertEquals(ldtMinusNanos.toString(), "2023-02-08T11:15:29.999999999");
  testLib.assertEquals(ldtMinusYears.toString(), "2021-02-08T11:15:30");
  testLib.assertEquals(ldtMinusMonths.toString(), "2022-12-08T11:15:30");
  testLib.assertEquals(ldtMinusWeeks.toString(), "2023-01-25T11:15:30");
  testLib.assertEquals(ldtMinusDays.toString(), "2023-02-06T11:15:30");
}

exports.testGivenLocalDateTime_testTime = function() {
  const offsetDateTime = ldtParsed.atOffset(ZoneOffset.UTC);
  const zonedDateTime = ldtParsed.atZone(ZoneId.of(ZONE_ID_OSLO_NORMALIZED));
  const toLocalDate = ldtParsed.toLocalDate();
  const toLocalTime = ldtParsed.toLocalTime();
  const dayOfWeek = ldtParsed.getDayOfWeek();
  const month = ldtParsed.getMonth();
  const monthValue = ldtParsed.getMonthValue();
  const hour = ldtParsed.getHour();
  const withYear = ldtParsed.withYear(1996);
  testLib.assertEquals(offsetDateTime, OffsetDateTime.of(ldtParsed, ZoneOffset.UTC));
  testLib.assertEquals(zonedDateTime, ZonedDateTime.parse("2023-02-08T11:15:30+01:00[Europe/Oslo]"));
  testLib.assertEquals(toLocalDate.toString(), "2023-02-08");
  testLib.assertEquals(toLocalTime.toString(), "11:15:30");
  testLib.assertEquals(dayOfWeek.getValue(), 3);
  testLib.assertEquals(month, Month.of(2));
  testLib.assertEquals(monthValue, 2);
  testLib.assertEquals(hour, 11);
  testLib.assertEquals(withYear.toString(), "1996-02-08T11:15:30");
}
