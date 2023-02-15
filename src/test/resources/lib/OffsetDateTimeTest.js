const testLib = require("/lib/xp/testing");
const offsetDateTimeLib = require("/lib/time/offset-date-time");
const OffsetDateTime = offsetDateTimeLib.OffsetDateTime;
const formatLib = require("/lib/time/format/date-time-formatter");
const DateTimeFormatter = formatLib.DateTimeFormatter;

exports.testGivenOffsetDateTime_testFormatOffsetDateTime = function () {
  const offsetDateTime = OffsetDateTime.MIN;
  const formatted = offsetDateTime.format(DateTimeFormatter.ISO_OFFSET_TIME);
  testLib.assertEquals(formatted, "00:00:00+18:00");
}
