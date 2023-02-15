const testLib = require("/lib/xp/testing");
const offsetTimeLib = require("/lib/time/offset-time");
const OffsetTime = offsetTimeLib.OffsetTime;
const instantLib = require("/lib/time/instant");
const Instant = instantLib.Instant;
const zoneIdLib = require("/lib/time/zone-id");
const ZoneId = zoneIdLib.ZoneId;

exports.testGivenOffsetInstant_testFormatOffsetTime = function () {
  const offsetTime = OffsetTime.ofInstant(Instant.parse("2023-02-08T10:15:30.00Z"), ZoneId.of("GMT+1"));
  testLib.assertEquals(offsetTime.toString(), "11:15:30+01:00");
}
