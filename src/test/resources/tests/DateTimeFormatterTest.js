const t = require("/lib/xp/testing");
const time = require("/lib/time");
const DateTimeFormatter = time.DateTimeFormatter;
const FormatStyle = time.FormatStyle;
const TextStyle = time.TextStyle;
const LocalDate = time.LocalDate;
const LocalTime = time.LocalTime;
const LocalDateTime = time.LocalDateTime;
const ZonedDateTime = time.ZonedDateTime;
const Instant = time.Instant;
const ZoneId = time.ZoneId;
const Locale = time.Locale;

const oslo = ZoneId.of("Europe/Oslo");

// A Wednesday
const date = LocalDate.parse("2023-02-08");
const localTime = LocalTime.parse("10:15:30");
const dateTime = LocalDateTime.parse("2023-02-08T10:15:30");
const zonedDateTime = ZonedDateTime.parse("2023-02-08T10:15:30+01:00[Europe/Oslo]");

exports.testIsoFormatters = function () {
  t.assertEquals("20230208", date.format(DateTimeFormatter.BASIC_ISO_DATE));
  t.assertEquals("2023-02-08", date.format(DateTimeFormatter.ISO_DATE));
  t.assertEquals("2023-02-08", date.format(DateTimeFormatter.ISO_LOCAL_DATE));
  t.assertEquals("2023-039", date.format(DateTimeFormatter.ISO_ORDINAL_DATE));
  t.assertEquals("2023-W06-3", date.format(DateTimeFormatter.ISO_WEEK_DATE));
  t.assertEquals("10:15:30", localTime.format(DateTimeFormatter.ISO_TIME));
  t.assertEquals("10:15:30", localTime.format(DateTimeFormatter.ISO_LOCAL_TIME));
  t.assertEquals("2023-02-08T10:15:30", dateTime.format(DateTimeFormatter.ISO_DATE_TIME));
  t.assertEquals("2023-02-08T10:15:30", dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
};

exports.testIsoFormattersWithZone = function () {
  t.assertEquals("2023-02-08+01:00", zonedDateTime.format(DateTimeFormatter.ISO_DATE));
  t.assertEquals("10:15:30+01:00", zonedDateTime.format(DateTimeFormatter.ISO_TIME));
  t.assertEquals("10:15:30+01:00", zonedDateTime.format(DateTimeFormatter.ISO_OFFSET_TIME));
  t.assertEquals("2023-02-08+01:00", zonedDateTime.format(DateTimeFormatter.ISO_OFFSET_DATE));
  t.assertEquals("2023-02-08T10:15:30+01:00", zonedDateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
  t.assertEquals("2023-02-08T10:15:30+01:00[Europe/Oslo]", zonedDateTime.format(DateTimeFormatter.ISO_DATE_TIME));
  t.assertEquals(
    "2023-02-08T10:15:30+01:00[Europe/Oslo]",
    zonedDateTime.format(DateTimeFormatter.ISO_ZONED_DATE_TIME)
  );
  t.assertEquals("2023-02-08T09:15:30Z", zonedDateTime.format(DateTimeFormatter.ISO_INSTANT));
  t.assertEquals("Wed, 8 Feb 2023 10:15:30 +0100", zonedDateTime.format(DateTimeFormatter.RFC_1123_DATE_TIME));
};

exports.testFormatterNeedsTheFieldsItPrints = function () {
  // A date has no time to print, and a local date-time has no offset
  t.assertThrows(function () {
    date.format(DateTimeFormatter.ISO_LOCAL_TIME);
  });
  t.assertThrows(function () {
    dateTime.format(DateTimeFormatter.ISO_OFFSET_TIME);
  });
};

exports.testFormatterFormat = function () {
  // formatter.format(value) gives the same as value.format(formatter)
  t.assertEquals("2023-02-08", DateTimeFormatter.ISO_LOCAL_DATE.format(date));
  t.assertEquals("10:15", DateTimeFormatter.ofPattern("HH:mm").format(localTime));
};

exports.testCanNotBeConstructed = function () {
  t.assertThrows(function () {
    new DateTimeFormatter();
  });
};

exports.testOfPattern = function () {
  t.assertEquals("08.02.2023", date.format(DateTimeFormatter.ofPattern("dd.MM.yyyy")));
  t.assertEquals("8/2/23", date.format(DateTimeFormatter.ofPattern("d/M/yy")));
  t.assertEquals("10:15", localTime.format(DateTimeFormatter.ofPattern("HH:mm")));
  t.assertEquals("at 10 o'clock", localTime.format(DateTimeFormatter.ofPattern("'at' H 'o''clock'")));
  t.assertThrows(function () {
    DateTimeFormatter.ofPattern("not a pattern");
  });
};

exports.testOfPatternWithLocale = function () {
  const pattern = "EEEE d. MMMM yyyy";

  t.assertEquals("onsdag 8. februar 2023", date.format(DateTimeFormatter.ofPattern(pattern, new Locale("no"))));
  t.assertEquals("Wednesday 8. February 2023", date.format(DateTimeFormatter.ofPattern(pattern, Locale.ENGLISH)));
  t.assertEquals("mercredi 8. février 2023", date.format(DateTimeFormatter.ofPattern(pattern, Locale.FRANCE)));
  t.assertEquals("ons. 8. feb.", date.format(DateTimeFormatter.ofPattern("EEE d. MMM", new Locale("no"))));
};

exports.testWithLocale = function () {
  const english = DateTimeFormatter.ofPattern("EEEE", Locale.ENGLISH);
  const french = english.withLocale(Locale.FRANCE);

  t.assertEquals(Locale.ENGLISH, english.getLocale());
  t.assertEquals(Locale.FRANCE, french.getLocale());
  t.assertEquals("Wednesday", date.format(english));
  t.assertEquals("mercredi", date.format(french));
  t.assertEquals("mercredi", date.format(english.localizedBy(Locale.FRANCE)));
};

exports.testWithZone = function () {
  const formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
  const instant = Instant.parse("2023-02-08T23:30:00Z");

  t.assertEquals(null, formatter.getZone());
  t.assertEquals(oslo, formatter.withZone(oslo).getZone());

  // An instant has no calendar fields until it is given a zone
  t.assertThrows(function () {
    formatter.format(instant);
  });
  t.assertEquals("09.02.2023 00:30", formatter.withZone(oslo).format(instant));
  t.assertEquals("08.02.2023 18:30", formatter.withZone(ZoneId.of("America/New_York")).format(instant));

  // The zone of the formatter overrides the zone of the value
  t.assertEquals("08.02.2023 04:15", zonedDateTime.format(formatter.withZone(ZoneId.of("America/New_York"))));
};

exports.testParseWithFormatter = function () {
  const formatter = DateTimeFormatter.ofPattern("d. MMMM yyyy", new Locale("no"));

  t.assertEquals(date, LocalDate.parse("8. februar 2023", formatter));
  t.assertThrows(function () {
    LocalDate.parse("8. February 2023", formatter);
  });
};

exports.testOfLocalizedDate = function () {
  const us = Locale.US;

  t.assertEquals("2/8/23", date.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT).withLocale(us)));
  t.assertEquals("Feb 8, 2023", date.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).withLocale(us)));
  t.assertEquals("February 8, 2023", date.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG).withLocale(us)));
  t.assertEquals(
    "Wednesday, February 8, 2023",
    date.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).withLocale(us))
  );
  t.assertEquals(
    "8. februar 2023",
    date.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG).withLocale(new Locale("no")))
  );
};

