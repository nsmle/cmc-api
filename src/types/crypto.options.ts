/**
 * All fiat currency options use the standard ISO 8601 currency code.
 * *e.g: `USD` for the US Dollar*
 */
export type CryptoConvert = number | string | number[] | string[];

/**
 * Represents the sorting options for a list of cryptocurrencies.
 * @typedef {("cmc_rank" | "id")} ListSort
 * @property {"cmc_rank"} cmc_rank - Sort by CoinMarketCap rank.
 * @property {"id"} id - Sort by cryptocurrency ID.
 */
export type ListSort = "cmc_rank" | "id";

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

/**
 * Represents a list of auxiliary fields that can be used in the context of crypto options.
 *
 * The `AuxiliaryList` type can be one of the following string literals:
 * - `"platform"`: Represents the platform information.
 * - `"first_historical_data"`: Represents the first historical data available.
 * - `"last_historical_data"`: Represents the last historical data available.
 * - `"is_active"`: Indicates whether the entity is active.
 * - `"status"`: Represents the status information.
 *
 * Additionally, it can be an array of any combination of these string literals.
 */
export type AuxiliaryList =
  | "platform"
  | "first_historical_data"
  | "last_historical_data"
  | "is_active"
  | "status"
  | ("platform" | "first_historical_data" | "last_historical_data" | "is_active" | "status")[];

/**
 * Represents a type for identifying a cryptocurrency.
 *
 * This type is a union of four possible shapes, each representing a different way to identify a cryptocurrency:
 *
 * 1. By `id`:
 *    - `id`: A value must be `string` or array of `number`.
 *    - `slug`, `symbol`, `contract`: Must be `never`.
 *
 * 2. By `slug`:
 *    - `slug`: A value must be `string` or array of `string`.
 *    - `id`, `symbol`, `contract`: Must be `never`.
 *
 * 3. By `symbol`:
 *    - `symbol`: A value must be `string` or array of `string`.
 *    - `id`, `slug`, `contract`: Must be `never`.
 *
 * 4. By `contract`:
 *    - `contract`: A string representing the contract address.
 *    - `id`, `slug`, `symbol`: Must be `never`.
 */
export type CryptoId =
  | { id: CryptoIDs; slug?: never; symbol?: never; contract?: never }
  | { id?: never; slug: CryptoSlugs; symbol?: never; contract?: never }
  | { id?: never; slug?: never; symbol: CryptoSymbols; contract?: never }
  | { id?: never; slug?: never; symbol?: never; contract: string };

/**
 * Represents a type that can have only one of the following properties: `id`, `slug`, or `symbol`.
 *
 * - If `id` is present, `slug` and `symbol` must be `never`.
 * - If `slug` is present, `id` and `symbol` must be `never`.
 * - If `symbol` is present, `id` and `slug` must be `never`.
 *
 * This type is used to uniquely identify a cryptocurrency by one of its identifiers.
 */
export type CryptoIdOnly =
  | { id: CryptoIDs; slug?: never; symbol?: never }
  | { id?: never; slug: CryptoSlugs; symbol?: never }
  | { id?: never; slug?: never; symbol: CryptoSymbols };

/**
 * Represents a type that can have only one of the following properties:
 * - `id`: A numeric identifier for the cryptocurrency.
 * - `slug`: A string identifier for the cryptocurrency.
 * - `symbol`: A string symbol for the cryptocurrency.
 *
 * This type ensures that only one of the properties (`id`, `slug`, or `symbol`) is present at a time.
 */
export type CryptoIdSingleOnly =
  | { id: number; slug?: never; symbol?: never }
  | { id?: never; slug: string; symbol?: never }
  | { id?: never; slug?: never; symbol: string };

/**
 * Represents a type that can either have a `CryptoIDs` type `id` property or a `CryptoSymbols` type `symbol` property, but not both.
 *
 * @typedef {Object} CryptoIdSymbolOnly
 * @property {CryptoIDs} id - The unique identifier for the cryptocurrency. This property is mutually exclusive with `symbol`.
 * @property {CryptoSymbols} symbol - The symbol for the cryptocurrency. This property is mutually exclusive with `id`.
 */
export type CryptoIdSymbolOnly = { id: CryptoIDs; symbol?: never } | { id?: never; symbol: CryptoSymbols };

