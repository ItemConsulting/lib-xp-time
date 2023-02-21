const testLib = require("/lib/xp/testing");
const zonedDateTimeLib = require("/lib/time/zone-offset");
const ZoneOffset = zonedDateTimeLib.ZoneOffset;

const ZONE_OFFSET = "+01:00";
const zoneOffset = ZoneOffset.of(ZONE_OFFSET);

exports.testZoneOffset = function() {
  const zoneOffset2 = ZoneOffset.ofTotalSeconds(10000);
  testLib.assertEquals(zoneOffset2, ZoneOffset.of("+02:46:40"));
  const id = zoneOffset.getId();
  const totalSeconds = zoneOffset.getTotalSeconds();
  const compareTo = zoneOffset2.compareTo(zoneOffset);
  testLib.assertEquals(id, "+01:00");
  testLib.assertEquals(totalSeconds, 3600);
  testLib.assertTrue(compareTo === -6400);
}
