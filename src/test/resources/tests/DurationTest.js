const t = require("/lib/xp/testing");
const time = require("/lib/time");
const Duration = time.Duration;
const ChronoUnit = time.ChronoUnit;
const Instant = time.Instant;
const LocalDate = time.LocalDate;
const LocalTime = time.LocalTime;
const LocalDateTime = time.LocalDateTime;
const ZonedDateTime = time.ZonedDateTime;

const oneHour = Duration.ofHours(1);

exports.testCreate = function () {
  t.assertEquals("PT1H", oneHour.toString());
  t.assertEquals("PT1H30M", Duration.ofMinutes(90).toString());
  t.assertEquals("PT45S", Duration.ofSeconds(45).toString());
  t.assertEquals("PT1.5S", Duration.ofSeconds(1, 500000000).toString());
  t.assertEquals("PT1.5S", Duration.ofMillis(1500).toString());
  t.assertEquals("PT0.000000001S", Duration.ofNanos(1).toString());
  t.assertEquals("PT3H", Duration.of(3, ChronoUnit.HOURS).toString());
  t.assertEquals("PT0S", Duration.ZERO.toString());
};

exports.testDayIsAlways24Hours = function () {
  t.assertEquals("PT48H", Duration.ofDays(2).toString());
  t.assertEquals(Duration.ofHours(24), Duration.ofDays(1));
  t.assertEquals(Duration.ofHours(24), Duration.of(1, ChronoUnit.DAYS));
  // A month has no fixed length, so it can not be turned into a duration
  t.assertThrows(function () {
    Duration.of(1, ChronoUnit.MONTHS);
  });
};

exports.testParse = function () {
  t.assertEquals(Duration.ofMinutes(90), Duration.parse("PT1H30M"));
  t.assertEquals(Duration.ofHours(51), Duration.parse("P2DT3H"));
  t.assertEquals(Duration.ofMillis(1500), Duration.parse("PT1.5S"));
  t.assertEquals(Duration.ofMinutes(-30), Duration.parse("-PT30M"));
  t.assertEquals(Duration.ofMinutes(90), Duration.parse(Duration.ofMinutes(90).toString()));
};

exports.testRejectsInvalidText = function () {
  t.assertThrows(function () {
    Duration.parse("1 hour");
  });
  // Years and months belong in a Period
  t.assertThrows(function () {
    Duration.parse("P1M");
  });
  t.assertThrows(function () {
    Duration.parse("P1Y");
  });
};

exports.testBetween = function () {
  const start = Instant.parse("2023-02-08T10:15:30Z");
  const end = Instant.parse("2023-02-08T11:45:30Z");

  t.assertEquals("PT1H30M", Duration.between(start, end).toString());
  t.assertEquals("PT-1H-30M", Duration.between(end, start).toString());
  t.assertEquals(Duration.ZERO, Duration.between(start, start));
  t.assertEquals("PT2H30M", Duration.between(LocalTime.parse("10:00"), LocalTime.parse("12:30")).toString());
  t.assertEquals(
    "PT25H",
    Duration.between(LocalDateTime.parse("2023-02-08T10:00:00"), LocalDateTime.parse("2023-02-09T11:00:00")).toString()
  );
};

exports.testBetweenNeedsTimeOfDay = function () {
  t.assertThrows(function () {
    Duration.between(LocalDate.parse("2023-02-08"), LocalDate.parse("2023-02-09"));
  });
};

exports.testBetweenAcrossDaylightSaving = function () {
  // Summer time in Oslo started on 2023-03-26, so there are only 23 hours between these
  const dayBefore = ZonedDateTime.parse("2023-03-25T12:00:00+01:00[Europe/Oslo]");
  const sameTimeNextDay = ZonedDateTime.parse("2023-03-26T12:00:00+02:00[Europe/Oslo]");

  t.assertEquals("PT23H", Duration.between(dayBefore, sameTimeNextDay).toString());
};

exports.testTotals = function () {
  const duration = Duration.parse("P1DT2H3M4.005S");

  t.assertEquals(1, duration.toDays());
  t.assertEquals(26, duration.toHours());
  t.assertEquals(1563, duration.toMinutes());
  t.assertEquals(93784, duration.toSeconds());
  t.assertEquals(93784005, duration.toMillis());
  t.assertEquals(93784005000000, duration.toNanos());
  t.assertEquals(93784, duration.getSeconds());
  t.assertEquals(5000000, duration.getNano());
};

exports.testParts = function () {
  const duration = Duration.parse("P1DT2H3M4.005S");

  // What is left of each unit after the larger ones are taken out, for printing "1 d 2 h 3 min"
  t.assertEquals(1, duration.toDaysPart());
  t.assertEquals(2, duration.toHoursPart());
  t.assertEquals(3, duration.toMinutesPart());
  t.assertEquals(4, duration.toSecondsPart());
  t.assertEquals(5, duration.toMillisPart());
  t.assertEquals(5000000, duration.toNanosPart());
};