/**
 * Represents a type for cryptocurrency IDs.
 *
 * This type can be either a single number representing a cryptocurrency ID,
 * or an array of numbers representing multiple cryptocurrency IDs.
 */
export type CryptoIDs = number | number[];

/**
 * Represents the slugs for cryptocurrencies.
 * This type can be a single string or an array of strings.
 */
export type CryptoSlugs = string | string[];

/**
 * Represents the symbols for cryptocurrencies.
 * This type can be either a single symbol as a string or an array of symbols.
 */
export type CryptoSymbols = string | string[];

/**
 * Represents the auxiliary metadata that can be associated with a cryptocurrency.
 *
 * The metadata can be one of the following string values:
 * - `urls`: URLs related to the cryptocurrency.
 * - `logo`: The logo of the cryptocurrency.
 * - `description`: A description of the cryptocurrency.
 * - `tags`: Tags associated with the cryptocurrency.
 * - `platform`: The platform on which the cryptocurrency operates.
 * - `date_added`: The date the cryptocurrency was added.
 * - `notice`: Any notices related to the cryptocurrency.
 * - `status`: The status of the cryptocurrency.
 *
 * Alternatively, it can be an array of any combination of the above string values.
 */
export type AuxiliaryMetadata =
  | "urls"
  | "logo"
  | "description"
  | "tags"
  | "platform"
  | "date_added"
  | "notice"
  | "status"
  | ("urls" | "logo" | "description" | "tags" | "platform" | "date_added" | "notice" | "status")[];

/**
 * Represents the type of cryptocurrency listing.
 * - `all`: Includes all types of cryptocurrencies.
 * - `coins`: Includes only coins.
 * - `tokens`: Includes only tokens.
 */
export type ListingCryptoType = "all" | "coins" | "tokens";

/**
 * Represents the tags that can be used to list cryptocurrencies.
 * - all: Includes all cryptocurrencies.
 * - defi: Includes only decentralized finance (DeFi) cryptocurrencies.
 * - filesharing: Includes only file sharing cryptocurrencies.
 */
export type ListingTag = "all" | "defi" | "filesharing";

/**
 * Defines the sorting direction for a listing.
 * - `asc` Sort in ascending order.
 * - `desc` Sort in descending order.
 */
export type ListingSortDir = "asc" | "desc";

/**
 * Represents the sorting options for cryptocurrency listings.
 *
 * The available sorting options are:
 * - `name`: Sort by the name of the cryptocurrency.
 * - `symbol`: Sort by the symbol of the cryptocurrency.
 * - `date_added`: Sort by the date the cryptocurrency was added.
 * - `market_cap`: Sort by the market capitalization.
 * - `market_cap_strict`: Sort by the strict market capitalization.
 * - `price`: Sort by the price of the cryptocurrency.
 * - `circulating_supply`: Sort by the circulating supply.
 * - `total_supply`: Sort by the total supply.
 * - `max_supply`: Sort by the maximum supply.
 * - `num_market_pairs`: Sort by the number of market pairs.
 * - `volume_24h`: Sort by the 24-hour trading volume.
 * - `percent_change_1h`: Sort by the percentage change in the last hour.
 * - `percent_change_24h`: Sort by the percentage change in the last 24 hours.
 * - `percent_change_7d`: Sort by the percentage change in the last 7 days.
 * - `market_cap_by_total_supply_strict`: Sort by the strict market capitalization by total supply.
 * - `volume_7d`: Sort by the 7-day trading volume.
 * - `volume_30d`: Sort by the 30-day trading volume.
 */
export type ListingSort =
  | "name"
  | "symbol"
  | "date_added"
  | "market_cap"
  | "market_cap_strict"
  | "price"
  | "circulating_supply"
  | "total_supply"
  | "max_supply"
  | "num_market_pairs"
  | "volume_24h"
  | "percent_change_1h"
  | "percent_change_24h"
  | "percent_change_7d"
  | "market_cap_by_total_supply_strict"
  | "volume_7d"
  | "volume_30d";

