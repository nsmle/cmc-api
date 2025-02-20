/**
 * The Dex identifier which can be either an `id` or a `slug`.
 *
 * *This type is a union of two possible shapes:*
 * - *An object with an `id` property which can be a number or an array of numbers, and no `slug`.*
 * - *An object with a `slug` property which can be a string or an array of strings, and no `id`.*
 *
 * @example import dex id type
 * ```typescript
 * import type { DexId } from "cmc-api";
 * ```
 *
 * @example using a id
 * ```typescript
 * const dexById: DexId = { id: 1348 };
 * ```
 *
 * @example using a slug
 * ```typescript
 * const dexBySlug: DexId = { slug: 'uniswap-v3' };
 * ```
 *
 * @example using an array of ids
 * ```typescript
 * const dexByIds: DexId = { id: [1348, 6707] };
 * ```
 *
 * @example using an array of slugs
 * ```typescript
 * const dexBySlugs: DexId = { slug: ['uniswap-v3', 'pancakeswap-v3-eth'] };
 * ```
 */
export type DexId = { id: number | number[]; slug?: never } | { id?: never; slug: string | string[] };

/**
 * The decentralized exchange (DEX) network identifier.
 *
 * *This type can be one of the following*:
 * - *An object with an `id` property, which can be a number or array of number, and no `slug` property.*
 * - *An object with a `slug` property, which can be a string or array of string, and no `id` property.*
 *
 * @example import dex network type
 * ```typescript
 * import type { DexNetwork } from "cmc-api";
 * ```
 *
 * @example dex network with id
 * ```typescript
 * const dexNetworkWithId: DexNetwork = { id: '1' };
 * ```
 *
 * @example dex network with slug
 * ```typescript
 * const dexNetworkWithSlug: DexNetwork = { slug: 'ethereum' };
 * ```
 */
export type DexNetwork = { id: number | number[]; slug?: never } | { id?: never; slug: string | string[] };

/**
 * The base asset in a decentralized exchange (DEX).
 *
 * *This type can be one of the following*:
 * - *An object with an `id` property, which can be a number or array of number, and no `symbol`, `ucid`, or `contract` property.*
 * - *An object with a `symbol` property, which can be a string or array of string, and no `id`, `ucid`, or `contract` property.*
 * - *An object with a `ucid` property, which can be a number or array of number, and no `id`, `symbol`, or `contract` property.*
 * - *An object with a `contract` property, which can be a string, and no `id`, `symbol`, or `ucid` property.*
 *
 * @example import dex base asset type
 * ```typescript
 * import type { DexBaseAsset } from "cmc-api";
 * ```
 *
 * @example using an id
 * ```typescript
 * const baseAssetById: DexBaseAsset = { id: 11840 };
 * ```
 *
 * @example using a symbol
 * ```typescript
 * const baseAssetBySymbol: DexBaseAsset = { symbol: 'OP' };
 * ```
 *
 * @example using a ucid
 * ```typescript
 * const baseAssetByUcid: DexBaseAsset = { ucid: 11840 };
 * ```
 *
 * @example using a contract
 * ```typescript
 * const baseAssetByContract: DexBaseAsset = { contract: '0x4200000000000000000000000000000000000042' };
 * ```
 */
export type DexBaseAsset =
  | { id: number | number[]; symbol?: never; ucid?: never; contract?: never } // id
  | { id?: never; symbol: string | string[]; ucid?: never; contract?: never } // symbol
  | { id?: never; symbol?: never; ucid: number | number[]; contract?: never } // ucid
  | { id?: never; symbol?: never; ucid?: never; contract: string }; // contract

/**
 * The quote asset in a decentralized exchange (DEX). \
 * *This type is an alias for `DexBaseAsset`.*
 * @see {@link DexBaseAsset}
 */
export type DexQuoteAsset = DexBaseAsset;

/**
 * The sorting options for a list of decentralized exchanges (DEX).
 * @property {"id"} - Sort by the unique identifier of the DEX.
 * @property {"name"} - Sort by the name of the DEX.
 */
export type DexListSort = "id" | "name";

/**
 * The list of auxiliary DEX (Decentralized Exchange) options.
 *
 * The list can contain the following string values:
 * - `"alternativeName"`: *An alternative name for the DEX.*
 * - `"cryptocurrencyId"`: *The ID of the cryptocurrency.*
 * - `"cryptocurrenySlug"`: *The slug of the cryptocurrency (Note: This might be a typo of `"cryptocurrencySlug"`).*
 * - `"wrappedTokenId"`: *The ID of the wrapped token.*
 * - `"wrappedTokenSlug"`: *The slug of the wrapped token.*
 * - `"tokenExplorerUrl"`: *The URL to explore the token.*
 * - `"poolExplorerUrl"`: *The URL to explore the pool.*
 * - `"transactionHashUrl"`: *The URL to explore the transaction hash.*
 *
 * The type can also be an array of the above string values.
 */
