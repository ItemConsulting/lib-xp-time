/**
 * Enumeration of the style of text formatting and parsing.
 *
 * Text styles define three sizes for the formatted text - 'full', 'short' and 'narrow'. Each of these three sizes is available in both 'standard' and 'stand-alone' variations.
 *
 * The difference between the three sizes is obvious in most languages. For example, in English the 'full' month is 'January', the 'short' month is 'Jan' and the 'narrow' month is 'J'. Note that the narrow size is often not unique. For example, 'January', 'June' and 'July' all have the 'narrow' text 'J'.
 *
 * The difference between the 'standard' and 'stand-alone' forms is trickier to describe as there is no difference in English. However, in other languages there is a difference in the word used when the text is used alone, as opposed to in a complete date. For example, the word used for a month when used alone in a date picker is different to the word used for month in association with a day and year in a date.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/TextStyle.html}
 */
export const TextStyle = Java.type<TextStyleConstructor>("java.time.format.TextStyle");

export interface TextStyleConstructor {
  FULL: TextStyle;
  FULL_STANDALONE: TextStyle;
  NARROW: TextStyle;
  NARROW_STANDALONE: TextStyle;
  SHORT: TextStyle;
  SHORT_STANDALONE: TextStyle;

  valueOf(name: string): TextStyle;
  values(): TextStyle[];
}

export interface TextStyle {
  asNormal(): TextStyle;
  asStandalone(): TextStyle;
  isStandalone(): boolean;
}
