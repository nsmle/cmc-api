export type SortType = "cmc_rank" | "id";
export type ListingStatus = "active" | "inactive" | "untracked" | ("active" | "inactive" | "untracked")[];

/**
 * List of available auxiliary options in list method.
 */
export type AuxiliaryList =
  | "platform"
  | "first_historical_data"
  | "last_historical_data"
  | "is_active"
  | "status"
  | ("platform" | "first_historical_data" | "last_historical_data" | "is_active" | "status")[];

export enum AuxiliaryInfo {
  Urls = "urls",
  Logo = "logo",
  Description = "description",
  Tags = "tags",
  Platform = "platform",
  DateAdded = "date_added",
  Notice = "notice",
  Status = "status",
}