/**
 * Represents the auxiliary listing options for a cryptocurrency.
 *
 * This type can be a single string value or an array of string values
 * representing various attributes of a cryptocurrency.
 *
 * The possible values are:
 * - `num_market_pairs` Number of market pairs.
 * - `cmc_rank` CoinMarketCap rank.
 * - `date_added` Date when the cryptocurrency was added.
 * - `tags` Tags associated with the cryptocurrency.
 * - `platform` Platform on which the cryptocurrency operates.
 * - `max_supply` Maximum supply of the cryptocurrency.
 * - `circulating_supply` Circulating supply of the cryptocurrency.
 * - `total_supply` Total supply of the cryptocurrency.
 * - `market_cap_by_total_supply` Market cap calculated by total supply.
 * - `volume_24h_reported` Reported 24-hour trading volume.
 * - `volume_7d` 7-day trading volume.
 * - `volume_7d_reported` Reported 7-day trading volume.
 * - `volume_30d` 30-day trading volume.
 * - `volume_30d_reported` Reported 30-day trading volume.
 * - `is_market_cap_included_in_calc` Indicates if market cap is included in the calculation.
 */
export type AuxiliaryListing =
  | "num_market_pairs"
  | "cmc_rank"
  | "date_added"
  | "tags"
  | "platform"
  | "max_supply"
  | "circulating_supply"
  | "total_supply"
  | "market_cap_by_total_supply"
  | "volume_24h_reported"
  | "volume_7d"
  | "volume_7d_reported"
  | "volume_30d"
  | "volume_30d_reported"
  | "is_market_cap_included_in_calc"
  | (
      | "num_market_pairs"
      | "cmc_rank"
      | "date_added"
      | "tags"
      | "platform"
      | "max_supply"
      | "circulating_supply"
      | "total_supply"
      | "market_cap_by_total_supply"
      | "volume_24h_reported"
      | "volume_7d"
      | "volume_7d_reported"
      | "volume_30d"
      | "volume_30d_reported"
      | "is_market_cap_included_in_calc"
    )[];

/**
 * Interface representing the filter options for cryptocurrency listings.
 */
export interface ListingFilter {
  /** The minimum price of the cryptocurrency */
  priceMin?: number;

  /** The maximum price of the cryptocurrency */
  priceMax?: number;

  /** The minimum market capitalization of the cryptocurrency */
  marketCapMin?: number;

  /** The maximum market capitalization of the cryptocurrency */
  marketCapMax?: number;

  /** The minimum 24-hour trading volume of the cryptocurrency */
  volume24hMin?: number;

  /** The maximum 24-hour trading volume of the cryptocurrency */
  volume24hMax?: number;

  /** The minimum circulating supply of the cryptocurrency */
  circulatingSupplyMin?: number;

  /** The maximum circulating supply of the cryptocurrency */
  circulatingsupplyMax?: number;

  /** The minimum 24-hour percentage change in price of the cryptocurrency */
  percentChange24hMin?: number;

  /** The maximum 24-hour percentage change in price of the cryptocurrency */
  percentChange24hMax?: number;
}

/**
 * Represents the sorting options for listing history in the crypto API.
 *
 * The available sorting options are:
 * - `cmc_rank`: Sort by CoinMarketCap rank.
 * - `name`: Sort by the name of the cryptocurrency.
 * - `symbol`: Sort by the symbol of the cryptocurrency.
 * - `market_cap`: Sort by the market capitalization.
 * - `price`: Sort by the price of the cryptocurrency.
 * - `circulating_supply`: Sort by the circulating supply.
 * - `total_supply`: Sort by the total supply.
 * - `max_supply`: Sort by the maximum supply.
 * - `num_market_pairs`: Sort by the number of market pairs.
 * - `volume_24h`: Sort by the 24-hour trading volume.
 * - `percent_change_1h`: Sort by the percentage change in the last hour.
 * - `percent_change_24h`: Sort by the percentage change in the last 24 hours.
 * - `percent_change_7d`: Sort by the percentage change in the last 7 days.
 */
export type ListingHistorySort =
  | "cmc_rank"
  | "name"
  | "symbol"
  | "market_cap"
  | "price"
  | "circulating_supply"
  | "total_supply"
  | "max_supply"
  | "num_market_pairs"
  | "volume_24h"
  | "percent_change_1h"
  | "percent_change_24h"
  | "percent_change_7d";

