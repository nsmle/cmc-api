/**
 * Represents a CEX (Centralized Exchange) identifier which can be specified \
 * either by an `id` or a `slug`, but not both simultaneously.
 *
 * This type is a union of two possible shapes:
 * - An object with an `id` property which can be a number or an array of numbers, and no `slug`.
 * - An object with a `slug` property which can be a string or an array of strings, and no `id`.
 */
export type CexId =
  | { id: string | number | (string | number)[]; slug?: never }
  | { id?: never; slug: string | number | (string | number)[] };

/**
 * Represents the category of a centralized exchange (CEX).
 *
 * This type can be one of the following string literals:
 * - "all": Represents all categories.
 * - "spot": Represents spot trading category.
 * - "derivatives": Represents derivatives trading category.
 * - "dex": Represents decentralized exchange category.
 * - "lending": Represents lending category.
 */
export type CexCategory = "all" | "spot" | "derivatives" | "dex" | "lending";

/**
 * Represents the category of market pairs for a centralized exchange (CEX).
 *
 * This type can be one of the following string literals:
 * - "all": Represents all market pairs.
 * - "spot": Represents spot market pairs.
 * - "derivatives": Represents derivatives market pairs.
 * - "otc": Represents over-the-counter market pairs.
 * - "futures": Represents futures market pairs.
 * - "perpetual": Represents perpetual market pairs.
 */
export type CexCategoryMarketPairs = "all" | "spot" | "derivatives" | "otc" | "futures" | "perpetual";

/**
 * Represents a fiat or cryptocurrency IDs to filter market pairs by.
 *
 * This type is a union of two possible shapes:
 * - An object with an `id` property which can be a number or an array of numbers, and no `symbol`.
 * - An object with a `symbol` property which can be a string or an array of strings, and no `id`.
 */
export type CexMatched = { id: number | number[]; symbol?: never } | { id?: never; symbol: string | string[] };

/**
 * Represents a list of auxiliary data fields for a centralized exchange (CEX).
 *
 * This type can be one of the following string literals:
 * - "first_historical_data": The date of the first historical data available.
 * - "last_historical_data": The date of the last historical data available.
 * - "is_active": Indicates whether the CEX is currently active.
 * - "status": The current status of the CEX.
 *
 * Alternatively, it can be an array of any combination of these string literals.
 */
export type AuxiliaryCexList =
  | "first_historical_data"
  | "last_historical_data"
  | "is_active"
  | "status"
  | ("first_historical_data" | "last_historical_data" | "is_active" | "status")[];

/**
 * Represents a filter for a list of centralized exchanges (CEX).
 *
 * This type is a union of two possible filter objects:
 * - An object with a `cexSlug` property, which can be a string or an array of strings, and no `cryptoId` property.
 * - An object with a `cryptoId` property, which is a number, and no `cexSlug` property.
 */
export type CexListFilter = { cexSlug: string | string[]; cryptoId?: never } | { cexSlug?: never; cryptoId: number };

/**
 * Represents the sorting options for a list of centralized exchanges (CEX).
 *
 * This type can be one of the following string literals:
 * - "volume_24h": Sort by 24-hour trading volume.
 * - "id": Sort by exchange identifier.
 */
export type CexListSort = "volume_24h" | "id";

/**
 * Represents the auxiliary metadata for a centralized exchange (CEX).
 *
 * This type can be one of the following string literals or an array of these literals:
 * - "urls": URLs associated with the CEX.
 * - "logo": Logo of the CEX.
 * - "description": Description of the CEX.
 * - "date_launched": Launch date of the CEX.
 * - "notice": Notices related to the CEX.
 * - "status": Current status of the CEX.
 *
 * Alternatively, it can be an array containing any combination of these string literals.
 */
export type AuxiliaryCexMetadata =
  | "urls"
  | "logo"
  | "description"
  | "date_launched"
  | "notice"
  | "status"
  | ("urls" | "logo" | "description" | "date_launched" | "notice" | "status")[];

/**
 * Represents the type of listing for a centralized exchange (CEX).
 *
 * - "fees": Listings that include fees.
 * - "no_fees": Listings that do not include fees.
 * - "all": All listings, regardless of fees.
 */
