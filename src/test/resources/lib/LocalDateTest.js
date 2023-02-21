const testLib = require("/lib/xp/testing");
const localDateLib = require("/lib/time/local-date");
const LocalDate = localDateLib.LocalDate;
const formatLib = require("/lib/time/format/date-time-formatter");
const localTimeLib = require("/lib/time/local-time");
const zoneOffsetLib = require("/lib/time/zone-offset");
const ZoneOffset = zoneOffsetLib.ZoneOffset;
const LocalTime = localTimeLib.LocalTime;
const DateTimeFormatter = formatLib.DateTimeFormatter;

const LOCAL_DATE = "2023-02-08";
const ldParsed = LocalDate.parse(LOCAL_DATE);

const LOCAL_TIME = "00:00";
const ltParsed = LocalTime.parse(LOCAL_TIME);

exports.testGivenLocalDate_testFormatLocalDate = function () {
  const localDate = LocalDate.ofYearDay(2023, 39);
  const formatted = localDate.format(DateTimeFormatter.ISO_WEEK_DATE);
  testLib.assertEquals(formatted, "2023-W06-3");
}

exports.testGivenLocalDate_testPlusDate = function() {
  const plusDays = ldParsed.plusDays(1);
  const plusWeeks = ldParsed.plusWeeks(1);
  const plusMonths = ldParsed.plusMonths(1);
  const plusYears = ldParsed.plusYears(1);
  testLib.assertEquals(plusDays.toString(), "2023-02-09");
  testLib.assertEquals(plusWeeks.toString(), "2023-02-15");
  testLib.assertEquals(plusMonths.toString(), "2023-03-08");
  testLib.assertEquals(plusYears.toString(), "2024-02-08");
}

exports.testGivenLocalDate_testMinusDate = function() {
  const minusDays = ldParsed.minusDays(1);
  const minusWeeks = ldParsed.minusWeeks(1);
  const minusMonths = ldParsed.minusMonths(1);
  const minusYears = ldParsed.minusYears(1);
  testLib.assertEquals(minusDays.toString(), "2023-02-07");
  testLib.assertEquals(minusWeeks.toString(), "2023-02-01");
  testLib.assertEquals(minusMonths.toString(), "2023-01-08");
  testLib.assertEquals(minusYears.toString(), "2022-02-08");
}

exports.testGivenLocalDate_testDate = function() {
  const startOfDay = ldParsed.atStartOfDay();
  const atTime = ldParsed.atTime(LocalTime.parse(LOCAL_TIME));
  const dayOfWeek = ldParsed.getDayOfWeek();
  const month = ldParsed.getMonth();
  const dayOfYear = ldParsed.getDayOfYear();
  const dayOfMonth = ldParsed.getDayOfMonth();
  const leapYear = ldParsed.isLeapYear();
  const lengthOfMonth = ldParsed.lengthOfMonth();
  const lengthOfYear = ldParsed.lengthOfYear();
  const toEpochSecond = ldParsed.toEpochSecond(ltParsed, ZoneOffset.UTC);
  const withDayOfMonth = ldParsed.withDayOfMonth(28);
  const withMonth = ldParsed.withMonth(3);
  const withYear = ldParsed.withYear(1776);
  testLib.assertEquals(startOfDay.toString(), "2023-02-08T00:00");
  testLib.assertEquals(atTime.toString(), "2023-02-08T00:00");
  testLib.assertEquals(dayOfWeek.getValue(), 3);
  testLib.assertEquals(month.getValue(), 2);
  testLib.assertEquals(dayOfYear, 39);
  testLib.assertEquals(dayOfMonth, 8);
  testLib.assertFalse(leapYear);
  testLib.assertEquals(lengthOfMonth, 28);
  testLib.assertEquals(lengthOfYear, 365);
  testLib.assertEquals(toEpochSecond, 1.6758144E9);
  testLib.assertEquals(withDayOfMonth.toString(), "2023-02-28");
  testLib.assertEquals(withMonth.toString(), "2023-03-08");
  testLib.assertEquals(withYear.toString(), "1776-02-08");
}
