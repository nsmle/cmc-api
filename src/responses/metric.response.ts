import type { Timestamp } from "@option/common.option";

/**
 * The response object market quote of the CoinMarketCap Global Metrics API.
 * @see {@link Timestamp}
 */
export interface MetricGlobalQuote {
  /**
   * The sum of all individual cryptocurrency market capitalizations in the requested currency.
   */
  total_market_cap: number;

  /**
   * The sum of all individual cryptocurrency market capitalizations in the requested currency yesterday.
   */
  total_market_cap_yesterday: number;

  /**
   * The sum of all individual cryptocurrency market capitalizations in the requested currency 24 hours percentage change.
   */
  total_market_cap_yesterday_percentage_change: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all cryptocurrencies in the requested currency.
   */
  total_volume_24h: number;

  /**
   * The sum of rolling 24 hour reported volume for all cryptocurrencies in the requested currency.
   */
  total_volume_24h_reported: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all cryptocurrencies in the requested currency yesterday.
   */
  total_volume_24h_yesterday: number;

  /**
   * The sum of rolling 24 hour reported volume for all cryptocurrencies in the requested currency yesterday percentage change.
   */
  total_volume_24h_yesterday_percentage_change: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all cryptocurrencies excluding Bitcoin in the requested currency.
   */
  altcoin_volume_24h: number;

  /**
   * The sum of rolling 24 hour reported volume for all cryptocurrencies excluding Bitcoin in the requested currency.
   */
  altcoin_volume_24h_reported: number;

  /**
   * The sum of all individual cryptocurrency market capitalizations excluding Bitcoin in the requested currency.
   */
  altcoin_market_cap: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all defi cryptocurrencies in the requested currency.
   */
  defi_volume_24h: number;

  /**
   * The sum of rolling 24 hour reported volume for all defi cryptocurrencies in the requested currency yesterday.
   */
  defi_volume_24h_reported: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all defi cryptocurrencies in the requested currency yesterday percentage change.
   */
  defi_24h_percentage_change: number;

  /**
   * The sum of all individual defi cryptocurrency market capitalizations in the requested currency.
   */
  defi_market_cap: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all stablecoins in the requested currency.
   */
  stablecoin_volume_24h: number;

  /**
   * The sum of rolling 24 hour reported volume for all stablecoins in the requested currency.
   */
  stablecoin_volume_24h_reported: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all stablecoins in the requested currency yesterday.
   */
  stablecoin_24h_percentage_change: number;

  /**
   * The sum of all individual stablecoin market capitalizations in the requested currency.
   */
  stablecoin_market_cap: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all derivatives in the requested currency.
   */
  derivatives_volume_24h: number;

  /**
   * The sum of rolling 24 hour reported volume for all derivatives in the requested currency.
   */
  derivatives_volume_24h_reported: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all derivatives in the requested currency yesterday.
   */
  derivatives_24h_percentage_change: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced.
   */
  last_updated: Timestamp;
}

/**
 * The response object for the CoinMarketCap Global Quotes Metrics API.
 * @see {@link MetricGlobalQuote}
 * @template TQuoteKey The quote currency key.
 * @template TQuoteValue The quote currency value.
 */
export interface MetricGlobalQuotes<TQuoteKey extends string = "USD", TQuoteValue extends object = MetricGlobalQuote> {
  /**
   * Bitcoin's market dominance percentage by market cap.
   */
  btc_dominance: number;

  /**
   * Bitcoin's market dominance percentage by market cap yesterday percentage change.
   */
  btc_dominance_yesterday: number;

  /**
   * Bitcoin's market dominance percentage by market cap 24 hours percentage change.
   */
  btc_dominance_24h_percentage_change: number;

  /**
   * Ethereum's market dominance percentage by market cap.
   */
  eth_dominance: number;

  /**
   * Ethereum's market dominance percentage by market cap yesterday percentage change.
   */
  eth_dominance_yesterday: number;

  /**
   * Ethereum's market dominance percentage by market cap 24 hours percentage change.
   */
  eth_dominance_24h_percentage_change: number;

  /**
   * Count of active cryptocurrencies tracked by CoinMarketCap. \
   * *This includes all cryptocurrencies with a listing_status of `"active"` or `"listed"` as returned from cmc {@link CexRepository.list} call.*
   */
  active_cryptocurrencies: number;

  /**
   * Count of all cryptocurrencies tracked by CoinMarketCap. \
   * *This includes `"inactive"` listing_status cryptocurrencies.*
   */
  total_cryptocurrencies: number;