export type CexListingType = "fees" | "no_fees" | "all";

/**
 * Represents the sorting options for a CEX (Centralized Exchange) listing.
 *
 * Possible values:
 * - `"name"`: Sort by the name of the exchange.
 * - `"volume_24h"`: Sort by the 24-hour trading volume.
 * - `"volume_24h_adjusted"`: Sort by the adjusted 24-hour trading volume.
 * - `"exchange_score"`: Sort by the exchange score.
 */
export type CexListingSort = "name" | "volume_24h" | "volume_24h_adjusted" | "exchange_score";

/**
 * Represents the auxiliary listing fields for a centralized exchange (CEX).
 *
 * This type can be one of the following string literals:
 * - "num_market_pairs": The number of market pairs available on the exchange.
 * - "traffic_score": The traffic score of the exchange.
 * - "rank": The rank of the exchange.
 * - "exchange_score": The overall score of the exchange.
 * - "effective_liquidity_24h": The effective liquidity of the exchange in the last 24 hours.
 * - "date_launched": The launch date of the exchange.
 * - "fiats": The fiat currencies supported by the exchange.
 *
 * Alternatively, it can be an array of any combination of the above string literals.
 */
export type AuxiliaryCexListing =
  | "num_market_pairs"
  | "traffic_score"
  | "rank"
  | "exchange_score"
  | "effective_liquidity_24h"
  | "date_launched"
  | "fiats"
  | (
      | "num_market_pairs"
      | "traffic_score"
      | "rank"
      | "exchange_score"
      | "effective_liquidity_24h"
      | "date_launched"
      | "fiats"
    )[];

/**
 * Represents the auxiliary market pairs for a centralized exchange (CEX).
 *
 * This type can be one of the following string literals:
 * - "num_market_pairs": The number of market pairs.
 * - "category": The category of the market.
 * - "fee_type": The type of fee associated with the market.
 * - "market_url": The URL of the market.
 * - "currency_name": The name of the currency.
 * - "currency_slug": The slug (URL-friendly name) of the currency.
 * - "price_quote": The quoted price of the currency.
 * - "effective_liquidity": The effective liquidity of the market.
 * - "market_score": The score of the market.
 * - "market_reputation": The reputation of the market.
 *
 * Alternatively, it can be an array of any combination of the above string literals.
 */
export type AuxiliaryCexMarketPairs =
  | "num_market_pairs"
  | "category"
  | "fee_type"
  | "market_url"
  | "currency_name"
  | "currency_slug"
  | "price_quote"
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
      | "effective_liquidity"
      | "market_score"
      | "market_reputation"
    )[];

/**
 * Represents the different types of fees that can be associated with market pairs on a centralized exchange (CEX).
 *
 * This type can be one of the following string literals:
 * - "all": Indicates that all types of fees are applicable.
 * - "percentage": Indicates that fees are charged as a percentage of the transaction amount.
 * - "no-fees": Indicates that there are no fees associated with the market pair.
 * - "transactional-mining": Indicates that fees are associated with transactional mining.
 * - "unknown": Indicates that the fee type is unknown.
 */
export type CexMarketPairsFeeType = "all" | "percentage" | "no-fees" | "transactional-mining" | "unknown";

/**
 * Represents auxiliary quotes for a centralized exchange (CEX).
 *
 * This type can be one of the following string literals:
 * - "num_market_pairs": The number of market pairs available on the exchange.
 * - "traffic_score": A score representing the traffic on the exchange.
 * - "rank": The rank of the exchange.
 * - "exchange_score": A score representing the overall performance of the exchange.
 * - "liquidity_score": A score representing the liquidity available on the exchange.
 * - "effective_liquidity_24h": The effective liquidity over the past 24 hours.
 *
 * Alternatively, it can be an array of any combination of the above string literals.
 */
export type AuxiliaryCexQuotes =
  | "num_market_pairs"
  | "traffic_score"
  | "rank"
  | "exchange_score"
  | "liquidity_score"
  | "effective_liquidity_24h"
  | (
      | "num_market_pairs"
      | "traffic_score"
      | "rank"
      | "exchange_score"
      | "liquidity_score"
      | "effective_liquidity_24h"
    )[];
