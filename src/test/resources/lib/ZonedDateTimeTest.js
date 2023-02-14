const testLib = require("/lib/xp/testing");
const zonedDateTimeLib = require("/lib/time/zoned-date-time");
const ZonedDateTime = zonedDateTimeLib.ZonedDateTime;
const zoneIdLib = require("/lib/time/zone-id");
const ZoneId = zoneIdLib.ZoneId;
const instantLib = require("/lib/time/instant");
const Instant = instantLib.Instant;

exports.testGivenZonedDateTime_testFormatZonedDateTime = function () {
  const zonedDateTime = ZonedDateTime.ofInstant(Instant.parse("2023-02-08T10:15:30.00Z"), ZoneId.systemDefault());
  testLib.assertEquals(zonedDateTime.toString(), "2023-02-08T11:15:30+01:00" + "[" + ZoneId.systemDefault().toString() + "]");
}
