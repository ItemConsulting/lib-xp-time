const testLib = require("/lib/xp/testing");
const t = require("/lib/time");
const monthLib = require("/lib/time/month");
const Month = monthLib.Month;

const date = new Date(2023, Month.of(1).getValue(), 8, 2, 2, 2);
const dateTime = "2023-06-07T10:00:00Z";
const PATTERN = "yyyy-MM-dd";
const PATTERN_WITH_TIME = "dd.MM.yyyy | HH:mm";
const LOCALE = "us";

exports.testGivenDate_testFormatDate = function () {
  const dateResult = t.formatDate({
    date,
    pattern: PATTERN,
    locale: LOCALE
  });
  const undefinedDate = t.formatDate({
    date: undefined,
    pattern: PATTERN,
    locale: LOCALE
  });
  const nullDate = t.formatDate({
    date: null,
    pattern: PATTERN,
    locale: LOCALE
  });
  const undefinedLocale = t.formatDate({
    date,
    pattern: PATTERN,
    locale: undefined
  });
  const emptyStringLocale = t.formatDate({
    date,
    pattern: PATTERN,
    locale: ""
  });
  const dateWithTimeszone = t.formatDate({
    date: dateTime,
    pattern: PATTERN_WITH_TIME,
    locale: "no",
    timezoneId: "Europe/Oslo"
  });

  const dateWithWrongTimeszoneDefaultsToSystem = t.formatDate({
    date: dateTime,
    pattern: PATTERN_WITH_TIME,
    locale: LOCALE,
    timezoneId: "Europe/afdasdfas"
  });

  testLib.assertEquals(dateResult, "2023-02-08");
  testLib.assertEquals(undefinedDate, undefined);
  testLib.assertEquals(nullDate, undefined);
  testLib.assertEquals(undefinedLocale, "2023-02-08");
  testLib.assertEquals(emptyStringLocale, "2023-02-08");
  testLib.assertEquals(dateWithTimeszone, "07.06.2023 | 12:00");
  testLib.assertEquals(dateWithWrongTimeszoneDefaultsToSystem, "07.06.2023 | 12:00");
}
