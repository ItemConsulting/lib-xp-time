const t = require("/lib/xp/testing");
const time = require("/lib/time");

const PATTERN_DATE = "yyyy-MM-dd";
const PATTERN_DATE_TIME = "dd.MM.yyyy | HH:mm";

// 10:00 UTC on a summer day, so Europe/Oslo is two hours ahead
const UTC_DATE_TIME = "2023-06-07T10:00:00Z";

exports.testReturnsUndefinedWithoutDate = function () {
  t.assertEquals(undefined, time.formatDate({ date: undefined, pattern: PATTERN_DATE }));
  t.assertEquals(undefined, time.formatDate({ date: null, pattern: PATTERN_DATE }));
  t.assertEquals(undefined, time.formatDate({ date: "", pattern: PATTERN_DATE }));
};

exports.testFormatsDateObject = function () {
  // Noon, so the date is the same in UTC and in the system time zone
  const date = new Date(2023, 1, 8, 12, 0, 0);

  t.assertEquals("2023-02-08", time.formatDate({ date: date, pattern: PATTERN_DATE }));
  t.assertEquals("08.02.2023", time.formatDate({ date: date, pattern: "dd.MM.yyyy", locale: "no" }));
};

exports.testFormatsDateObjectInSystemTimeZone = function () {
  // build.gradle pins the system time zone of the test JVM to Europe/Oslo, so these are 23:30 and 10:00 in UTC
  const justAfterMidnight = new Date(2023, 1, 8, 0, 30, 0);
  const noonInSummer = new Date(2023, 5, 7, 12, 0, 0);

  t.assertEquals("2023-02-08", time.formatDate({ date: justAfterMidnight, pattern: PATTERN_DATE }));
  t.assertEquals("08.02.2023 | 00:30", time.formatDate({ date: justAfterMidnight, pattern: PATTERN_DATE_TIME }));
  t.assertEquals("07.06.2023 | 12:00", time.formatDate({ date: noonInSummer, pattern: PATTERN_DATE_TIME }));
};

exports.testFormatsDateObjectInTimeZone = function () {
  const date = new Date(Date.UTC(2023, 5, 7, 10, 0, 0));

  t.assertEquals(
    "07.06.2023 | 12:00",
    time.formatDate({ date: date, pattern: PATTERN_DATE_TIME, timezoneId: "Europe/Oslo" })
  );
};

exports.testFormatsDateOnlyString = function () {
  t.assertEquals("08.02.2023", time.formatDate({ date: "2023-02-08", pattern: "dd.MM.yyyy" }));
  // A date has no time zone to convert from, so timezoneId must not shift it
  t.assertEquals(
    "08.02.2023",
    time.formatDate({ date: "2023-02-08", pattern: "dd.MM.yyyy", timezoneId: "America/New_York" })
  );
};

exports.testFormatsLocalDateTimeString = function () {
  t.assertEquals(
    "08.02.2023 | 11:15",
    time.formatDate({ date: "2023-02-08T11:15:30", pattern: PATTERN_DATE_TIME })
  );
};

exports.testFormatsUtcStringWithoutTimeZone = function () {
  // Without a timezoneId the time is printed as written
  t.assertEquals("07.06.2023 | 10:00", time.formatDate({ date: UTC_DATE_TIME, pattern: PATTERN_DATE_TIME }));
};

exports.testConvertsToTimeZone = function () {
  t.assertEquals(
    "07.06.2023 | 12:00",
    time.formatDate({ date: UTC_DATE_TIME, pattern: PATTERN_DATE_TIME, timezoneId: "Europe/Oslo" })
  );
  t.assertEquals(
    "07.06.2023 | 06:00",
    time.formatDate({ date: UTC_DATE_TIME, pattern: PATTERN_DATE_TIME, timezoneId: "America/New_York" })
  );
  // Crosses midnight, so the date changes too
  t.assertEquals(
    "08.06.2023 | 00:30",
    time.formatDate({ date: "2023-06-07T22:30:00Z", pattern: PATTERN_DATE_TIME, timezoneId: "Europe/Oslo" })
  );
};

exports.testFormatsStringWithPositiveOffset = function () {
  t.assertEquals(
    "07.06.2023 | 08:00",
    time.formatDate({ date: "2023-06-07T10:00:00+02:00", pattern: PATTERN_DATE_TIME, timezoneId: "UTC" })
  );
};

exports.testFormatsStringWithNegativeOffset = function () {
  t.assertEquals(
    "07.06.2023 | 15:00",
    time.formatDate({ date: "2023-06-07T10:00:00-05:00", pattern: PATTERN_DATE_TIME, timezoneId: "UTC" })
  );
  t.assertEquals(
    "07.06.2023 | 10:00",
    time.formatDate({ date: "2023-06-07T10:00:00-05:00", pattern: PATTERN_DATE_TIME })
  );
};

exports.testInvalidTimeZoneFallsBackToSystemDefault = function () {
  // build.gradle pins the system time zone of the test JVM to Europe/Oslo
  t.assertEquals(
    "07.06.2023 | 12:00",
    time.formatDate({ date: UTC_DATE_TIME, pattern: PATTERN_DATE_TIME, timezoneId: "Europe/Nowhere" })
  );
};

exports.testUsesLocaleForNames = function () {
  const pattern = "EEEE d. MMMM yyyy";

  t.assertEquals("onsdag 7. juni 2023", time.formatDate({ date: "2023-06-07", pattern: pattern, locale: "no" }));
  t.assertEquals("Wednesday 7. June 2023", time.formatDate({ date: "2023-06-07", pattern: pattern, locale: "en" }));
};

exports.testMissingLocaleUsesDefault = function () {
  // A numeric pattern gives the same result in every locale
  t.assertEquals("2023-06-07", time.formatDate({ date: "2023-06-07", pattern: PATTERN_DATE, locale: undefined }));
  t.assertEquals("2023-06-07", time.formatDate({ date: "2023-06-07", pattern: PATTERN_DATE, locale: "" }));
};

exports.testFormatsStringWithZoneId = function () {
  t.assertEquals(
    "07.06.2023 | 12:00",
    time.formatDate({ date: "2023-06-07T12:00:00+02:00[Europe/Oslo]", pattern: PATTERN_DATE_TIME })
  );
  t.assertEquals(
    "07.06.2023 | 14:00",
    time.formatDate({
      date: "2023-06-07T10:00:00-04:00[America/New_York]",
      pattern: PATTERN_DATE_TIME,
      timezoneId: "UTC"
    })
  );
};
