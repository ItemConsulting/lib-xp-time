import {ZoneOffset} from "/lib/time/ZoneOffset";

/**
 * A time-zone ID, such as Europe/Paris.
 * @see {@link https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/ZoneId.html}
 */
export const ZoneId = Java.type<ZoneIdConstructor>("java.time.ZoneId");

export interface ZoneIdConstructor {
  SHORT_IDS: Map<string, string>;
  getAvailableZoneIds(): Set<string>;
  of(zoneId: string): ZoneId;
  of(zoneId: string, aliasMap: Map<string, string>): ZoneId;
  ofOffset(prefix: string, offset: ZoneOffset): ZoneId;
  systemDefault(): ZoneId;
}

export interface ZoneId {
  getId(): string;
  normalized(): ZoneId;
  toString(): string;
}