  /**
   * Count of active market pairs tracked by CoinMarketCap across all exchanges.
   */
  active_market_pairs: number;

  /**
   * Count of active exchanges tracked by CoinMarketCap. \
   * *This includes all exchanges with a listing_status of `"active"` or `"listed"` as returned by cmc {@link CexRepository.list} call.*
   */
  active_exchanges: number;

  /**
   * Count of all exchanges tracked by CoinMarketCap. \
   * *This includes `"inactive"` listing_status exchanges.*
   */
  total_exchanges: number;

  /**
   * Defi volume 24h. \
   * *This is the sum of all trading volume on decentralized exchanges tracked by CoinMarketCap in the last 24 hours.*
   */
  defi_volume_24h: number;

  /**
   * Defi volume 24h reported.
   */
  defi_volume_24h_reported: number;

  /**
   * Defi market cap.
   */
  defi_market_cap: number;

  /**
   * Defi 24h percentage change.
   */
  defi_24h_percentage_change: number;

  /**
   * Stablecoin volume 24h. \
   * *This is the sum of all trading volume on stablecoins tracked by CoinMarketCap in the last 24 hours.*
   */
  stablecoin_volume_24h: number;

  /**
   * Stablecoin volume 24h reported.
   */
  stablecoin_volume_24h_reported: number;

  /**
   * Stablecoin market cap.
   */
  stablecoin_market_cap: number;

  /**
   * Stablecoin 24h percentage change.
   */
  stablecoin_24h_percentage_change: number;

  /**
   * Derivatives volume 24h. \
   * *This is the sum of all trading volume on derivatives tracked by CoinMarketCap in the last 24 hours.*
   */
  derivatives_volume_24h: number;

  /**
   * Derivatives volume 24h reported.
   */
  derivatives_volume_24h_reported: number;

  /**
   * Derivatives market cap.
   */
  derivatives_24h_percentage_change: number;

  /**
   * Timestamp of when this record was last updated.
   */
  last_updated: Timestamp;

  /**
   * A map of market quotes in different currency conversions. \
   * *The default map included is `USD`.*
   */
  quote: Record<TQuoteKey, TQuoteValue>;
}

/**
 * The response object for the CoinMarketCap Global Quotes Metrics API.
 * @see {@link MetricGlobalQuote}
 * @see {@link MetricGlobalQuotes}
 * @template TQuoteKey The quote currency key.
 * @template TQuoteValue The quote currency value.
 */
export type MetricGlobalQuotesResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = MetricGlobalQuote,
> = MetricGlobalQuotes<TQuoteKey, TQuoteValue>;

/**
 * The response object for the CoinMarketCap Global Quotes Historical Metrics API.
 * @see {@link Timestamp}
 */
export interface MetricGlobalQuoteHistorical {
  /**
   * The sum of all individual cryptocurrency market capitalizations at the given point in time, historically converted into units of the requested currency.
   */
  total_market_cap: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all cryptocurrencies at the given point in time, historically converted into units of the requested currency.
   */
  total_volume_24h: number;

  /**
   * The sum of rolling 24 hour reported volume for all cryptocurrencies at the given point in time, historically converted into units of the requested currency. \
   * ***Note**: This field is only available after `2019-05-10` and will return null prior to that time.*
   */
  total_volume_24h_reported: number;

  /**
   * The sum of rolling 24 hour adjusted volume for all cryptocurrencies excluding Bitcoin at the given point in time, historically converted into units of the requested currency.
   */
  altcoin_market_cap: number;

  /**
   * The sum of all individual cryptocurrency market capitalizations excluding Bitcoin at the given point in time, historically converted into units of the requested currency.
   */
  altcoin_volume_24h: number;

  /**
   * The sum of rolling 24 hour reported volume for all cryptocurrencies excluding Bitcoin at the given point in time, historically converted into units of the requested currency. \
   * ***Note**: This field is only available after `2019-05-10` and will return null prior to that time.*
   */
  altcoin_volume_24h_reported: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion.
   */
  timestamp: Timestamp;
}

/**
 * The response object for the CoinMarketCap Global Quotes Historical Metrics API.
 * @see {@link MetricGlobalQuoteHistorical}
 */