export type AuxiliaryDexList =
  | "alternativeName"
  | "cryptocurrencyId"
  | "cryptocurrenySlug" /** Maybe typo of "cryptocurrencySlug" */
  | "wrappedTokenId"
  | "wrappedTokenSlug"
  | "tokenExplorerUrl"
  | "poolExplorerUrl"
  | "transactionHashUrl"
  | (
      | "alternativeName"
      | "cryptocurrencyId"
      | "cryptocurrenySlug" /** Maybe typo of "cryptocurrencySlug" */
      | "wrappedTokenId"
      | "wrappedTokenSlug"
      | "tokenExplorerUrl"
      | "poolExplorerUrl"
      | "transactionHashUrl"
    )[];

/**
 * The auxiliary metadata for a decentralized exchange (DEX). \
 * *This type can be a single metadata key or an array of metadata keys.*
 *
 * The possible metadata keys are:
 * - `"urls"`: *URLs related to the DEX.*
 * - `"logo"`: *The logo of the DEX.*
 * - `"description"`: *A description of the DEX.*
 * - `"date_launched"`: *The launch date of the DEX.*
 * - `"notice"`: *Any notices related to the DEX.*
 */
export type AuxiliaryDexMetadata =
  | "urls"
  | "logo"
  | "description"
  | "date_launched"
  | "notice"
  | ("urls" | "logo" | "description" | "date_launched" | "notice")[];

/**
 * The type of a decentralized exchange (DEX) listing.
 *
 * This type can be one of the following string literals:
 * - `"all"`: *Represents all types of DEX listings.*
 * - `"orderbook"`: *Represents DEX listings that use an order book.*
 * - `"swap"`: *Represents DEX listings that use a swap mechanism.*
 * - `"aggregator"`: *Represents DEX listings that aggregate multiple sources.*
 *
 * Additionally, it can be an array of any combination of the above string literals.
 */
export type DexListingType =
  | "all"
  | "orderbook"
  | "swap"
  | "aggregator"
  | ("all" | "orderbook" | "swap" | "aggregator")[];

/**
 * The sorting options for a decentralized exchange (DEX) listing.
 *
 * The sorting can be based on one of the following criteria:
 * - `"name"`: *Sort by the name of the DEX.*
 * - `"volume_24h"`: *Sort by the 24-hour trading volume.*
 * - `"market_share"`: *Sort by the market share.*
 * - `"num_markets"`: *Sort by the number of markets.*
 *
 * Additionally, it can be an array of the above criteria to allow for multiple sorting options.
 */
export type DexListingSort =
  | "name"
  | "volume_24h"
  | "market_share"
  | "num_markets"
  | ("name" | "volume_24h" | "market_share" | "num_markets")[];

/**
 * The auxiliary listing options for a decentralized exchange (DEX).
 * This type can either be a single string value `"date_launched"` or an array of such strings.
 */
export type AuxiliaryDexListing = "date_launched" | string[];

/**
 * The various auxiliary quotes available for a decentralized exchange (DEX).
 *
 * The `AuxiliaryDexQuotes` type can be one of the following string literals or an array of these string literals:
 * - `"pool_created"`: *Indicates when the pool was created.*
 * - `"percent_pooled_base_asset"`: *The percentage of the base asset that is pooled.*
 * - `"num_transactions_24h"`: *The number of transactions in the last 24 hours.*
 * - `"pool_base_asset"`: *The base asset in the pool.*
 * - `"pool_quote_asset"`: *The quote asset in the pool.*
 * - `"24h_volume_quote_asset"`: *The 24-hour volume of the quote asset.*
 * - `"total_supply_quote_asset"`: *The total supply of the quote asset.*
 * - `"total_supply_base_asset"`: *The total supply of the base asset.*
 * - `"holders"`: *The number of holders.*
 * - `"buy_tax"`: *The buy tax rate.*
 * - `"sell_tax"`: *The sell tax rate.*
 * - `"security_scan"`: *The result of a security scan.*
 * - `"24h_no_of_buys"`: *The number of buys in the last 24 hours.*
 * - `"24h_no_of_sells"`: *The number of sells in the last 24 hours.*
 * - `"24h_buy_volume"`: *The buy volume in the last 24 hours.*
 * - `"24h_sell_volume"`: *The sell volume in the last 24 hours.*
 */
