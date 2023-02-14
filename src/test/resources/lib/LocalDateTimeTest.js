const testLib = require("/lib/xp/testing");
const localDateTimeLib = require("/lib/time/local-date-time");
const LocalDateTime = localDateTimeLib.LocalDateTime;
const formatLib = require("/lib/time/format/date-time-formatter");
const DateTimeFormatter = formatLib.DateTimeFormatter;
const monthLib = require("/lib/time/month");
const Month = monthLib.Month;

exports.testGivenLocalDateTime_testFormatLocalDateTime = function () {
  const localDateTime = LocalDateTime.of(2023, Month.of(2), 8, 13, 22, 11, 11);
  const formatted = localDateTime.format(DateTimeFormatter.BASIC_ISO_DATE);
  testLib.assertEquals(formatted, "20230208");
}

exports.testGivenLocalDateTime_testPlusTime = function () {
  const localDateTime = LocalDateTime.parse("2023-02-08T11:15:30").plusHours(1);
  testLib.assertEquals(localDateTime.toString(), "2023-02-08T12:15:30");
}