export interface MetricGlobalQuotesHistorical<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = MetricGlobalQuoteHistorical,
> {
  /**
   * Timestamp (ISO 8601) of when this historical quote was recorded.
   */
  timestamp: Timestamp;

  /**
   * The interval timestamp for the search period that this historical quote was located against.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  search_interval?: Timestamp;

  /**
   * Percent of BTC market dominance by marketcap at this interval.
   */
  btc_dominance: number;

  /**
   * Percent of ETH market dominance by marketcap at this interval.
   */
  eth_dominance: number;

  /**
   * Number of active cryptocurrencies tracked by CoinMarketCap at the given point in time. \
   * *This includes all cryptocurrencies with a listing_status of `"active"` or `"untracked"` as returned from our {@link CexRepository.list} call.* \
   * ***Note**: This field is only available after `2019-05-10` and will return `null` prior to that time.*
   */
  active_cryptocurrencies: number | null;

  /**
   * Number of active exchanges tracked by CoinMarketCap at the given point in time. \
   * *This includes all cryptocurrencies with a listing_status of `"active"` or `"untracked"` as returned from our {@link CexRepository.list} call.* \
   * ***Note**: This field is only available after `2019-06-18` and will return `null` prior to that time.*
   */
  active_exchanges: number;

  /**
   * Number of active market pairs tracked by CoinMarketCap across all exchanges at the given point in time. \
   * ***Note**: This field is only available after `2019-05-10` and will return `null` prior to that time.*
   */
  active_market_pairs: number;

  /**
   * An object containing market data for this interval by currency option. \
   * *The default currency mapped is `USD`.*
   */
  quote: Record<TQuoteKey, TQuoteValue>;
}

/**
 * The response for the CoinMarketCap Global Quotes Historical Metrics API.
 * @see {@link MetricGlobalQuoteHistorical}
 * @see {@link MetricGlobalQuotesHistorical}
 * @template TQuoteKey The quote currency key.
 * @template TQuoteValue The quote currency value.
 * @template TQuotes The quote currency object.
 */
export type MetricGlobalQuotesHistoricalResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = MetricGlobalQuoteHistorical,
  TQuotes extends object = MetricGlobalQuotesHistorical<TQuoteKey, TQuoteValue>,
> = {
  quotes: TQuotes[];
};

/**
 * The detailing of constituents and their weightage CoinMarketCap 100 Index
 */
export interface Metric100IndexConstituents {
  /**
   * The unique CoinMarketCap ID for this cryptocurrency.
   */
  id: number;

  /**
   * The name of this cryptocurrency.
   */
  name: string;

  /**
   * The ticker symbol for this cryptocurrency.
   */
  symbol: string;

  /**
   * The URL of the detail page on CoinMarketCap for this cryptocurrency.
   */
  url: string;

  /**
   * The relative proportion of this constituent within the index expressed as a percentage.
   */
  weight: number;
}

/**
 * The latest CoinMarketCap 100 Index value.
 * @template TConstituents The type of constituents.
 * @see {@link Metric100IndexConstituents}
 * @see {@link Timestamp}
 */
export interface Metric100IndexLatest<TConstituents extends object = Metric100IndexConstituents> {
  /**
   * Timestamp (ISO 8601) of the last time this record was updated.
   */
  last_update: Timestamp;

  /**
   * Timestamp (ISO 8601) of the next time this record will be updated.
   */
  next_update: Timestamp;

  /**
   * Current value of CoinMarketCap 100 Index.
   */
  value: number;

  /**
   * Percentage change of the CoinMarketCap 100 Index over the past 24h.
   */
  value_24h_percentage_change: number;

  /**
   * Array detailing the list of constituents and their weightage.
   */
  constituents: TConstituents[];
}

/**
 * The response for the latest CoinMarketCap 100 Index value.
 * @template TConstituents The type of constituents.
 * @see {@link Metric100IndexLatest}
 * @see {@link Metric100IndexConstituents}
 */
export type Metric100IndexLatestResponse<TConstituents extends object = Metric100IndexConstituents> =
  Metric100IndexLatest<TConstituents>;

/**
 * The historical CoinMarketCap 100 Index value.
 * @template TConstituents The type of constituents.
 * @see {@link Metric100IndexConstituents}
 * @see {@link Timestamp}
 */
export interface Metric100IndexHistorical<TConstituents extends object = Metric100IndexConstituents> {
  /**
   * Array detailing the list of constituents and their weightage.
   */
  constituents: TConstituents[];

  /**
   * Value of CoinMarketCap 100 Index.
   */
  value: number;

  /**
   * Timestamp (ISO 8601) of the time this record was updated.
   */
  update_time: Timestamp;
}

/**
 * The response for the historical CoinMarketCap 100 Index value.
 * @template TConstituents The type of constituents.
 * @see {@link Metric100IndexHistorical}
 * @see {@link Metric100IndexConstituents}
 */