export type AuxiliaryDexQuotes =
  | "pool_created"
  | "percent_pooled_base_asset"
  | "num_transactions_24h"
  | "pool_base_asset"
  | "pool_quote_asset"
  | "24h_volume_quote_asset"
  | "total_supply_quote_asset"
  | "total_supply_base_asset"
  | "holders"
  | "buy_tax"
  | "sell_tax"
  | "security_scan"
  | "24h_no_of_buys"
  | "24h_no_of_sells"
  | "24h_buy_volume"
  | "24h_sell_volume"
  | (
      | "pool_created"
      | "percent_pooled_base_asset"
      | "num_transactions_24h"
      | "pool_base_asset"
      | "pool_quote_asset"
      | "24h_volume_quote_asset"
      | "total_supply_quote_asset"
      | "total_supply_base_asset"
      | "holders"
      | "buy_tax"
      | "sell_tax"
      | "security_scan"
      | "24h_no_of_buys"
      | "24h_no_of_sells"
      | "24h_buy_volume"
      | "24h_sell_volume"
    )[];

/**
 * The auxiliary fields data for DEX trades. \
 * *Additionally, it can be an array of any combination of the above string literals.*
 *
 * This type can be one of the following:
 * - `"transaction_hash"`: *A string representing the transaction hash*.
 * - `"blockchain_explorer_link"`: *A string representing the link to the blockchain explorer*.
 */
export type AuxiliaryDexTrades =
  | "transaction_hash"
  | "blockchain_explorer_link"
  | ("transaction_hash" | "blockchain_explorer_link")[];

/**
 * The filter options for querying DEX pairs.
 */
export interface DexPairsFilter {
  /**
   * After your initial query, the API responds with the initial set of results and a `scrollId`. \
   * *To retrieve the next set of results, provide this `scrollId` of the last JSON with your follow-up request.* \
   * *`scrollId` is an alternative to traditional pagination techniques.*
   */
  scrollId?: string;

  /**
   * The number of results to return. \
   * *Use this parameter and the start parameter to determine your own pagination size.*
   */
  limit?: number;

  /**
   * A threshold of minimum liquidity to filter results by. \
   * *must be in range: `[ 0 .. 100000000000000000 ]`*
   */
  liquidityMin?: number;

  /**
   * A threshold of maximum liquidity to filter results by. \
   * *must be in range: `[ 0 .. 100000000000000000 ]`*
   */
  liquidityMax?: number;

  /**
   * A threshold of minimum 24 hour USD volume to filter results by. \
   * *must be in range: `[ 0 .. 100000000000000000 ]`*
   */
  volume24hMin?: number;

  /**
   * A threshold of maximum 24 hour USD volume to filter results by. \
   * *must be in range: `[ 0 .. 100000000000000000 ]`*
   */
  volume24hMax?: number;

  /**
   * A threshold of minimum 24h no. of transactions to filter results by. \
   * *must be in range: `[ 0 .. 100000000000000000 ]`*
   */
  noOfTransactions24hMin?: number;

  /** A threshold of maximum 24h no. of transactions to filter results by. \
   * *must be in range: `[ 0 .. 100000000000000000 ]`*
   */
  noOfTransactions24hMax?: number;

  /**
   * A threshold of minimum 24 hour percent change to filter results by. \
   * *must be: `>= -100`*
   */
  percentChange24hMin?: number;

  /**
   * A threshold of maximum 24 hour percent change to filter results by. \
   * *must be: `>= -100`*
   */
  percentChange24hMax?: number;
}

/**
 * The sorting options available for DEX pairs.
 *
 * The available options are:
 * - `"name"`: *Sort by the name of the DEX pair.*
 * - `"date_added"`: *Sort by the date the DEX pair was added.*
 * - `"price"`: *Sort by the price of the DEX pair.*
 * - `"volume_24h"`: *Sort by the 24-hour trading volume of the DEX pair.*
 * - `"percent_change_1h"`: *Sort by the 1-hour percentage change of the DEX pair.*
 * - `"percent_change_24h"`: *Sort by the 24-hour percentage change of the DEX pair.*
 * - `"liquidity"`: *Sort by the liquidity of the DEX pair.*
 * - `"fully_diluted_value"`: *Sort by the fully diluted value of the DEX pair.*
 * - `"no_of_transactions_24h"`: *Sort by the number of transactions in the last 24 hours of the DEX pair.*
 */
export type DexPairsSort =
  | "name"
  | "date_added"
  | "price"
  | "volume_24h"
  | "percent_change_1h"
  | "percent_change_24h"
  | "liquidity"
  | "fully_diluted_value"
  | "no_of_transactions_24h";

