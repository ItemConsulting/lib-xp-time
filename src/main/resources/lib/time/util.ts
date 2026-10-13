/**
 * A Locale object represents a specific geographical, political, or cultural region.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Locale.html}
 */
export const Locale = Java.type<LocaleConstructor>("java.util.Locale");

/**
 * A LanguageRange can be used to parse `req.headers["Accept-Language"]` to determine the best matching language.
 */
export const LanguageRange = Java.type<LanguageRangeConstructor>("java.util.Locale.LanguageRange");

/**
 * A `java.util.List` returned from Java. It can be read by index and looped over like an array, but it is not a
 * JavaScript array: methods such as `map()` and `filter()` are not available on every script engine.
 */
export interface JavaList<T> {
  readonly [index: number]: T;
  readonly length: number;
  forEach(callback: (value: T) => void): void;
  contains(value: T): boolean;
  get(index: number): T;
  isEmpty(): boolean;
  size(): number;
}

/**
 * A `java.util.Set` returned from Java. It has no order, so it can not be read by index.
 */
export interface JavaSet<T> {
  forEach(callback: (value: T) => void): void;
  contains(value: T): boolean;
  isEmpty(): boolean;
  size(): number;
}

/**
 * Where Java takes a list of language ranges, both a JavaScript array and the list from `LanguageRange.parse()` work.
 */
export type LanguagePriorityList = LanguageRange[] | JavaList<LanguageRange>;

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
  filter(priorityList: LanguagePriorityList, locales: Locale[]): JavaList<Locale>;
  filterTags(priorityList: LanguagePriorityList, tags: string[]): JavaList<string>;
  forLanguageTag(languageTag: string): Locale;
  getAvailableLocales(): Locale[];
  getDefault(): Locale;
  getISOCountries(): string[];
  getISOLanguages(): string[];
  lookup(priorityList: LanguagePriorityList, locales: Locale[]): Locale | null;
  lookupTag(priorityList: LanguagePriorityList, tags: string[]): string | null;
  setDefault(newLocale: Locale): void;
}

export interface Locale {
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
  mapEquivalents(priorityList: LanguagePriorityList, map: Record<string, string[]>): JavaList<LanguageRange>;
  parse(ranges: string): JavaList<LanguageRange>;
  parse(ranges: string, map: Record<string, string[]>): JavaList<LanguageRange>;
}

export interface LanguageRange {
  getRange(): string;
  getWeight(): number;
}