export type Metric100IndexHistoricalResponse<TConstituents extends object = Metric100IndexConstituents> =
  Metric100IndexHistorical<TConstituents>[];

/**
 * The latest CMC Fear and Greed value.
 * @see {@link Timestamp}
 */
export interface MetricFearAndGreed {
  /**
   * The value of CMC Fear and Greed.
   * value is a **integer [ `0` *..* `100` ]**. \
   * *When the value is closer to `0`, the market is in `Extreme Fear`, and investors have over-sold irrationally.* \
   * *When the value is closer to `100`, the market is in `Extreme Greed`, indicating a likely market correction.*
   */
  value: number;

  /**
   * The value classication of CMC Fear and Greed.
   *
   * `1`  *≤* **x** *<* `20`  : **Extreme Fear** \
   * `20` *≤* **x** *<* `40`  : **Fear** \
   * `40` *≤* **x** *<* `60`  : **Neutral** \
   * `60` *≤* **x** *<* `80`  : **Greed** \
   * `80` *≤* **x** *≤* `100` : **Extreme Greed**
   */
  value_classification: "Extreme Fear" | "Fear" | "Neutral" | "Greed" | "Extreme Greed";
}

/**
 * The response for the latest CMC Fear and Greed value.
 * @see {@link MetricFearAndGreed}
 * @see {@link Timestamp}
 */
export interface MetricFearAndGreedLatest extends MetricFearAndGreed {
  /**
   * Timestamp (ISO 8601) of the last time this record was updated.
   */
  update_time: Timestamp;
}

/**
 * The response for the latest CMC Fear and Greed value.
 * @see {@link MetricFearAndGreedLatest}
 */
export type MetricFearAndGreedLatestResponse = MetricFearAndGreedLatest;

/**
 * The response for the historical CMC Fear and Greed value.
 * @see {@link MetricFearAndGreed}
 * @see {@link Timestamp}
 */
export interface MetricFearAndGreedHistorical extends MetricFearAndGreed {
  /**
   * Timestamp of when this historical quote was recorded.
   */
  timestamp: Timestamp;
}

/**
 * The response for the historical CMC Fear and Greed value.
 * @see {@link MetricFearAndGreedHistorical}
 */
export type MetricFearAndGreedHistoricalResponse = MetricFearAndGreedHistorical[];

/**
 * A blockchain object for every blockchain that matched list options.
 * @see {@link Timestamp}
 */
export interface MetricBlockchainStats {
  /**
   * The unique CoinMarketCap ID for this blockchain's cryptocurrency.
   */
  id: number;

  /**
   * The web URL friendly shorthand version of the cryptocurrency's name.
   */
  slug: string;

  /**
   * The ticker symbol for the cryptocurrency.
   */
  symbol: string;

  /**
   * The reward assigned to the miner of a block excluding fees.
   */
  block_reward_static: number;

  /**
   * The consensus mechanism used by the blockchain. \
   * e.g: `"proof-of-work"` or `"proof-of-stake"`.
   */
  consensus_mechanism: string;

  /**
   * The global block difficulty determining how hard to find a hash on this blockchain. \
   * ***Note**: This integer is returned as a string to use with BigInt libraries as it may exceed the max safe integer size for many programming languages.*
   */
  difficulty: string;

  /**
   * The average hashrate over the past 24 hours. \
   * ***Note**: This integer is returned as a string to use with BigInt libraries as it may exceed the max safe integer size for many programming languages.*
   */
  hashrate_24h: string;

  /**
   * The number of pending transactions.
   */
  pending_transactions: number;

  /**
   * The rate the block reward is adjusted at a specified interval.
   */
  reduction_rate: string;

  /**
   * The total number of blocks.
   */
  total_blocks: number;

  /**
   * The total number of transactions. \
   * ***Note**: This integer is returned as a string to use with BigInt libraries as it may exceed the max safe integer size for many programming languages.*
   */
  total_transactions: string;

  /**
   * The average transactions per second over the past 24 hours.
   */
  tps_24h: number;

  /**
   * Timestamp (ISO 8601) of the time the first block was mined on this chain.
   */
  first_block_timestamp: Timestamp;
}

/**
 * A map response of blockchain objects by ID, symbol, or slug (as used in query parameters).
 * @template TKey The key type of the blockchain object.
 * @see {@link MetricBlockchainStats}
 */
export type MetricBlockchainStatsLatestResponse<TKey extends string = string> = Record<TKey, MetricBlockchainStats>;
