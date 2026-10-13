const t = require("/lib/xp/testing");
const time = require("/lib/time");
const Month = time.Month;
const TextStyle = time.TextStyle;
const Locale = time.Locale;

const NAMES = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER"
];

exports.testConstants = function () {
  NAMES.forEach(function (name, index) {
    const month = Month[name];

    t.assertTrue(!!month, "Month." + name + " is missing");
    t.assertEquals(index + 1, month.getValue());
    t.assertEquals(name, month.toString());
    t.assertEquals(month, Month.of(index + 1));
    t.assertEquals(month, Month.valueOf(name));
  });
};

exports.testRejectsInvalidMonths = function () {
  t.assertThrows(function () {
    Month.of(0);
  });
  t.assertThrows(function () {
    Month.of(13);
  });
  t.assertThrows(function () {
    Month.valueOf("February");
  });
};

exports.testPlusAndMinus = function () {
  t.assertEquals(Month.MARCH, Month.FEBRUARY.plus(1));
  t.assertEquals(Month.JANUARY, Month.FEBRUARY.minus(1));
  // Wraps around the year
  t.assertEquals(Month.JANUARY, Month.DECEMBER.plus(1));
  t.assertEquals(Month.DECEMBER, Month.JANUARY.minus(1));
  t.assertEquals(Month.FEBRUARY, Month.FEBRUARY.plus(12));
};

exports.testLength = function () {
  t.assertEquals(28, Month.FEBRUARY.length(false));
  t.assertEquals(29, Month.FEBRUARY.length(true));
  t.assertEquals(28, Month.FEBRUARY.minLength());
  t.assertEquals(29, Month.FEBRUARY.maxLength());
  t.assertEquals(31, Month.JANUARY.length(false));
  t.assertEquals(30, Month.APRIL.length(true));
  t.assertEquals(30, Month.APRIL.minLength());
  t.assertEquals(30, Month.APRIL.maxLength());
};

exports.testFirstDayOfYear = function () {
  t.assertEquals(1, Month.JANUARY.firstDayOfYear(false));
  t.assertEquals(32, Month.FEBRUARY.firstDayOfYear(false));
  t.assertEquals(32, Month.FEBRUARY.firstDayOfYear(true));
  // The leap day pushes every later month one day back
  t.assertEquals(60, Month.MARCH.firstDayOfYear(false));
  t.assertEquals(61, Month.MARCH.firstDayOfYear(true));
};

exports.testFirstMonthOfQuarter = function () {
  t.assertEquals(Month.JANUARY, Month.JANUARY.firstMonthOfQuarter());
  t.assertEquals(Month.JANUARY, Month.MARCH.firstMonthOfQuarter());
  t.assertEquals(Month.APRIL, Month.MAY.firstMonthOfQuarter());
  t.assertEquals(Month.JULY, Month.SEPTEMBER.firstMonthOfQuarter());
  t.assertEquals(Month.OCTOBER, Month.DECEMBER.firstMonthOfQuarter());
};

exports.testGetDisplayName = function () {
  t.assertEquals("February", Month.FEBRUARY.getDisplayName(TextStyle.FULL, Locale.ENGLISH));
  t.assertEquals("Feb", Month.FEBRUARY.getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
  t.assertEquals("F", Month.FEBRUARY.getDisplayName(TextStyle.NARROW, Locale.ENGLISH));
  t.assertEquals("februar", Month.FEBRUARY.getDisplayName(TextStyle.FULL, new Locale("no")));
  t.assertEquals("février", Month.FEBRUARY.getDisplayName(TextStyle.FULL, Locale.FRANCE));
};
