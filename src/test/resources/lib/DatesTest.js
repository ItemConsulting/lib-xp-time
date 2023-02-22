const testLib = require("/lib/xp/testing");
const t = require("/lib/time");
const monthLib = require("/lib/time/month");
const Month = monthLib.Month;

const date = new Date(2023, Month.of(1).getValue(), 8, 2, 2, 2);
const PATTERN = "yyyy-MM-dd";
const LOCALE = "us";

exports.testGivenDate_testFormatDate = function () {
  const dateResult = t.formatDate({
      date,
      pattern: PATTERN,
      locale: LOCALE,});
  const undefinedDate = t.formatDate({
      date: undefined,
      pattern: PATTERN,
      locale: LOCALE,});
  const nullDate = t.formatDate({
      date: null,
      pattern: PATTERN,
      locale: LOCALE,});
  const undefinedLocale = t.formatDate({
      date,
      pattern: PATTERN,
      locale: undefined});
  const emptyStringLocale = t.formatDate({
      date,
      pattern: PATTERN,
      locale: ""});
  testLib.assertEquals(dateResult, "2023-02-08");
  testLib.assertEquals(undefinedDate, undefined);
  testLib.assertEquals(nullDate, undefined);
  testLib.assertEquals(undefinedLocale, "2023-02-08");
  testLib.assertEquals(emptyStringLocale, "2023-02-08");
}