/**
 * Represents the auxiliary listing history options for a cryptocurrency.
 *
 * This type can be a single string value or an array of string values
 * representing various attributes of the cryptocurrency's listing history.
 *
 * The possible string values are:
 * - `platform`: The platform on which the cryptocurrency is based.
 * - `tags`: Tags associated with the cryptocurrency.
 * - `date_added`: The date the cryptocurrency was added.
 * - `circulating_supply`: The circulating supply of the cryptocurrency.
 * - `total_supply`: The total supply of the cryptocurrency.
 * - `max_supply`: The maximum supply of the cryptocurrency.
 * - `cmc_rank`: The CoinMarketCap rank of the cryptocurrency.
 * - `num_market_pairs`: The number of market pairs available for the cryptocurrency.
 *
 * Alternatively, it can be an array of any combination of these string values.
 */
export type AuxiliaryListingHistory =
  | "platform"
  | "tags"
  | "date_added"
  | "circulating_supply"
  | "total_supply"
  | "max_supply"
  | "cmc_rank"
  | "num_market_pairs"
  | (
      | "platform"
      | "tags"
      | "date_added"
      | "circulating_supply"
      | "total_supply"
      | "max_supply"
      | "cmc_rank"
      | "num_market_pairs"
    )[];

/**
 * Represents the latest auxiliary quotes for a cryptocurrency.
 *
 * This type can be one of the following string literals:
 * - `num_market_pairs` Number of market pairs.
 * - `cmc_rank` CoinMarketCap rank.
 * - `date_added` Date when the cryptocurrency was added.
 * - `tags` Tags associated with the cryptocurrency.
 * - `platform` Platform on which the cryptocurrency operates.
 * - `max_supply` Maximum supply of the cryptocurrency.
 * - `circulating_supply` Circulating supply of the cryptocurrency.
 * - `total_supply` Total supply of the cryptocurrency.
 * - `market_cap_by_total_supply` Market cap calculated by total supply.
 * - `volume_24h_reported` Reported 24-hour trading volume.
 * - `volume_7d` 7-day trading volume.
 * - `volume_7d_reported` Reported 7-day trading volume.
 * - `volume_30d` 30-day trading volume.
 * - `volume_30d_reported` Reported 30-day trading volume.
 * - `is_active` Indicates whether the entity is active.
 * - `is_fiat` Indicates whether the entity is a fiat currency.
 *
 * Alternatively, it can be an array of any of the above string literals.
 */
export type AuxiliaryQuotesLatest =
  | "num_market_pairs"
  | "cmc_rank"
  | "date_added"
  | "tags"
  | "platform"
  | "max_supply"
  | "circulating_supply"
  | "total_supply"
  | "market_cap_by_total_supply"
  | "volume_24h_reported"
  | "volume_7d"
  | "volume_7d_reported"
  | "volume_30d"
  | "volume_30d_reported"
  | "is_active"
  | "is_fiat"
  | (
      | "num_market_pairs"
      | "cmc_rank"
      | "date_added"
      | "tags"
      | "platform"
      | "max_supply"
      | "circulating_supply"
      | "total_supply"
      | "market_cap_by_total_supply"
      | "volume_24h_reported"
      | "volume_7d"
      | "volume_7d_reported"
      | "volume_30d"
      | "volume_30d_reported"
      | "is_active"
      | "is_fiat"
    )[];

/**
 * Represents the possible auxiliary quotes for historical data.
 *
 * This type can be one of the following string literals:
 * - `price` The price of the cryptocurrency.
 * - `volume` The trading volume of the cryptocurrency.
 * - `market_cap` The market capitalization of the cryptocurrency.
 * - `circulating_supply` The circulating supply of the cryptocurrency.
 * - `total_supply` The total supply of the cryptocurrency.
 * - `quote_timestamp` The timestamp of the quote.
 * - `is_active` Indicates whether the entity is active.
 * - `is_fiat` Indicates whether the entity is a fiat currency.
 * - `search_interval` The search interval.
 *
 * Alternatively, it can be an array of any combination of these string literals.
 */
export type AuxiliaryQuotesHistorical =
  | "price"
  | "volume"
  | "market_cap"
  | "circulating_supply"
  | "total_supply"
  | "quote_timestamp"
  | "is_active"
  | "is_fiat"
  | "search_interval"
  | (
      | "price"
      | "volume"
      | "market_cap"
      | "circulating_supply"
      | "total_supply"
      | "quote_timestamp"
      | "is_active"
      | "is_fiat"
      | "search_interval"
    )[];

