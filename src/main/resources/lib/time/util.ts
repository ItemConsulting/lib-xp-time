/**
 * A Locale object represents a specific geographical, political, or cultural region.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Locale.html}
 */
export const Locale = Java.type<LocaleConstructor>("java.util.Locale");

export interface LocaleConstructor {
  new (language: string): Locale;
  new (language: string, country: string): Locale;
  new (language: string, country: string, variant: string): Locale;
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
  forLanguageTag(languageTag: string): Locale;
  getAvailableLocales(): Locale[];
  getDefault(): Locale;
  getISOCountries(): string[];
  getISOLanguages(): string[];
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
