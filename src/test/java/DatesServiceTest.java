import com.enonic.xp.testing.ScriptTestSupport;
import org.junit.Test;

public class DatesServiceTest extends ScriptTestSupport {

  private static String DATES_TEST_PATH = "/lib/DatesTest.js";
  private static String LOCAL_DATE_TIME_TEST_PATH = "/lib/LocalDateTimeTest.js";
  private static String LOCAL_TIME_TEST_PATH = "/lib/LocalTimeTest.js";
  private static String LOCAL_DATE_TEST_PATH = "/lib/LocalDateTest.js";
  private static String OFFSET_DATE_TIME_TEST_PATH = "/lib/OffsetDateTimeTest.js";
  private static String OFFSET_TIME_TEST_PATH = "/lib/OffsetTimeTest.js";
  private static String ZONED_DATE_TIME_TEST_PATH = "/lib/ZonedDateTimeTest.js";
  private static String ZONE_OFFSET_TEST_PATH = "/lib/ZoneOffsetTest.js";

  @Test
  public void runDatesTest() {
    runFunction(DATES_TEST_PATH, "testGivenDate_testFormatDate");
  }
  @Test
  public void runLocalDateTest() {
    runFunction(LOCAL_DATE_TEST_PATH, "testGivenLocalDate_testFormatLocalDate");
    runFunction(LOCAL_DATE_TEST_PATH, "testGivenLocalDate_testPlusDate");
    runFunction(LOCAL_DATE_TEST_PATH, "testGivenLocalDate_testMinusDate");
    runFunction(LOCAL_DATE_TEST_PATH, "testGivenLocalDate_testDate");
  }
  @Test
  public void runLocalDateTimeTest() {
    runFunction(LOCAL_DATE_TIME_TEST_PATH, "testGivenLocalDateTime_testFormatLocalDateTime");
    runFunction(LOCAL_DATE_TIME_TEST_PATH, "testGivenLocalDateTime_testPlusTime");
    runFunction(LOCAL_DATE_TIME_TEST_PATH, "testGivenLocalDateTime_testMinusTime");
    runFunction(LOCAL_DATE_TIME_TEST_PATH, "testGivenLocalDateTime_testTime");
  }
  @Test
  public void runLocalTimeTest() {
    runFunction(LOCAL_TIME_TEST_PATH, "testGivenLocalTime_testFormatLocalTime");
    runFunction(LOCAL_TIME_TEST_PATH, "testGivenLocalTime_testPlusTime");
    runFunction(LOCAL_TIME_TEST_PATH, "testGivenLocalTime_testMinusTime");
    runFunction(LOCAL_TIME_TEST_PATH, "testGivenLocalTime_testTime");
  }
  @Test
  public void runOffsetDateTimeTest() {
    runFunction(OFFSET_DATE_TIME_TEST_PATH, "testGivenOffsetDateTime_testFormatOffsetDateTime");
    runFunction(OFFSET_DATE_TIME_TEST_PATH, "testGivenOffsetDateTime_testPlusTime");
    runFunction(OFFSET_DATE_TIME_TEST_PATH, "testGivenOffsetDateTime_testMinusTime");
    runFunction(OFFSET_DATE_TIME_TEST_PATH, "testGivenOffsetDateTime_testTime");
    runFunction(OFFSET_DATE_TIME_TEST_PATH, "testGivenOffsetDateTime_testWithTime");
    runFunction(OFFSET_DATE_TIME_TEST_PATH, "testGivenOffsetDateTime_testGetTime");
    runFunction(OFFSET_DATE_TIME_TEST_PATH, "testGivenOffsetDateTime_testTimeConversion");
  }
  @Test
  public void runOffsetTimeTest() {
    runFunction(OFFSET_TIME_TEST_PATH, "testGivenOffsetInstant_testFormatOffsetTime");
    runFunction(OFFSET_TIME_TEST_PATH, "testGivenOffsetTime_testPlusTime");
    runFunction(OFFSET_TIME_TEST_PATH, "testGivenOffsetTime_testMinusTime");
    runFunction(OFFSET_TIME_TEST_PATH, "testGivenOffsetTime_testGetTime");
    runFunction(OFFSET_TIME_TEST_PATH, "testGivenOffsetTime_testWithTime");
    runFunction(OFFSET_TIME_TEST_PATH, "testGivenOffsetTime_testTimeConversion");
  }
  @Test
  public void runZonedDateTimeTest() {
    runFunction(ZONED_DATE_TIME_TEST_PATH, "testGivenZonedDateTime_testFormatZonedDateTime");
    runFunction(ZONED_DATE_TIME_TEST_PATH, "testGivenZonedDateTime_testPlusTime");
    runFunction(ZONED_DATE_TIME_TEST_PATH, "testGivenZonedDateTime_testMinusTime");
    runFunction(ZONED_DATE_TIME_TEST_PATH, "testGivenZonedDateTime_testWithTime");
    runFunction(ZONED_DATE_TIME_TEST_PATH, "testGivenZonedDateTime_testGetTime");
    runFunction(ZONED_DATE_TIME_TEST_PATH, "testGivenZonedDateTime_testTimeConversion");
  }
  @Test
  public void runZoneOffsetTest() {
    runFunction(ZONE_OFFSET_TEST_PATH, "testZoneOffset");
  }
}
