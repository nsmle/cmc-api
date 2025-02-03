/**
 * Represents a key-value pair where the key is of type `TKey` and the value is of type `TVal`.
 *
 * @template {string} TKey - The type of the key. Defaults to `string`.
 * @template {string} TVal - The type of the value. Defaults to `string`.
 */
export type Pair<TKey extends string = string, TVal = string> = {
  [key in TKey]: TVal;
};

export type UnixEpoch = number;
export type Iso8601 = string;
export type Timestamp = string;

export type Interval =
  | "5m"
  | "10m"
  | "15m"
  | "30m"
  | "45m"
  | "1h"
  | "2h"
  | "3h"
  | "4h"
  | "6h"
  | "12h"
  | "24h"
  | "1d"
  | "2d"
  | "3d"
  | "7d"
  | "14d"
  | "15d"
  | "30d"
  | "60d"
  | "90d"
  | "365d"
  | "yearly"
  | "monthly"
  | "weekly"
  | "daily"
  | "hourly";
