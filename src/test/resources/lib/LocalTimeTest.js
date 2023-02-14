const testLib = require("/lib/xp/testing");
const localTimeLib = require("/lib/time/local-time");
const LocalTime = localTimeLib.LocalTime;
const formatLib = require("/lib/time/format/date-time-formatter");
const DateTimeFormatter = formatLib.DateTimeFormatter;

exports.testGivenLocalTime_testFormatLocalTime = function () {
  const localTime = LocalTime.MIDNIGHT;
  const formatted = localTime.format(DateTimeFormatter.ISO_TIME);
  testLib.assertEquals(formatted, "00:00:00");
}