exports.testOfLocalizedTime = function () {
  t.assertEquals("10:15", localTime.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.SHORT).withLocale(Locale.UK)));
  t.assertEquals(
    "10:15:30",
    localTime.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.MEDIUM).withLocale(Locale.UK))
  );
};

exports.testOfLocalizedDateTime = function () {
  const norwegian = new Locale("no");

  t.assertEquals(
    "08.02.2023, 10:15",
    dateTime.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT).withLocale(norwegian))
  );
  t.assertEquals(
    "8. februar 2023, 10:15",
    dateTime.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG, FormatStyle.SHORT).withLocale(norwegian))
  );
};

exports.testFormatStyle = function () {
  t.assertEquals(4, FormatStyle.values().length);
  t.assertEquals(FormatStyle.FULL, FormatStyle.valueOf("FULL"));
  t.assertEquals(FormatStyle.LONG, FormatStyle.valueOf("LONG"));
  t.assertEquals(FormatStyle.MEDIUM, FormatStyle.valueOf("MEDIUM"));
  t.assertEquals(FormatStyle.SHORT, FormatStyle.valueOf("SHORT"));
  t.assertEquals("SHORT", FormatStyle.SHORT.toString());
  t.assertThrows(function () {
    FormatStyle.valueOf("TINY");
  });
};

exports.testTextStyle = function () {
  t.assertEquals(6, TextStyle.values().length);
  t.assertEquals(TextStyle.FULL, TextStyle.valueOf("FULL"));

  t.assertFalse(TextStyle.FULL.isStandalone());
  t.assertTrue(TextStyle.FULL_STANDALONE.isStandalone());
  t.assertEquals(TextStyle.FULL_STANDALONE, TextStyle.FULL.asStandalone());
  t.assertEquals(TextStyle.SHORT_STANDALONE, TextStyle.SHORT.asStandalone());
  t.assertEquals(TextStyle.NARROW_STANDALONE, TextStyle.NARROW.asStandalone());
  t.assertEquals(TextStyle.FULL, TextStyle.FULL_STANDALONE.asNormal());
  t.assertEquals(TextStyle.SHORT, TextStyle.SHORT.asNormal());
};
