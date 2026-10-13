import type { ZoneOffset } from "/lib/time";
import type { JavaSet } from "/lib/time/util";

/**
 * A time-zone ID, such as Europe/Paris.
 * @see {@link https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/ZoneId.html}
 */
export const ZoneId = Java.type<ZoneIdConstructor>("java.time.ZoneId");

export interface ZoneIdConstructor {
  SHORT_IDS: Record<string, string>;
  getAvailableZoneIds(): JavaSet<string>;
  of(zoneId: string): ZoneId;
  of(zoneId: string, aliasMap: Record<string, string>): ZoneId;
  ofOffset(prefix: string, offset: ZoneOffset): ZoneId;
  systemDefault(): ZoneId;
}

export interface ZoneId {
  getId(): string;
  normalized(): ZoneId;
  toString(): string;
}
