/**
 * A Locale object represents a specific geographical, political, or cultural region.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Locale.html}
 */
export const Locale = Java.type<LocaleConstructor>("java.util.Locale");

export interface LocaleConstructor {
  new (language: string): Locale;
}

export interface Locale {
  getSubLocale(): string;
}
