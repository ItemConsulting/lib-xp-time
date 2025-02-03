/**
 * A Locale object represents a specific geographical, political, or cultural region.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Locale.html}
 */
export const Locale = Java.type<LocaleConstructor>("java.util.Locale");

/**
 * A LanguageRange can be used to parse `req.headers["Accept-Language"]` to determine the best matching language.
 */
export const LanguageRange = Java.type<LanguageRangeConstructor>("java.util.Locale.LanguageRange");

export interface LocaleConstructor {
  new (language: string, country?: string, variant?: string): Locale;
  CANADA: Locale;
  CANADA_FRENCH: Locale;
  CHINA: Locale;
  CHINESE: Locale;
  ENGLISH: Locale;
  FRANCE: Locale;
  GERMAN: Locale;
  GERMANY: Locale;
  ITALIAN: Locale;
  ITALY: Locale;
  JAPAN: Locale;
  KOREA: Locale;
  KOREAN: Locale;
  PRC: Locale;
  PRIVATE_USE_EXTENSION: Locale;
  ROOT: Locale;
  SIMPLIFIED_CHINESE: Locale;
  TAIWAN: Locale;
  TRADITIONAL_CHINESE: Locale;
  UK: Locale;
  UNICODE_LOCALE_EXTENSION: Locale;
  US: Locale;
  filter(priorityList: LanguageRange[], locales: Locale[]): Locale[];
  filterTags(priorityList: LanguageRange[], tags: string[]): Locale[];
  forLanguageTag(languageTag: string): Locale;
  getAvailableLocales(): Locale[];
  getDefault(): Locale;
  getISOCountries(): string[];
  getISOLanguages(): string[];
  lookup(priorityList: LanguageRange[], locales: Locale[]): Locale;
  lookupTag(priorityList: LanguageRange[], tags: string[]): Locale;
  setDefault(newLocale: Locale): void;
}

export interface Locale {
  getSubLocale(): string;
  getCountry(): string;
  getDisplayCountry(): string;
  getDisplayLanguage(): string;
  getDisplayName(): string;
  getDisplayName(inLocale: Locale): string;
  getDisplayScript(): string;
  getDisplayScript(inLocale: Locale): string;
  getDisplayVariant(): string;
  getDisplayVariant(inLocale: Locale): string;
  getExtension(key: string): string;
  getExtensionKeys(): unknown;
  getISO3Country(): string;
  getISO3Language(): string;
  getLanguage(): string;
  getScript(): string;
  getUnicodeLocaleAttributes(): unknown;
  getUnicodeLocaleKeys(): unknown;
  getUnicodeLocaleType(key: string): string;
  getVariant(): string;
  hasExtensions(): boolean;
  stripExtensions(): Locale;
  toLanguageTag(): string;
  toString(): string;
  hashCode(): number;
}

interface LanguageRangeConstructor {
  new (range: string, weight?: number): LanguageRange;
  MAX_WEIGHT: number;
  MIN_WEIGHT: number;
  mapEquivalents(priorityList: LanguageRange[], map: Record<string, string[]>): LanguageRange[];
  parse(ranges: string): LanguageRange[];
  parse(ranges: string, map: Record<string, string[]>): LanguageRange[];
}

export interface LanguageRange {
  getRange(): string;
  getWeight(): number;
}
