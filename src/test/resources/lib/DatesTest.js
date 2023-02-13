const testLib = require("/lib/xp/testing");
const t = require("/lib/time/Dates");
const utilLib = require("/lib/time/Util");
const DateTimeFormatter = utilLib.DateTimeFormatter;
const monthLib = require("/lib/time/Month");
const Month = monthLib.Month;
const zoneIdLib = require("/lib/time/ZoneId");
const ZoneId = zoneIdLib.ZoneId;
const instantLib = require("/lib/time/Instant");
const Instant = instantLib.Instant;
const localDateTimeLib = require("/lib/time/LocalDateTime");
const localDateLib = require("/lib/time/LocalDate");
const localTimeLib = require("/lib/time/LocalTime");
const offsetDateTimeLib = require("/lib/time/OffsetDateTime");
const offsetTimeLib = require("/lib/time/OffsetTime");
const zonedDateTimeLib = require("/lib/time/ZonedDateTime");
const LocalDateTime = localDateTimeLib.LocalDateTime;
const LocalDate = localDateLib.LocalDate;
const LocalTime = localTimeLib.LocalTime;
const OffsetDateTime = offsetDateTimeLib.OffsetDateTime;
const OffsetTime = offsetTimeLib.OffsetTime;
const ZonedDateTime = zonedDateTimeLib.ZonedDateTime;

exports.testCreateTimeElementMarkup = function () {
  const result = t.createTimeElementMarkup({date: "2023-02-01", pattern: "yyyy-MM-dd", locale: "us"});
  testLib.assertEquals(result, "<time datetime=\"2023-02-01\">2023-02-01</time>");
}

exports.testGivenDate_testFormatDate = function () {
  const result = t.formatDate(
    {date: new Date(2023, Month.of(1).getValue(), 8, 2, 2, 2),
      pattern: "yyyy-MM-dd",
      locale: "us"});
  testLib.assertEquals(result, "2023-02-08");
}

exports.testGivenLocalDateTime_testFormatLocalDateTime = function () {
  const localDateTime = LocalDateTime.of(2023, Month.of(2), 8, 13, 22, 11, 11);
  const formatted = localDateTime.format(DateTimeFormatter.BASIC_ISO_DATE);
  testLib.assertEquals(formatted, "20230208");
}

exports.testGivenLocalDate_testFormatLocalDate = function () {
  const localDate = LocalDate.ofYearDay(2023, 54);
  const formatted = localDate.format(DateTimeFormatter.ISO_WEEK_DATE);
  testLib.assertEquals(formatted, "2023-W08-4");
}

exports.testGivenLocalTime_testFormatLocalTime= function () {
  const localTime = LocalTime.MIDNIGHT;
  const formatted = localTime.format(DateTimeFormatter.ISO_TIME);
  testLib.assertEquals(formatted, "00:00:00");
}

exports.testGivenOffsetDateTime_testFormatOffsetDateTime= function () {
  const offsetDateTime = OffsetDateTime.MIN;
  const formatted = offsetDateTime.format(DateTimeFormatter.ISO_OFFSET_TIME);
  testLib.assertEquals(formatted, "00:00:00+18:00");
}

exports.testGivenOffsetInstant_testFormatOffsetTime= function () {
  const offsetTime = OffsetTime.ofInstant(Instant.parse("2023-02-08T10:15:30.00Z"), ZoneId.systemDefault());
  testLib.assertEquals(offsetTime.toString(), "11:15:30+01:00");
}

exports.testGivenZonedDateTime_testFormatZonedDateTime= function () {
  const zonedDateTime = ZonedDateTime.ofInstant(Instant.parse("2023-02-08T10:15:30.00Z"), ZoneId.systemDefault());
  testLib.assertEquals(zonedDateTime.toString(), "2023-02-08T11:15:30+01:00" + "[" + ZoneId.systemDefault().toString() + "]");
}

exports.testGivenLocalDateTime_testPlusTime= function () {
  const localDateTime = LocalDateTime.parse("2023-02-08T11:15:30").plusHours(1);
  testLib.assertEquals(localDateTime.toString(), "2023-02-08T12:15:30");
}


