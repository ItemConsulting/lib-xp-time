const testLib = require("/lib/xp/testing");
const localDateLib = require("/lib/time/local-date");
const LocalDate = localDateLib.LocalDate;
const formatLib = require("/lib/time/format/date-time-formatter");
const DateTimeFormatter = formatLib.DateTimeFormatter;

exports.testGivenLocalDate_testFormatLocalDate = function () {
  const localDate = LocalDate.ofYearDay(2023, 54);
  const formatted = localDate.format(DateTimeFormatter.ISO_WEEK_DATE);
  testLib.assertEquals(formatted, "2023-W08-4");
}
