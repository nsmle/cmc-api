/**
 * The list of auxiliary Metric Global Quotes Historical options.
 *
 * The list can contain the following string values:
 * - `"btc_dominance"`: *Bitcoin's market dominance percentage by market cap.*
 * - `"eth_dominance"`: *Ethereum's market dominance percentage by market cap.*
 * - `"active_cryptocurrencies"`: *The number of active cryptocurrencies.*
 * - `"active_exchanges"`: *The number of active exchanges.*
 * - `"active_market_pairs"`: *The number of active market pairs.*
 * - `"total_volume_24h"`: *The total volume in the last 24 hours.*
 * - `"total_volume_24h_reported"`: *The total reported volume in the last 24 hours.*
 * - `"altcoin_market_cap"`: *The market cap of all altcoins.*
 * - `"altcoin_volume_24h"`: *The volume of all altcoins in the last 24 hours.*
 * - `"altcoin_volume_24h_reported"`: *The reported volume of all altcoins in the last 24 hours.*
 * - `"search_interval"`: *The interval of the search.*
 *
 * The type can also be an array of the above string values.
 */
export type AuxiliaryMetricGlobalQuotesHistoricalList =
  | "btc_dominance"
  | "eth_dominance"
  | "active_cryptocurrencies"
  | "active_exchanges"
  | "active_market_pairs"
  | "total_volume_24h"
  | "total_volume_24h_reported"
  | "altcoin_market_cap"
  | "altcoin_volume_24h"
  | "altcoin_volume_24h_reported"
  | "search_interval"
  | (
      | "btc_dominance"
      | "eth_dominance"
      | "active_cryptocurrencies"
      | "active_exchanges"
      | "active_market_pairs"
      | "total_volume_24h"
      | "total_volume_24h_reported"
      | "altcoin_market_cap"
      | "altcoin_volume_24h"
      | "altcoin_volume_24h_reported"
      | "search_interval"
    )[];

/**
 * The intervals options for index historical.
 *
 * The available intervals are:
 * - `"5m"`: *5 minute*
 * - `"15m"`: *15 minutes*
 * - `"daily"`: *Daily*
 */
export type MetricIndexHistoricalInterval = "5m" | "15m" | "daily";