/**
 * The various auxiliary data points for decentralized exchange (DEX) pairs.
 *
 * Possible values:
 * - `"pool_created"`: *Indicates the creation of the pool.*
 * - `"percent_pooled_base_asset"`: *The percentage of the base asset pooled.*
 * - `"num_transactions_24h"`: *The number of transactions in the last 24 hours.*
 * - `"pool_base_asset"`: *The amount of the base asset in the pool.*
 * - `"pool_quote_asset"`: *The amount of the quote asset in the pool.*
 * - `"24h_volume_quote_asset"`: *The 24-hour trading volume of the quote asset.*
 * - `"total_supply_quote_asset"`: *The total supply of the quote asset.*
 * - `"total_supply_base_asset"`: *The total supply of the base asset.*
 * - `"holders"`: *The number of holders of the asset.*
 * - `"buy_tax"`: *The tax applied on buying the asset.*
 * - `"sell_tax"`: *The tax applied on selling the asset.*
 * - `"security_scan"`: *The results of the security scan.*
 * - `"24h_no_of_buys"`: *The number of buys in the last 24 hours.*
 * - `"24h_no_of_sells"`: *The number of sells in the last 24 hours.*
 * - `"24h_buy_volume"`: *The volume of buys in the last 24 hours.*
 * - `"24h_sell_volume"`: *The volume of sells in the last 24 hours.*
 *
 * Additionally, it can be an array of any combination of the above string literals.
 */
export type AuxiliaryDexPairs =
  | "pool_created"
  | "percent_pooled_base_asset"
  | "num_transactions_24h"
  | "pool_base_asset"
  | "pool_quote_asset"
  | "24h_volume_quote_asset"
  | "total_supply_quote_asset"
  | "total_supply_base_asset"
  | "holders"
  | "buy_tax"
  | "sell_tax"
  | "security_scan"
  | "24h_no_of_buys"
  | "24h_no_of_sells"
  | "24h_buy_volume"
  | "24h_sell_volume"
  | (
      | "pool_created"
      | "percent_pooled_base_asset"
      | "num_transactions_24h"
      | "pool_base_asset"
      | "pool_quote_asset"
      | "24h_volume_quote_asset"
      | "total_supply_quote_asset"
      | "total_supply_base_asset"
      | "holders"
      | "buy_tax"
      | "sell_tax"
      | "security_scan"
      | "24h_no_of_buys"
      | "24h_no_of_sells"
      | "24h_buy_volume"
      | "24h_sell_volume"
    )[];

/**
 * Represents auxiliary data for a decentralized exchange (DEX) OHLCV (Open, High, Low, Close, Volume). \
 * *This type can be a single string value or an array of string values.*
 *
 * Possible values include:
 * - `"pool_created"`: *Indicates when the pool was created.*
 * - `"percent_pooled_base_asset"`: *Percentage of the base asset pooled.*
 * - `"num_transactions_24h"`: *Number of transactions in the last 24 hours.*
 * - `"pool_base_asset"`: *The base asset in the pool.*
 * - `"pool_quote_asset"`: *The quote asset in the pool.*
 * - `"24h_volume_quote_asset"`: *24-hour volume of the quote asset.*
 * - `"total_supply_quote_asset"`: *Total supply of the quote asset.*
 * - `"total_supply_base_asset"`: *Total supply of the base asset.*
 * - `"holders"`: *Number of holders.*
 * - `"buy_tax"`: *Tax applied on buys.*
 * - `"sell_tax"`: *Tax applied on sells.*
 * - `"security_scan"`: *Security scan information.*
 * - `"24h_no_of_buys"`: *Number of buys in the last 24 hours.*
 * - `"24h_no_of_sells"`: *Number of sells in the last 24 hours.*
 * - `"24h_buy_volume"`: *Buy volume in the last 24 hours.*
 * - `"24h_sell_volume"`: *Sell volume in the last 24 hours.*
 */
export type AuxiliaryDexOhlcv =
  | "pool_created"
  | "percent_pooled_base_asset"
  | "num_transactions_24h"
  | "pool_base_asset"
  | "pool_quote_asset"
  | "24h_volume_quote_asset"
  | "total_supply_quote_asset"
  | "total_supply_base_asset"
  | "holders"
  | "buy_tax"
  | "sell_tax"
  | "security_scan"
  | "24h_no_of_buys"
  | "24h_no_of_sells"
  | "24h_buy_volume"
  | "24h_sell_volume"
  | (
      | "pool_created"
      | "percent_pooled_base_asset"
      | "num_transactions_24h"
      | "pool_base_asset"
      | "pool_quote_asset"
      | "24h_volume_quote_asset"
      | "total_supply_quote_asset"
      | "total_supply_base_asset"
      | "holders"
      | "buy_tax"
      | "sell_tax"
      | "security_scan"
      | "24h_no_of_buys"
      | "24h_no_of_sells"
      | "24h_buy_volume"
      | "24h_sell_volume"
    )[];

