const t = require("/lib/xp/testing");
const time = require("/lib/time");
const Period = time.Period;
const Duration = time.Duration;
const LocalDate = time.LocalDate;
const LocalTime = time.LocalTime;
const LocalDateTime = time.LocalDateTime;
const ZonedDateTime = time.ZonedDateTime;

const period = Period.of(1, 2, 3);
const date = LocalDate.parse("2023-02-08");

exports.testCreate = function () {
  t.assertEquals("P1Y2M3D", period.toString());
  t.assertEquals("P1Y", Period.ofYears(1).toString());
  t.assertEquals("P15M", Period.ofMonths(15).toString());
  t.assertEquals("P14D", Period.ofWeeks(2).toString());
  t.assertEquals("P10D", Period.ofDays(10).toString());
  t.assertEquals("P0D", Period.ZERO.toString());
};

exports.testParse = function () {
  t.assertEquals(period, Period.parse("P1Y2M3D"));
  t.assertEquals(Period.ofDays(14), Period.parse("P2W"));
  t.assertEquals(Period.ofMonths(-1), Period.parse("-P1M"));
  t.assertEquals(period, Period.parse(period.toString()));
};

exports.testRejectsInvalidText = function () {
  t.assertThrows(function () {
    Period.parse("1 month");
  });
  // Hours belong in a Duration
  t.assertThrows(function () {
    Period.parse("PT1H");
  });
};

exports.testGetters = function () {
  t.assertEquals(1, period.getYears());
  t.assertEquals(2, period.getMonths());
  t.assertEquals(3, period.getDays());
  t.assertEquals(14, period.toTotalMonths());
};

exports.testBetween = function () {
  const earlier = LocalDate.parse("2020-11-05");

  t.assertEquals("P2Y3M3D", Period.between(earlier, date).toString());
  t.assertEquals("P-2Y-3M-3D", Period.between(date, earlier).toString());
  t.assertEquals(Period.ZERO, Period.between(date, date));
  t.assertEquals(Period.between(earlier, date), earlier.until(date));
};

exports.testAge = function () {
  const born = LocalDate.parse("1990-05-17");

  // The birthday in May has not been yet
  t.assertEquals(32, Period.between(born, date).getYears());
  t.assertEquals(33, Period.between(born, LocalDate.parse("2023-05-17")).getYears());
};

exports.testPlus = function () {
  t.assertEquals("P2Y3M4D", period.plus(Period.of(1, 1, 1)).toString());
  t.assertEquals("P2Y2M3D", period.plusYears(1).toString());
  t.assertEquals("P1Y2M33D", period.plusDays(30).toString());
  // Months are not carried over into years
  t.assertEquals("P1Y13M3D", period.plusMonths(11).toString());
};

exports.testMinus = function () {
  t.assertEquals("P1M2D", period.minus(Period.of(1, 1, 1)).toString());
  t.assertEquals("P2M3D", period.minusYears(1).toString());
  t.assertEquals("P1Y2M", period.minusDays(3).toString());
  // Each unit is kept on its own, so one of them can go negative
  t.assertEquals("P1Y-1M3D", period.minusMonths(3).toString());
};

exports.testNormalized = function () {
  t.assertEquals("P1Y3M", Period.ofMonths(15).normalized().toString());
  t.assertEquals("P11M", Period.of(1, -1, 0).normalized().toString());
  // Days are left alone, since a month has no fixed number of days
  t.assertEquals("P45D", Period.ofDays(45).normalized().toString());
};

exports.testMultiplyAndNegate = function () {
  t.assertEquals("P2Y4M6D", period.multipliedBy(2).toString());
  t.assertEquals("P-1Y-2M-3D", period.negated().toString());
  t.assertEquals(period, period.negated().negated());
};

exports.testWith = function () {
  t.assertEquals("P5Y2M3D", period.withYears(5).toString());
  t.assertEquals("P1Y3D", period.withMonths(0).toString());
  t.assertEquals("P1Y2M", period.withDays(0).toString());
};

exports.testChecks = function () {
  t.assertTrue(Period.ZERO.isZero());
  t.assertFalse(period.isZero());
  t.assertFalse(period.isNegative());
  t.assertTrue(period.negated().isNegative());
  // One negative unit is enough
  t.assertTrue(Period.of(1, -1, 0).isNegative());
};

exports.testEquals = function () {
  t.assertTrue(Period.ofWeeks(2).equals(Period.ofDays(14)));
  // The units are compared one by one, so these are not equal before they are normalized
  t.assertFalse(Period.ofMonths(12).equals(Period.ofYears(1)));
  t.assertTrue(Period.ofMonths(12).normalized().equals(Period.ofYears(1)));
};

exports.testAddToDates = function () {
  t.assertEquals("2024-04-11", date.plus(period).toString());
  t.assertEquals("2021-12-05", date.minus(period).toString());
  t.assertEquals("2023-03-08T10:15:30", LocalDateTime.parse("2023-02-08T10:15:30").plus(Period.ofMonths(1)).toString());
};

exports.testAddingMonthsClampsToEndOfMonth = function () {
  const oneMonth = Period.ofMonths(1);
  const endOfJanuary = LocalDate.parse("2023-01-31");

  t.assertEquals("2023-02-28", endOfJanuary.plus(oneMonth).toString());
  // The day of the month that was lost does not come back
  t.assertEquals("2023-03-28", endOfJanuary.plus(oneMonth).plus(oneMonth).toString());
  t.assertEquals("2023-03-31", endOfJanuary.plus(Period.ofMonths(2)).toString());
};

exports.testCanNotBeAddedToTime = function () {
  // A time of day has no calendar to add days to
  t.assertThrows(function () {
    LocalTime.parse("10:15:30").plus(Period.ofDays(1));
  });
};

exports.testDayFollowsCalendarAcrossDaylightSaving = function () {
  // Summer time in Oslo started on 2023-03-26, so that day was only 23 hours long
  const dayBefore = ZonedDateTime.parse("2023-03-25T12:00:00+01:00[Europe/Oslo]");

  // A Period of a day keeps the clock time
  t.assertEquals("2023-03-26T12:00+02:00[Europe/Oslo]", dayBefore.plus(Period.ofDays(1)).toString());
  // A Duration of a day is exactly 24 hours
  t.assertEquals("2023-03-26T13:00+02:00[Europe/Oslo]", dayBefore.plus(Duration.ofDays(1)).toString());
};
