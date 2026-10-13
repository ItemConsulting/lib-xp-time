const t = require("/lib/xp/testing");
const time = require("/lib/time");
const Locale = time.Locale;
const LanguageRange = time.LanguageRange;

const norwegian = new Locale("no");
const britishEnglish = new Locale("en", "GB");

exports.testCreate = function () {
  t.assertEquals("no", norwegian.getLanguage());
  t.assertEquals("", norwegian.getCountry());
  t.assertEquals("no", norwegian.toString());

  t.assertEquals("en", britishEnglish.getLanguage());
  t.assertEquals("GB", britishEnglish.getCountry());
  t.assertEquals("en_GB", britishEnglish.toString());
  t.assertEquals("en-GB", britishEnglish.toLanguageTag());

  t.assertEquals("POSIX", new Locale("en", "US", "POSIX").getVariant());
};

exports.testForLanguageTag = function () {
  const bokmaal = Locale.forLanguageTag("nb-NO");

  t.assertEquals("nb", bokmaal.getLanguage());
  t.assertEquals("NO", bokmaal.getCountry());
  t.assertEquals("nb-NO", bokmaal.toLanguageTag());
  t.assertEquals(britishEnglish, Locale.forLanguageTag("en-GB"));
};

exports.testConstants = function () {
  t.assertEquals("en-GB", Locale.UK.toLanguageTag());
  t.assertEquals("en-US", Locale.US.toLanguageTag());
  t.assertEquals("en", Locale.ENGLISH.toLanguageTag());
  t.assertEquals("fr-FR", Locale.FRANCE.toLanguageTag());
  t.assertEquals("de", Locale.GERMAN.toLanguageTag());
  t.assertEquals("", Locale.ROOT.toString());
  t.assertEquals(britishEnglish, Locale.UK);
};

exports.testIsoCodes = function () {
  t.assertEquals("nor", norwegian.getISO3Language());
  t.assertEquals("GBR", britishEnglish.getISO3Country());
  t.assertTrue(contains(Locale.getISOCountries(), "NO"));
  t.assertTrue(contains(Locale.getISOLanguages(), "no"));
  t.assertFalse(contains(Locale.getISOCountries(), "XX"));
};

exports.testDisplayNames = function () {
  t.assertEquals("English (United Kingdom)", britishEnglish.getDisplayName(Locale.ENGLISH));
  t.assertEquals("anglais (Royaume-Uni)", britishEnglish.getDisplayName(Locale.FRANCE));
};

exports.testExtensions = function () {
  t.assertFalse(britishEnglish.hasExtensions());

  const withExtension = Locale.forLanguageTag("en-GB-u-ca-buddhist");
  t.assertTrue(withExtension.hasExtensions());
  t.assertEquals("buddhist", withExtension.getUnicodeLocaleType("ca"));
  t.assertEquals(britishEnglish, withExtension.stripExtensions());
};

exports.testDefault = function () {
  const original = Locale.getDefault();

  try {
    Locale.setDefault(Locale.FRANCE);
    t.assertEquals(Locale.FRANCE, Locale.getDefault());
  } finally {
    Locale.setDefault(original);
  }
  t.assertEquals(original, Locale.getDefault());
};

exports.testLanguageRange = function () {
  const range = new LanguageRange("en-GB", 0.5);

  // Ranges are stored in lower case
  t.assertEquals("en-gb", range.getRange());
  t.assertEquals(0.5, range.getWeight());
  t.assertEquals(1, new LanguageRange("nb").getWeight());
  t.assertEquals(1, LanguageRange.MAX_WEIGHT);
  t.assertEquals(0, LanguageRange.MIN_WEIGHT);
};

exports.testParseAcceptLanguageHeader = function () {
  // French and English have no equivalent language tags, which parse() would otherwise add to the list
  const ranges = LanguageRange.parse("fr-CH,fr;q=0.9,en;q=0.8");

  t.assertEquals(3, ranges.size());
  t.assertEquals("fr-ch", ranges.get(0).getRange());
  t.assertEquals(1, ranges.get(0).getWeight());
  t.assertEquals("fr", ranges.get(1).getRange());
  t.assertEquals(0.9, ranges.get(1).getWeight());
  t.assertEquals("en", ranges.get(2).getRange());
  t.assertEquals(0.8, ranges.get(2).getWeight());
};

exports.testParsedListReadsLikeAnArray = function () {
  const ranges = LanguageRange.parse("fr,en;q=0.8");
  const seen = [];

  ranges.forEach(function (range) {
    seen.push(range.getRange());
  });

  t.assertEquals(2, ranges.length);
  t.assertEquals("fr", ranges[0].getRange());
  t.assertEquals("fr,en", seen.join(","));
  t.assertFalse(ranges.isEmpty());
};

exports.testParseSortsByWeight = function () {
  const ranges = LanguageRange.parse("en;q=0.5,fr;q=0.9");

  t.assertEquals("fr", ranges.get(0).getRange());
  t.assertEquals("en", ranges.get(1).getRange());
};

exports.testLookupBestMatchingLanguage = function () {
  const ranges = LanguageRange.parse("nb-NO,nb;q=0.9,en;q=0.8");

  // "nb-NO" falls back to "nb", which is preferred over "en"
  t.assertEquals("nb", Locale.lookupTag(ranges, ["en", "nb"]));
  t.assertEquals("en", Locale.lookupTag(ranges, ["en", "de"]));
  t.assertEquals(null, Locale.lookupTag(ranges, ["de", "fr"]));
  t.assertEquals(
    Locale.forLanguageTag("nb"),
    Locale.lookup(ranges, [Locale.ENGLISH, Locale.forLanguageTag("nb")])
  );
};

exports.testFilter = function () {
  const ranges = LanguageRange.parse("en");
  const tags = Locale.filterTags(ranges, ["en-GB", "nb", "en-US"]);

  t.assertEquals(2, tags.size());
  t.assertEquals("en-GB", tags.get(0));
  t.assertEquals("en-US", tags.get(1));
  t.assertEquals(1, Locale.filter(ranges, [Locale.UK, Locale.FRANCE]).size());
};

function contains(javaArray, value) {
  for (var i = 0; i < javaArray.length; i++) {
    if (javaArray[i] === value) {
      return true;
    }
  }
  return false;
}