/**
 * Represents the category of a market pair in the cryptocurrency market.
 * - `all` Includes all market pairs.
 * - `spot` Refers to spot market pairs.
 * - `derivatives` Refers to derivatives market pairs.
 * - `otc` Refers to over-the-counter market pairs.
 * - `perpetual` Refers to perpetual market pairs.
 */
export type MarketPairCategory = "all" | "spot" | "derivatives" | "otc" | "perpetual";

/**
 * Represents the type of fee associated with a market pair.
 * - `all` Includes all types of fees.
 * - `percentage` Refers to market pairs with percentage fees.
 * - `no-fees` Refers to market pairs with no fees.
 * - `transactional-mining` Refers to market pairs with transactional mining fees.
 * - `unknown` Refers to market pairs with unknown fees.
 */
export type MarketPairFeeType = "all" | "percentage" | "no-fees" | "transactional-mining" | "unknown";

/**
 * Represents the sorting options for market pairs.
 * - `volume_24h_strict` Sort by 24-hour volume in strict mode.
 * - `cmc_rank` Sort by CoinMarketCap rank.
 * - `cmc_rank_advanced` Sort by advanced CoinMarketCap rank.
 * - `effective_liquidity` Sort by effective liquidity.
 * - `market_score` Sort by market score.
 * - `market_reputation` Sort by market reputation.
 */
export type MarketPairSort =
  | "volume_24h_strict"
  | "cmc_rank"
  | "cmc_rank_advanced"
  | "effective_liquidity"
  | "market_score"
  | "market_reputation";

/**
 * Represents the auxiliary market pair options.
 *
 * This type can be one of the following string literals:
 * - `num_market_pairs` Number of market pairs.
 * - `category` Category of the market pair.
 * - `fee_type` Type of fee associated with the market pair.
 * - `market_url` URL of the market pair.
 * - `currency_name` Name of the currency.
 * - `currency_slug` Slug of the currency.
 * - `price_quote` Quote price of the currency.
 * - `notice` Notice related to the market pair.
 * - `cmc_rank` CoinMarketCap rank.
 * - `effective_liquidity` Effective liquidity.
 * - `market_score` Market score.
 * - `market_reputation` Market reputation.
 *
 * Alternatively, it can be an array of any combination of these string literals.
 */
export type AuxiliaryMarketPair =
  | "num_market_pairs"
  | "category"
  | "fee_type"
  | "market_url"
  | "currency_name"
  | "currency_slug"
  | "price_quote"
  | "notice"
  | "cmc_rank"
  | "effective_liquidity"
  | "market_score"
  | "market_reputation"
  | (
      | "num_market_pairs"
      | "category"
      | "fee_type"
      | "market_url"
      | "currency_name"
      | "currency_slug"
      | "price_quote"
      | "notice"
      | "cmc_rank"
      | "effective_liquidity"
      | "market_score"
      | "market_reputation"
    )[];

/**
 * Represents a matched crypto option which can be identified either by `id` or `symbol`.
 * - If `id` is provided, `symbol` must be `never`.
 * - If `symbol` is provided, `id` must be `never`.
 * @typedef {Object} Matched
 * @property {CryptoIDs} id - The unique identifier for the cryptocurrency.
 * @property {CryptoSymbols} symbol - The symbol of the cryptocurrency.
 */
export type Matched = { id: CryptoIDs; symbol?: never } | { id?: never; symbol: CryptoSymbols };

/**
 * Represents the available time periods for performance statistics.
 * - `all_time` The entire duration since the inception.
 * - `yesterday` The previous calendar day.
 * - `24h` The last 24 hours.
 * - `7d` The last 7 days.
 * - `30d` The last 30 days.
 * - `90d` The last 90 days.
 * - `365d` The last 365 days.
 */
export type PerformanceStatsTimePeriodOnly = "all_time" | "yesterday" | "24h" | "7d" | "30d" | "90d" | "365d";

/**
 * Represents the time periods for performance statistics.
 * This type can either be a {@link PerformanceStatsTimePeriodOnly} or an array of specific time period in {@link PerformanceStatsTimePeriodOnly}.
 */
export type PerformanceStatsTimePeriod =
  | PerformanceStatsTimePeriodOnly
  | ("all_time" | "yesterday" | "24h" | "7d" | "30d" | "90d" | "365d")[];
