const t = require("/lib/xp/testing");
const time = require("/lib/time");
const Year = time.Year;
const ZoneId = time.ZoneId;
const DateTimeFormatter = time.DateTimeFormatter;

const year = Year.of(2023);

exports.testCreate = function () {
  t.assertEquals(year, Year.parse("2023"));
  t.assertEquals(year, Year.parse("23", DateTimeFormatter.ofPattern("yy")));
  t.assertEquals(2023, year.getValue());
  t.assertEquals("2023", year.toString());
};

exports.testNow = function () {
  t.assertTrue(Year.now().isAfter(year));
  t.assertTrue(Year.now(ZoneId.of("Europe/Oslo")).isAfter(year));
};

exports.testRejectsInvalidYears = function () {
  t.assertThrows(function () {
    Year.parse("not a year");
  });
  t.assertThrows(function () {
    Year.of(1000000000);
  });
};

exports.testIsLeap = function () {
  t.assertFalse(year.isLeap());
  t.assertTrue(Year.of(2024).isLeap());
  // Divisible by 100 is not a leap year, unless it is also divisible by 400
  t.assertFalse(Year.of(1900).isLeap());
  t.assertTrue(Year.of(2000).isLeap());

  t.assertFalse(Year.isLeap(2023));
  t.assertTrue(Year.isLeap(2024));
};

exports.testPlusAndMinus = function () {
  t.assertEquals(Year.of(2024), year.plusYears(1));
  t.assertEquals(Year.of(2022), year.minusYears(1));
  t.assertEquals(Year.of(1923), year.minusYears(100));
};

exports.testCompare = function () {
  const next = Year.of(2024);

  t.assertTrue(next.isAfter(year));
  t.assertFalse(next.isBefore(year));
  t.assertTrue(year.isBefore(next));
  t.assertFalse(year.isAfter(year));
  t.assertTrue(year.compareTo(next) < 0);
  t.assertTrue(next.compareTo(year) > 0);
  t.assertEquals(0, year.compareTo(Year.of(2023)));
};

exports.testAtDay = function () {
  t.assertEquals("2023-01-01", year.atDay(1).toString());
  t.assertEquals("2023-02-08", year.atDay(39).toString());
  t.assertEquals("2023-12-31", year.atDay(365).toString());
  t.assertEquals("2024-12-31", Year.of(2024).atDay(366).toString());
  // Day 366 only exists in a leap year
  t.assertThrows(function () {
    year.atDay(366);
  });
};

exports.testFormat = function () {
  t.assertEquals("23", year.format(DateTimeFormatter.ofPattern("yy")));
  t.assertEquals("2023", year.format(DateTimeFormatter.ofPattern("yyyy")));
};