/**
 * The time period for historical OHLCV (Open, High, Low, Close, Volume) data for a decentralized exchange (DEX).
 *
 * The available time periods are:
 * - `"daily"`: *Daily time period.*
 * - `"hourly"`: *Hourly time period.*
 * - `"1m"`: *1 minute time period.*
 * - `"5m"`: *5 minutes time period.*
 * - `"15m"`: *15 minutes time period.*
 * - `"30m"`: *30 minutes time period.*
 * - `"4h"`: *4 hours time period.*
 * - `"8h"`: *8 hours time period.*
 * - `"12h"`: *12 hours time period.*
 * - `"weekly"`: *Weekly time period.*
 * - `"monthly"`: *Monthly time period.*
 */
export type DexOhlcvHistoricalTimePeriod =
  | "daily"
  | "hourly"
  | "1m"
  | "5m"
  | "15m"
  | "30m"
  | "4h"
  | "8h"
  | "12h"
  | "weekly"
  | "monthly";

/**
 * The intervals for historical OHLCV (Open, High, Low, Close, Volume) data for a decentralized exchange (DEX).
 *
 * The available intervals are:
 * - `"1m"`: *1 minute*
 * - `"5m"`: *5 minutes*
 * - `"15m"`: *15 minutes*
 * - `"30m"`: *30 minutes*
 * - `"1h"`: *1 hour*
 * - `"4h"`: *4 hours*
 * - `"8h"`: *8 hours*
 * - `"12h"`: *12 hours*
 * - `"daily"`: *1 day*
 * - `"weekly"`: *1 week*
 * - `"monthly"`: *1 month*
 */
export type DexOhlcvHistoricalInterval =
  | "1m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "4h"
  | "8h"
  | "12h"
  | "daily"
  | "weekly"
  | "monthly";

/**
 * The historical OHLCV (Open, High, Low, Close, Volume) data for a decentralized exchange (DEX). \
 * *This type can be a single string value or an array of string values representing various historical metrics.*
 *
 * Possible values:
 * - `"pool_created"`: *Indicates when the pool was created.*
 * - `"percent_pooled_base_asset"`: *The percentage of the base asset pooled.*
 * - `"num_transactions_24h"`: *The number of transactions in the last 24 hours.*
 * - `"pool_base_asset"`: *The base asset in the pool.*
 * - `"pool_quote_asset"`: *The quote asset in the pool.*
 * - `"24h_volume_quote_asset"`: *The 24-hour volume of the quote asset.*
 * - `"total_supply_quote_asset"`: *The total supply of the quote asset.*
 * - `"total_supply_base_asset"`: *The total supply of the base asset.*
 * - `"holders"`: *The number of holders.*
 * - `"buy_tax"`: *The buy tax percentage.*
 * - `"sell_tax"`: *The sell tax percentage.*
 * - `"security_scan"`: *The result of a security scan.*
 * - `"24h_no_of_buys"`: *The number of buys in the last 24 hours.*
 * - `"24h_no_of_sells"`: *The number of sells in the last 24 hours.*
 * - `"24h_buy_volume"`: *The buy volume in the last 24 hours.*
 * - `"24h_sell_volume"`: *The sell volume in the last 24 hours.*
 */
export type AuxiliaryDexOhlcvHistorical =
  | "pool_created"
  | "percent_pooled_base_asset"
  | "num_transactions_24h"
  | "pool_base_asset"
  | "pool_quote_asset"
  | "24h_volume_quote_asset"
  | "total_supply_quote_asset"
  | "total_supply_base_asset"
  | "holders"
  | "buy_tax"
  | "sell_tax"
  | "security_scan"
  | "24h_no_of_buys"
  | "24h_no_of_sells"
  | "24h_buy_volume"
  | "24h_sell_volume"
  | (
      | "pool_created"
      | "percent_pooled_base_asset"
      | "num_transactions_24h"
      | "pool_base_asset"
      | "pool_quote_asset"
      | "24h_volume_quote_asset"
      | "total_supply_quote_asset"
      | "total_supply_base_asset"
      | "holders"
      | "buy_tax"
      | "sell_tax"
      | "security_scan"
      | "24h_no_of_buys"
      | "24h_no_of_sells"
      | "24h_buy_volume"
      | "24h_sell_volume"
    )[];
