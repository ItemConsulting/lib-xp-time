import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.DynamicContainer.dynamicContainer;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;

import com.enonic.xp.script.ScriptExports;
import com.enonic.xp.testing.ScriptTestSupport;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicContainer;
import org.junit.jupiter.api.TestFactory;

/**
 * Runs every JavaScript test in src/test/resources/tests.
 *
 * Each *Test.js file becomes a group, and each function it exports with a name starting with "test" becomes a test
 * of its own. Nothing has to be registered here: add a file or a function and it is picked up.
 */
public class LibTimeTest extends ScriptTestSupport {

  private static final String TEST_DIR = "/tests";

  @TestFactory
  Stream<DynamicContainer> scripts() throws Exception {
    List<String> scripts;
    try (Stream<Path> files = Files.list(Path.of(getClass().getResource(TEST_DIR).toURI()))) {
      scripts = files.map(file -> file.getFileName().toString()).filter(name -> name.endsWith("Test.js")).sorted().toList();
    }
    // Finding nothing would otherwise pass as a green run with zero tests
    assertFalse(scripts.isEmpty(), "No *Test.js files found in " + TEST_DIR);

    return scripts.stream().map(this::scriptTests);
  }

  private DynamicContainer scriptTests(String script) {
    ScriptExports exports = runScript(TEST_DIR + "/" + script);
    List<String> functions = exports.getValue().getKeys().stream().filter(name -> name.startsWith("test")).sorted().toList();
    assertFalse(functions.isEmpty(), "No test functions exported from " + script);

    return dynamicContainer(script, functions.stream().map(name -> dynamicTest(name, () -> exports.executeMethod(name))));
  }
}
