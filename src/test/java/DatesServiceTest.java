import com.enonic.xp.testing.ScriptTestSupport;
import org.junit.Test;

public class DatesServiceTest extends ScriptTestSupport {

  private static String TEST_PATH_DATES = "/lib/DatesTest.js";
  private static String TEST_PATH_LOCAL_DATE_TIME = "/lib/LocalDateTimeTest.js";
  private static String TEST_PATH_LOCAL_TIME = "/lib/LocalTimeTest.js";
  private static String TEST_PATH_LOCAL_DATE = "/lib/LocalDateTest.js";
  private static String TEST_PATH_OFFSET_DATE_TIME = "/lib/OffsetDateTimeTest.js";
  private static String TEST_PATH_OFFSET_TIME = "/lib/OffsetTimeTest.js";
  private static String TEST_PATH_ZONED_DATE_TIME = "/lib/ZonedDateTimeTest.js";
  private static String TEST_PATH_ZONE_OFFSET = "/lib/ZoneOffsetTest.js";

  @Test
  public void runDatesTest() {
    runFunction(TEST_PATH_DATES, "testGivenDate_testFormatDate");
  }
  @Test
  public void runLocalDateTest() {
    runFunction(TEST_PATH_LOCAL_DATE, "testGivenLocalDate_testFormatLocalDate");
    runFunction(TEST_PATH_LOCAL_DATE, "testGivenLocalDate_testPlusDate");
    runFunction(TEST_PATH_LOCAL_DATE, "testGivenLocalDate_testMinusDate");
    runFunction(TEST_PATH_LOCAL_DATE, "testGivenLocalDate_testDate");
  }
  @Test
  public void runLocalDateTimeTest() {
    runFunction(TEST_PATH_LOCAL_DATE_TIME, "testGivenLocalDateTime_testFormatLocalDateTime");
    runFunction(TEST_PATH_LOCAL_DATE_TIME, "testGivenLocalDateTime_testPlusTime");
    runFunction(TEST_PATH_LOCAL_DATE_TIME, "testGivenLocalDateTime_testMinusTime");
    runFunction(TEST_PATH_LOCAL_DATE_TIME, "testGivenLocalDateTime_testTime");
  }
  @Test
  public void runLocalTimeTest() {
    runFunction(TEST_PATH_LOCAL_TIME, "testGivenLocalTime_testFormatLocalTime");
    runFunction(TEST_PATH_LOCAL_TIME, "testGivenLocalTime_testPlusTime");
    runFunction(TEST_PATH_LOCAL_TIME, "testGivenLocalTime_testMinusTime");
    runFunction(TEST_PATH_LOCAL_TIME, "testGivenLocalTime_testTime");
  }
  @Test
  public void runOffsetDateTimeTest() {
    runFunction(TEST_PATH_OFFSET_DATE_TIME, "testGivenOffsetDateTime_testFormatOffsetDateTime");
    runFunction(TEST_PATH_OFFSET_DATE_TIME, "testGivenOffsetDateTime_testPlusTime");
    runFunction(TEST_PATH_OFFSET_DATE_TIME, "testGivenOffsetDateTime_testMinusTime");
    runFunction(TEST_PATH_OFFSET_DATE_TIME, "testGivenOffsetDateTime_testTime");
    runFunction(TEST_PATH_OFFSET_DATE_TIME, "testGivenOffsetDateTime_testWithTime");
    runFunction(TEST_PATH_OFFSET_DATE_TIME, "testGivenOffsetDateTime_testGetTime");
    runFunction(TEST_PATH_OFFSET_DATE_TIME, "testGivenOffsetDateTime_testTimeConversion");
  }
  @Test
  public void runOffsetTimeTest() {
    runFunction(TEST_PATH_OFFSET_TIME, "testGivenOffsetInstant_testFormatOffsetTime");
    runFunction(TEST_PATH_OFFSET_TIME, "testGivenOffsetTime_testPlusTime");
    runFunction(TEST_PATH_OFFSET_TIME, "testGivenOffsetTime_testMinusTime");
    runFunction(TEST_PATH_OFFSET_TIME, "testGivenOffsetTime_testGetTime");
    runFunction(TEST_PATH_OFFSET_TIME, "testGivenOffsetTime_testWithTime");
    runFunction(TEST_PATH_OFFSET_TIME, "testGivenOffsetTime_testTimeConversion");
  }
  @Test
  public void runZonedDateTimeTest() {
    runFunction(TEST_PATH_ZONED_DATE_TIME, "testGivenZonedDateTime_testFormatZonedDateTime");
    runFunction(TEST_PATH_ZONED_DATE_TIME, "testGivenZonedDateTime_testPlusTime");
    runFunction(TEST_PATH_ZONED_DATE_TIME, "testGivenZonedDateTime_testMinusTime");
    runFunction(TEST_PATH_ZONED_DATE_TIME, "testGivenZonedDateTime_testWithTime");
    runFunction(TEST_PATH_ZONED_DATE_TIME, "testGivenZonedDateTime_testGetTime");
    runFunction(TEST_PATH_ZONED_DATE_TIME, "testGivenZonedDateTime_testTimeConversion");
  }
  @Test
  public void runZoneOffsetTest() {
    runFunction(TEST_PATH_ZONE_OFFSET, "testZoneOffset");
  }
}
