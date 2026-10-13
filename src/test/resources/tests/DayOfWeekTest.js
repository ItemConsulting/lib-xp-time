const t = require("/lib/xp/testing");
const time = require("/lib/time");
const DayOfWeek = time.DayOfWeek;
const TextStyle = time.TextStyle;
const Locale = time.Locale;

// ISO-8601: the week starts on Monday
const NAMES = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

exports.testConstants = function () {
  NAMES.forEach(function (name, index) {
    const day = DayOfWeek[name];

    t.assertTrue(!!day, "DayOfWeek." + name + " is missing");
    t.assertEquals(index + 1, day.getValue());
    t.assertEquals(name, day.toString());
    t.assertEquals(day, DayOfWeek.of(index + 1));
    t.assertEquals(day, DayOfWeek.valueOf(name));
  });
};

exports.testValues = function () {
  const values = DayOfWeek.values();

  t.assertEquals(7, values.length);
  t.assertEquals(DayOfWeek.MONDAY, values[0]);
  t.assertEquals(DayOfWeek.SUNDAY, values[6]);
};

exports.testRejectsInvalidDays = function () {
  t.assertThrows(function () {
    DayOfWeek.of(0);
  });
  t.assertThrows(function () {
    DayOfWeek.of(8);
  });
  t.assertThrows(function () {
    DayOfWeek.valueOf("Monday");
  });
};

exports.testPlusAndMinus = function () {
  t.assertEquals(DayOfWeek.THURSDAY, DayOfWeek.WEDNESDAY.plus(1));
  t.assertEquals(DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY.minus(1));
  // Wraps around the week
  t.assertEquals(DayOfWeek.MONDAY, DayOfWeek.SUNDAY.plus(1));
  t.assertEquals(DayOfWeek.SUNDAY, DayOfWeek.MONDAY.minus(1));
  t.assertEquals(DayOfWeek.WEDNESDAY, DayOfWeek.WEDNESDAY.plus(7));
};

exports.testGetDisplayName = function () {
  t.assertEquals("Wednesday", DayOfWeek.WEDNESDAY.getDisplayName(TextStyle.FULL, Locale.ENGLISH));
  t.assertEquals("Wed", DayOfWeek.WEDNESDAY.getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
  t.assertEquals("W", DayOfWeek.WEDNESDAY.getDisplayName(TextStyle.NARROW, Locale.ENGLISH));
  t.assertEquals("onsdag", DayOfWeek.WEDNESDAY.getDisplayName(TextStyle.FULL, new Locale("no")));
  t.assertEquals("mercredi", DayOfWeek.WEDNESDAY.getDisplayName(TextStyle.FULL, Locale.FRANCE));
};