exports.testPlus = function () {
  t.assertEquals("PT1H30M", oneHour.plus(Duration.ofMinutes(30)).toString());
  t.assertEquals("PT1H15M", oneHour.plus(15, ChronoUnit.MINUTES).toString());
  t.assertEquals("PT25H", oneHour.plusDays(1).toString());
  t.assertEquals("PT2H", oneHour.plusHours(1).toString());
  t.assertEquals("PT1H1M", oneHour.plusMinutes(1).toString());
  t.assertEquals("PT1H1S", oneHour.plusSeconds(1).toString());
  t.assertEquals("PT1H0.001S", oneHour.plusMillis(1).toString());
  t.assertEquals("PT1H0.000000001S", oneHour.plusNanos(1).toString());
};

exports.testMinus = function () {
  t.assertEquals("PT30M", oneHour.minus(Duration.ofMinutes(30)).toString());
  t.assertEquals("PT45M", oneHour.minus(15, ChronoUnit.MINUTES).toString());
  t.assertEquals("PT-23H", oneHour.minusDays(1).toString());
  t.assertEquals(Duration.ZERO, oneHour.minusHours(1));
  t.assertEquals("PT59M", oneHour.minusMinutes(1).toString());
  t.assertEquals("PT59M59S", oneHour.minusSeconds(1).toString());
  t.assertEquals("PT59M59.999S", oneHour.minusMillis(1).toString());
  t.assertEquals("PT59M59.999999999S", oneHour.minusNanos(1).toString());
};

exports.testMultiplyAndDivide = function () {
  t.assertEquals(oneHour, Duration.ofMinutes(20).multipliedBy(3));
  t.assertEquals(Duration.ofMinutes(30), oneHour.dividedBy(2));
  // How many times the other duration fits
  t.assertEquals(3, oneHour.dividedBy(Duration.ofMinutes(20)));
  t.assertEquals(2, oneHour.dividedBy(Duration.ofMinutes(25)));
  t.assertThrows(function () {
    oneHour.dividedBy(0);
  });
};

exports.testNegatedAndAbs = function () {
  t.assertEquals("PT-1H", oneHour.negated().toString());
  t.assertEquals(oneHour, oneHour.negated().abs());
  t.assertEquals(oneHour, oneHour.abs());
};

exports.testWithAndTruncate = function () {
  t.assertEquals("PT30S", oneHour.withSeconds(30).toString());
  t.assertEquals("PT1.5S", Duration.ofSeconds(1).withNanos(500000000).toString());
  t.assertEquals("PT2M", Duration.ofSeconds(125).truncatedTo(ChronoUnit.MINUTES).toString());
  t.assertEquals("PT1H", Duration.ofMinutes(119).truncatedTo(ChronoUnit.HOURS).toString());
};

exports.testChecks = function () {
  t.assertTrue(Duration.ZERO.isZero());
  t.assertFalse(oneHour.isZero());
  t.assertTrue(oneHour.isPositive());
  t.assertFalse(oneHour.isNegative());
  t.assertTrue(oneHour.negated().isNegative());
  t.assertFalse(oneHour.negated().isPositive());
  t.assertFalse(Duration.ZERO.isPositive());
  t.assertFalse(Duration.ZERO.isNegative());
};

exports.testCompare = function () {
  const twoHours = Duration.ofHours(2);

  t.assertTrue(oneHour.compareTo(twoHours) < 0);
  t.assertTrue(twoHours.compareTo(oneHour) > 0);
  t.assertEquals(0, oneHour.compareTo(Duration.ofMinutes(60)));
  t.assertTrue(oneHour.equals(Duration.ofMinutes(60)));
  t.assertFalse(oneHour.equals(twoHours));
};

exports.testAddToDateTimes = function () {
  const ninetyMinutes = Duration.ofMinutes(90);

  t.assertEquals("2023-02-08T11:45:30Z", Instant.parse("2023-02-08T10:15:30Z").plus(ninetyMinutes).toString());
  t.assertEquals("2023-02-08T08:45:30Z", Instant.parse("2023-02-08T10:15:30Z").minus(ninetyMinutes).toString());
  t.assertEquals("11:45:30", LocalTime.parse("10:15:30").plus(ninetyMinutes).toString());
  // Carries into the next day
  t.assertEquals(
    "2023-02-09T00:45:30",
    LocalDateTime.parse("2023-02-08T23:15:30").plus(ninetyMinutes).toString()
  );
};

exports.testCanNotBeAddedToDate = function () {
  // A date has no time of day to add hours to
  t.assertThrows(function () {
    LocalDate.parse("2023-02-08").plus(oneHour);
  });
};
