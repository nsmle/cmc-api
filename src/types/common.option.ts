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

export type Convert = number | string | number[] | string[];
export type SortDir = "asc" | "desc";

/**
 * Represents the listing status of a cryptocurrency.
 *
 * The status can be one of the following string values:
 * - `active`: The cryptocurrency is currently active.
 * - `inactive`: The cryptocurrency is currently inactive.
 * - `untracked`: The cryptocurrency is not being tracked.
 *
 * Alternatively, it can be an array of these string values.
 */
export type ListingStatus = "active" | "inactive" | "untracked" | ("active" | "inactive" | "untracked")[];
