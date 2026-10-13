const t = require("/lib/xp/testing");
const time = require("/lib/time");

// What "/lib/time" exposes, and the module each one can also be required from
const EXPORTS = {
  DayOfWeek: "/lib/time/day-of-week",
  DateTimeFormatter: "/lib/time/format/date-time-formatter",
  FormatStyle: "/lib/time/format/format-style",
  TextStyle: "/lib/time/format/text-style",
  Instant: "/lib/time/instant",
  LocalDate: "/lib/time/local-date",
  LocalDateTime: "/lib/time/local-date-time",
  LocalTime: "/lib/time/local-time",
  Month: "/lib/time/month",
  OffsetDateTime: "/lib/time/offset-date-time",
  OffsetTime: "/lib/time/offset-time",
  LanguageRange: "/lib/time/util",
  Locale: "/lib/time/util",
  Year: "/lib/time/year",
  ZoneId: "/lib/time/zone-id",
  ZoneOffset: "/lib/time/zone-offset",
  ZonedDateTime: "/lib/time/zoned-date-time"
};

exports.testIndexExportsEveryClass = function () {
  Object.keys(EXPORTS).forEach(function (name) {
    t.assertTrue(!!time[name], name + " is not exported from /lib/time");
  });
  t.assertEquals("function", typeof time.formatDate);
};

exports.testClassesCanBeRequiredDirectly = function () {
  Object.keys(EXPORTS).forEach(function (name) {
    const module = require(EXPORTS[name]);
    t.assertTrue(!!module[name], name + " is not exported from " + EXPORTS[name]);
  });
};

exports.testIndexAndModuleExposeTheSameJavaClass = function () {
  t.assertEquals(
    require("/lib/time/local-date").LocalDate.parse("2023-02-08"),
    time.LocalDate.parse("2023-02-08")
  );
  t.assertEquals(require("/lib/time/month").Month.FEBRUARY, time.Month.FEBRUARY);
};
