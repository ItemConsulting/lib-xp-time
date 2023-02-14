const testLib = require("/lib/xp/testing");
const t = require("/lib/time");
const monthLib = require("/lib/time/month");
const Month = monthLib.Month;

exports.testGivenDate_testFormatDate = function () {
  const result = t.formatDate(
    {date: new Date(2023, Month.of(1).getValue(), 8, 2, 2, 2),
      pattern: "yyyy-MM-dd",
      locale: "us"});
  testLib.assertEquals(result, "2023-02-08");
}
