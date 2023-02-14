import com.enonic.xp.testing.ScriptTestSupport;
import org.junit.Test;

public class DatesServiceTest extends ScriptTestSupport {

  @Test
  public void runDatesTest() {
    runFunction("/lib/DatesTest.js", "testGivenDate_testFormatDate");
  }
  @Test
  public void runLocalDateTest() {
    runFunction("/lib/LocalDateTest.js", "testGivenLocalDate_testFormatLocalDate");
  }
  @Test
  public void runLocalDateTimeTest() {
    runFunction("/lib/LocalDateTimeTest.js", "testGivenLocalDateTime_testFormatLocalDateTime");
    runFunction("/lib/LocalDateTimeTest.js", "testGivenLocalDateTime_testPlusTime");
  }
  @Test
  public void runLocalTimeTest() {
    runFunction("/lib/LocalTimeTest.js", "testGivenLocalTime_testFormatLocalTime");
  }
  @Test
  public void runOffsetDateTimeTest() {
    runFunction("/lib/OffsetDateTimeTest.js", "testGivenOffsetDateTime_testFormatOffsetDateTime");
  }
  @Test
  public void runOffsetTimeTest() {
    runFunction("/lib/OffsetTimeTest.js", "testGivenOffsetInstant_testFormatOffsetTime");
  }
  @Test
  public void runZonedDateTimeTest() {
    runFunction("/lib/ZonedDateTimeTest.js", "testGivenZonedDateTime_testFormatZonedDateTime");
  }
}
