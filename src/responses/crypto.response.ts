import type { Interval, Pair, Timestamp, UnixEpoch } from "@option/common.type";
import type { PerformanceStatsTimePeriodOnly } from "@option/crypto.options";
import type { ContractAddress, Platform, Quote, QuoteMap, Tags, Urls } from "@response/common.response";

/**
 * Interface representing the response for a list of cryptocurrencies.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyMap | CoinMarketCap ID Map}
 */
export interface CryptoIdMapResponse {
  /**
   * The unique cryptocurrency ID for this cryptocurrency.
   */
  id: number;

  /**
   * The rank of this cryptocurrency.
   */
  rank: number;

  /**
   * The name of this cryptocurrency.
   */
  name: string;

  /**
   * The ticker symbol for this cryptocurrency, always in all caps.
   */
  symbol: string;

  /**
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * 1 if this cryptocurrency has at least 1 active market currently being tracked by the platform, otherwise 0.
   * A value of 1 is analogous with `listing_status=active`.
   */
  is_active: number;

  /**
   * The status of the cryptocurrency.
   * Valid values: `active`, `inactive`, or `untracked`.
   * The listing status of the cryptocurrency. This field is only returned if requested through the aux request parameter.
   */
  status: "active" | "inactive" | "untracked";

  /**
   * Timestamp (ISO 8601) of the date this cryptocurrency was first available on the platform.
   * *e.g: "2013-04-28T18:47:21.000Z"*
   */
  first_historical_data: Timestamp;

  /**
   * Timestamp (ISO 8601) of the last time this cryptocurrency's market data was updated.
   * *e.g: "2020-05-05T20:44:02.000Z"*
   */
  last_historical_data: Timestamp;

  /**
   * Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise null.
   */
  platform: Platform | null;
}

/**
 * Interface representing the response for Crypto Metadata V2.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyInfo | Cryptocurrency Metadata V2}
 */
export interface CryptoMetadataV2Response {
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
   * The category for this cryptocurrency, either `coin` or `token`.
   */
  category: "coin" | "token";

  /**
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * Link to a CoinMarketCap hosted logo png for this cryptocurrency, `64px` is default size returned.
   * Replace `64x64` in the image path with these alternative sizes: `16`, `32`, `64`, `128`, `200`
   */
  logo: string;

  /**
   * A CoinMarketCap supplied brief description of this cryptocurrency.
   * This field will return `null` if a description is not available.
   */
  description: string | null;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap.
   * *e.g: "2013-04-28T00:00:00.000Z"*
   */
  date_added: Timestamp;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was launched.
   * "2015-08-07T00:00:00.000Z",
   */
  date_launched: Timestamp;

  /**
   * The subreddit associated with the cryptocurrency.
   */
  subreddit: string;

  /**
   * A Markdown formatted notice that may highlight a significant event or condition that is impacting the cryptocurrency or how it is displayed, otherwise `null`.
   * A notice may highlight a recent or upcoming mainnet swap, symbol change, exploit event, or known issue with a particular exchange or market, for example.
   * If present, this notice is also displayed in an alert banner at the top of the cryptocurrency's page on coinmarketcap.com.
   */
  notice: string | null;

  /**
   * The Array string Tags associated with this cryptocurrency.
   */
  tags: string[];

  /**
   * The names of the tags associated with the cryptocurrency.
   */
  tag_names: string[];

  /**
   * The groups of tags associated with the cryptocurrency.
   */
  tag_groups: string[];

  /**
   * An object containing various resource URLs for this cryptocurrency.
   */
  urls: Urls;

  /**
   * The platform on which the cryptocurrency is built, if applicable.
   */
  platform?: Platform;

  /**
   * The Twitter username associated with the cryptocurrency.
   */
  twitter_username: string;

  /**
   * Indicates whether the cryptocurrency is hidden (1) or not (0).
   */
  is_hidden: number;

  /**
   * The contract addresses associated with the cryptocurrency.
   */
  contract_address: ContractAddress[];

  /**
   * The self-reported circulating supply of the cryptocurrency, if available.
   */
  self_reported_circulating_supply: number | null;

  /**
   * The self-reported tags associated with the cryptocurrency, if available.
   */
  self_reported_tags: string[] | null;

  /**
   * The self-reported market cap of the cryptocurrency, if available.
   */
  self_reported_market_cap: number | null;

  /**
   * Indicates whether the cryptocurrency has an infinite supply.
   */
  infinite_supply: boolean;

  /**
   * The status of the cryptocurrency, which can be `active`, `inactive`, or `untracked`.
   */
  status: "active" | "inactive" | "untracked";
}

/**
 * Represents the response for the latest cryptocurrency listing.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsLatest | Latest Cryptocurrency Listings}
 * @template TQuoteKey - The key type for the quote, defaults to "USD".
 * @template TQuoteValue - The value type for the quote, defaults to `Quote`.
 */
export interface CryptoListingLatestResponse<TQuoteKey extends string = "USD", TQuoteValue extends object = Quote> {
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
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * The cryptocurrency's CoinMarketCap rank by market cap.
   */
  cmc_rank: number;

  /**
   * The number of active trading pairs available for this cryptocurrency across supported exchanges.
   */
  num_market_pairs: number;

  /**
   * The approximate number of coins circulating for this cryptocurrency.
   */
  circulating_supply: number | null;

  /**
   * The approximate total amount of coins in existence right now (minus any coins that have been verifiably burned).
   */
  total_supply: number | null;

  /**
   * The market cap by total supply. This field is only returned if requested through the `aux` request parameter.
   */
  market_cap_by_total_supply?: number | null;

  /**
   * The expected maximum limit of coins ever to be available for this cryptocurrency.
   */
  max_supply: number | null;

  /**
   * The cryptocurrency is known to have an infinite supply.
   */
  infinite_supply: boolean;

  /**
   * Timestamp (ISO 8601) of the last time this cryptocurrency's market data was updated.
   * *e.g: "2018-08-09T22:53:32.000Z"*
   */
  last_updated: Timestamp;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap.
   * *e.g: "2013-04-28T00:00:00.000Z"*
   */
  date_added: Timestamp;

  /**
   * The Array string Tags associated with this cryptocurrency.
   */
  tags: string[];

  /**
   * The self reported number of coins circulating for this cryptocurrency.
   */
  self_reported_circulating_supply: number | null;

  /**
   * The self reported market cap for this cryptocurrency.
   */
  self_reported_market_cap: number | null;

  /**
   * Percentage of Total Value Locked
   */
  tvl_ratio: number | null;

  /**
   * Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise `null`.
   */
  platform: Platform | null;

  /**
   * A map of market quotes in different currency conversions. The default map included is `USD`.
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
}

/**
 * Representing the response for a new cryptocurrency listing.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsNew | New Cryptocurrency Listings}
 * @template TQuoteKey - The key type for the quote, defaults to "USD".
 * @template TQuoteValue - The value type for the quote, defaults to `Quote`.
 */
export interface CryptoListingNewResponse<TQuoteKey extends string = "USD", TQuoteValue extends object = Quote> {
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
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * The cryptocurrency's CoinMarketCap rank by market cap.
   */
  cmc_rank: number;

  /**
   * The number of active trading pairs available for this cryptocurrency across supported exchanges.
   */
  num_market_pairs: number;

  /**
   * The approximate number of coins circulating for this cryptocurrency.
   */
  circulating_supply: number;

  /**
   * The approximate total amount of coins in existence right now (minus any coins that have been verifiably burned).
   */
  total_supply: number;

  /**
   * The market cap by total supply.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  market_cap_by_total_supply?: number;

  /**
   * The expected maximum limit of coins ever to be available for this cryptocurrency.
   */
  max_supply: number;

  /**
   * Timestamp (ISO 8601) of the last time this cryptocurrency's market data was updated.
   * *e.g: "2018-06-02T22:51:28.209Z"*
   */
  last_updated: Timestamp;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap.
   * *e.g: "2013-04-28T00:00:00.000Z"*
   */
  date_added: Timestamp;

  /**
   * Array of string tags associated with this cryptocurrency.
   *
   * *Currently only a mineable tag will be returned if the cryptocurrency is mineable.*
   * *Additional tags will be returned in the future.*
   */
  tags: string[];

  /**
   * Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise `null`.
   */
  platform: Platform | null;

  /**
   * A map of market quotes in different currency conversions.
   * The default map included is `USD`.
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
}

/**
 * Represents a historical quote value for a cryptocurrency listing.
 * This type is a subset of the `Quote` type, including only the following properties:
 * - `price`: The price of the cryptocurrency.
 * - `volume_24h`: The 24-hour trading volume of the cryptocurrency.
 * - `market_cap`: The market capitalization of the cryptocurrency.
 * - `percent_change_1h`: The percentage change in price over the last hour.
 * - `percent_change_24h`: The percentage change in price over the last 24 hours.
 * - `percent_change_7d`: The percentage change in price over the last 7 days.
 * - `last_updated`: The timestamp of the last update for the quote.
 */
export type CryptoListingHistoricalQuoteValue = Pick<
  Quote,
  | "price"
  | "volume_24h"
  | "market_cap"
  | "percent_change_1h"
  | "percent_change_24h"
  | "percent_change_7d"
  | "last_updated"
>;

/**
 * Represents the response for a historical cryptocurrency listing.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsHistorical | Historical Cryptocurrency Listings}
 * @template TQuoteKey - The key type for the quote map, defaults to "USD".
 * @template TQuoteValue - The value type for the quote map, defaults to a subset of the Quote object.
 */
export interface CryptoListingHistoricalResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CryptoListingHistoricalQuoteValue,
> {
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
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * The cryptocurrency's historic CoinMarketCap rank at the end of the requested UTC day.
   */
  cmc_rank: number;

  /**
   * The number of active trading pairs available for this cryptocurrency across supported exchanges.
   */
  num_market_pairs: number;

  /**
   * The approximate number of coins circulating for this cryptocurrency at the end of the requested UTC day.
   */
  circulating_supply: number;

  /**
   * The approximate total amount of coins in existence right now (minus any coins that have been verifiably burned) at the end of the requested UTC day.
   */
  total_supply: number;

  /**
   * The expected maximum limit of coins ever to be available for this cryptocurrency.
   */
  max_supply: number;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency's market data was referenced for this UTC date snapshot.
   * *This is always the last update available during the UTC date requested.*
   * *e.g: "2018-06-02T22:51:28.209Z"*
   */
  last_updated: Timestamp;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap.
   * *e.g: "2013-04-28T00:00:00.000Z"*
   */
  date_added: Timestamp;

  /**
   * Array of tags associated with this cryptocurrency.
   * *Currently only a mineable tag will be returned if the cryptocurrency is mineable.*
   * *Additional tags will be returned in the future.*
   */
  tags: string[];

  /**
   * Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise `null`.
   */
  platform: Platform | null;

  /**
   * A map of market quotes in different currency conversions.
   * The default map included is `USD`.
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
}

/**
 * Represents the response for a cryptocurrency's latest quotes.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyQuotesLatest | Cryptocurrency Quotes Latest V2}
 * @template TQuoteKey - The key type for the quote, defaults to "USD".
 * @template TQuoteValue - The value type for the quote, defaults to `Quote`.
 */
export interface CryptoQuotesLatestResponse<TQuoteKey extends string = "USD", TQuoteValue extends object = Quote> {
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
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * `1` if this cryptocurrency has at least **1 active market currently** being tracked by the platform, otherwise `0`.
   * *A value of `1` is analogous with `listing_status=active`.*
   */
  is_active: number;

  /**
   * Indicates if the cryptocurrency is fiat (`1`) or not (`0`).
   */
  is_fiat: number;

  /**
   * The cryptocurrency's CoinMarketCap rank by market cap.
   */
  cmc_rank: number;

  /**
   * The number of active trading pairs available for this cryptocurrency across supported exchanges.
   */
  num_market_pairs: number;

  /**
   * The approximate number of coins circulating for this cryptocurrency.
   */
  circulating_supply: number;

  /**
   * The approximate total amount of coins in existence right now (minus any coins that have been verifiably burned)..
   */
  total_supply: number;

  /**
   * The market cap by total supply.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  market_cap_by_total_supply: number;

  /**
   * The expected maximum limit of coins ever to be available for this cryptocurrency.
   */
  max_supply: number;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap.
   * *e.g: "2013-04-28T00:00:00.000Z"*
   */
  date_added: Timestamp;

  /**
   * Array of tags associated with this cryptocurrency.
   * *Currently only a mineable tag will be returned if the cryptocurrency is mineable.*
   * *Additional tags will be returned in the future.*
   */
  tags: Tags[];

  /**
   * Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise `null`.
   */
  platform: Platform | null;

  /**
   * Timestamp (ISO 8601) of the last time this cryptocurrency's market data was updated.
   * *e.g: "2018-08-09T21:56:28.000Z"*
   */
  last_updated: Timestamp;

  /**
   * The self reported number of coins circulating for this cryptocurrency.
   */
  self_reported_circulating_supply: number;

  /**
   * The self reported market cap for this cryptocurrency.
   */
  self_reported_market_cap: number;

  /**
   * A map of market quotes in different currency conversions.
   * *The default map included is `USD`.*
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
}

/**
 * Represents the historical quote value of a cryptocurrency, including price, volume, market cap, and supply details.
 * @extends Pick<Quote, "price" | "volume_24h" | "market_cap">
 */
export interface CryptoQuotesHistoricalQuoteValue extends Pick<Quote, "price" | "volume_24h" | "market_cap"> {
  /**
   * The open price of the cryptocurrency.
   */
  circulating_supply: number | null;

  /**
   * The total amount of coins in existence right now (minus any coins that have been verifiably burned).
   */
  total_supply: number | null;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion.
   */
  timestamp: Timestamp;
}

/**
 * Represents the response for historical quotes of a cryptocurrency.
 * The map key being the id/symbol used in the request.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyQuotesHistorical | Cryptocurrency Quotes Historical V2}
 * @template TQuoteKey - The key type for the quote, defaults to "USD".
 * @template TQuoteValue - The value type for the quote, defaults to Quote.
 */
export interface CryptoQuotesHistoricalResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CryptoQuotesHistoricalQuoteValue,
> {
  /**
   * The CoinMarketCap cryptocurrency ID.
   */
  id: number;

  /**
   * The cryptocurrency name.
   */
  name: string;

  /**
   * The cryptocurrency symbol.
   */
  symbol: string;

  /**
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  is_active: number;

  /**
   * `1` if this cryptocurrency has at least `1 active market currently` being tracked by the platform, otherwise `0`.
   * A value of `1` is analogous with `listing_status=active`.
   */
  is_fiat: number | null;

  /**
   * The historical quotes of the cryptocurrency.
   */
  quotes: {
    /**
     * Timestamp of when this historical quote was recorded.
     */
    timestamp: Timestamp;

    /**
     * The interval timestamp for the search period that this historical quote was located against.
     * *This field is only returned if requested through the `aux` request parameter.*
     */
    search_interval?: Interval;

    /**
     * A map of market details for this quote in different currency conversions.
     * *The default map key included is `USD`.*
     */
    quote: QuoteMap<TQuoteKey, TQuoteValue>;
  }[];
}

/**
 * Exchange details of coin/token market pair.
 */
export interface CryptoMarketPairExchangeResponse {
  /**
   * The id of the exchange this market pair is under.
   */
  id: number;

  /**
   * The slug of the exchange this market pair is under.
   */
  slug: string;

  /**
   * The name of the exchange this market pair is under.
   */
  name: string;

  /**
   * A Markdown formatted message outlining a condition that is impacting the availability of this exchange's market data or the secure use of the exchange, otherwise `null`.
   * This may include a maintenance event on the exchange's end or CoinMarketCap's end, an alert about reported issues with withdrawls from this exchange, or another condition that may be impacting this exchange and it's markets.
   * If present, this notice is also displayed in an alert banner at the top of the exchange's page on coinmarketcap.com.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  notice?: string | null;
}

/**
 * Market pair details mark of the currency.
 */
export interface CryptoMarketPairMarkResponse {
  /**
   * The CoinMarketCap ID for the base currency in this market pair.
   */
  currency_id: number;

  /**
   * The name of this cryptocurrency.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  currency_name?: string;

  /**
   * The CoinMarketCap identified symbol for the base currency in this market pair.
   */
  currency_symbol: string;

  /**
   * The web URL friendly shorthand version of this cryptocurrency name.
   * This field is only returned if requested through the `aux` request parameter.*
   */
  currency_slug?: string;

  /**
   * The exchange reported symbol for the base currency in this market pair.
   * In most cases this is identical to CoinMarketCap's symbol but it may differ if the exchange uses an outdated or contentious symbol that contrasts with the majority of other markets.
   */
  exchange_symbol: string;

  /**
   * The CoinMarketCap ID for the quote currency in this market pair.
   */
  currency_type: "cryptocurrency" | "fiat";
}

/**
 * A default exchange reported quote containing raw exchange reported values.
 */
export interface CryptoMarketPairExchangeReportedQuoteResponse {
  /**
   * The lastest exchange reported price for this market pair in quote currency units.
   */
  price: number;

  /**
   * The latest exchange reported 24 hour rolling volume for this market pair in base cryptocurrency units.
   */
  volume_24h_base: number;

  /**
   * The latest exchange reported 24 hour rolling volume for this market pair in quote cryptocurrency units.
   */
  volume_24h_quote: number;

  /**
   * Timestamp (ISO 8601) of the last time this market data was updated.
   */
  last_updated: Timestamp;

  /**
   * The exchange reported 24 hour rolling volume for this market pair in quote currency units.
   */
  effective_liquidity?: number;

  /**
   * The exchange reported market score for this market pair.
   */
  market_score?: number;

  /**
   * The exchange reported market reputation for this market pair.
   */
  market_reputation?: number;
}

/**
 * Represents a cryptocurrency market pair.
 * @template TQuoteKey - The key type for the quote, defaults to "USD".
 * @template TQuoteValue - The value type for the quote, defaults to `Quote`.
 */
export interface CryptoMarketPairResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = Pick<Quote, "price" | "price_quote" | "volume_24h" | "last_updated">,
> {
  /**
   * The CoinMarketCap ID for this market pair.
   * *This ID can reliably be used to identify this unique market as the ID never changes.*
   */
  market_id: number;

  /**
   * The name of this market pair.
   * *e.g: "BTC/USD"*
   */
  market_pair: string;

  /**
   * The URL to this market's trading page on the exchange if available. If not available the exchange's homepage URL is returned.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  market_url?: string;

  /**
   * The category of trading this market falls under.
   * *Spot markets are the most common but options include derivatives and OTC.*
   */
  category: "spot" | "derivatives" | "otc";

  /**
   * The fee type the exchange enforces for this market.
   */
  fee_type: "percentage" | "no-fees" | "transactional-mining" | "unknown";

  /**
   * Exchange details for this market pair.
   */
  exchange: CryptoMarketPairExchangeResponse;

  /**
   * Base currency details object for this market pair.
   */
  market_pair_base: CryptoMarketPairMarkResponse;

  /**
   * Quote (secondary) currency details object for this market pair.
   */
  market_pair_quote: CryptoMarketPairMarkResponse;

  /**
   * Market Pair quotes object containing key, quote objects for each convert option requested.
   * `USD` and `exchange_reported` are defaults.
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue> & {
    exchange_reported: CryptoMarketPairExchangeReportedQuoteResponse;
  };
}

/**
 * Represents a subset of properties from the `Quote` type.
 *
 * @typedef {Object} CryptoMarketPairsQuoteValue
 * @property {number} price - The current price of the cryptocurrency.
 * @property {number} price_quote - The quoted price of the cryptocurrency.
 * @property {number} volume_24h - The trading volume of the cryptocurrency in the last 24 hours.
 * @property {Date} last_updated - The timestamp of the last update.
 */
export type CryptoMarketPairsQuoteValue = Pick<Quote, "price" | "price_quote" | "volume_24h" | "last_updated">;

/**
 * Represents the response for crypto market pairs.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyMarketpairsLatest | Market Pairs Latest v2}
 * @template TQuoteKey - The key type for the quote, defaults to `USD`.
 * @template TQuoteValue - The value type for the quote, defaults to an object with selected properties from `Quote`.
 *
 */
export interface CryptoMarketPairsResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CryptoMarketPairsQuoteValue,
> {
  /**
   * The unique CoinMarketCap ID for this cryptocurrency.
   */
  id: number;

  /**
   * The symbol of the cryptocurrency.
   */
  symbol: string;

  /**
   * The name of the cryptocurrency.
   */
  name: string;

  /**
   * The number of active market pairs listed for this cryptocurrency.
   * *This number is filtered down to only matching markets if a `matched` parameter is used.*
   */
  num_market_pairs: number;

  /**
   * Array of all market pairs for this cryptocurrency.
   */
  market_pairs: CryptoMarketPairResponse<TQuoteKey, TQuoteValue>[];
}

/**
 * Interface representing the latest quote value for a cryptocurrency's OHLCV (Open, High, Low, Close, Volume) data.
 * Extends the `Quote` interface to include the `last_updated` property.
 */
export interface CryptoOhlcvLatestQuoteValue extends Pick<Quote, "last_updated"> {
  /**
   * Price from first datapoint of today in UTC time for the convert option requested.
   */
  open: number;

  /**
   * Highest price so far today in UTC time for the convert option requested.
   */
  high: number;

  /**
   * Lowest price today in UTC time for the convert option requested.
   */
  low: number;

  /**
   * Latest price today in UTC time for the convert option requested.
   * *This is not the final price during close as the current day period is not over.*
   */
  close: number;

  /**
   * Aggregate 24 hour adjusted volume for the convert option requested.
   * *A rolling 24 hours back from the current time.*
   */
  volume: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was last updated when referenced for this conversion.
   * *e.g: 2018-09-10T18:54:00.000Z"*
   */
  last_updated: Timestamp;
}

/**
 * Represents the response for a cryptocurrency's latest OHLCV data.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyOhlcvLatest | OHLCV Latest v2}
 * @template TQuoteKey - The key type for the quote, defaults to `USD`.
 * @template TQuoteValue - The value type for the quote, defaults to a subset of the Quote object.
 */
export interface CryptoOhlcvLatestResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CryptoOhlcvLatestQuoteValue,
> {
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
   * Timestamp (ISO 8601) of the lastest market value record included to generate the latest active day OHLCV values.
   * *e.g: "2018-09-10T18:54:00.000Z"*
   */
  last_updated: Timestamp;

  /**
   * Timestamp (ISO 8601) of the start of this OHLCV period.
   * *e.g: "2018-09-10T00:00:00.000Z"*
   */
  time_open: Timestamp;

  /**
   * Timestamp (ISO 8601) of the high of this OHLCV period.
   * *e.g: "2018-09-10T00:00:00.000Z"*
   */
  time_high: Timestamp;

  /**
   * Timestamp (ISO 8601) of the low of this OHLCV period.
   * *e.g:  "2018-09-10T00:00:00.000Z" | null*
   */
  time_low: Timestamp;

  /**
   * Timestamp (ISO 8601) of the end of this OHLCV period.
   * *Always `null` as the current day is incomplete.*
   * *See `last_updated` for the last UTC time included in the current OHLCV calculation.*
   */
  time_close: Timestamp | null;

  /**
   * A map of market quotes in different currency conversions.
   * *The default map included is `USD`.*
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
}

/**
 * Represents the historical OHLCV (Open, High, Low, Close, Volume) quote values for a cryptocurrency.
 * Extends the `Quote` interface to include additional properties.
 * @see {@link Quote}
 * @extends {Pick<Quote, "last_updated" | "market_cap">}
 * @property {number} open - Opening price for the time series interval.
 * @property {number} high - Highest price during this time series interval.
 * @property {number} low - Lowest price during this time series interval.
 * @property {number} close - Closing price for this time series interval.
 * @property {number} volume - Adjusted volume for this time series interval. Note: Volume is not currently supported for hourly OHLCV intervals before 2020-09-22.
 * @property {Timestamp} timestamp - Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion.
 */

export interface CryptoOhlcvHistoricalQuoteValue extends Pick<Quote, "last_updated" | "market_cap"> {
  /**
   * Opening price for time series interval.
   */
  open: number;

  /**
   * Highest price during this time series interval.
   */
  high: number;

  /**
   * Lowest price during this time series interval.
   */
  low: number;

  /**
   * Closing price for this time series interval.
   */
  close: number;

  /**
   * Adjusted volume for this time series interval.
   * *Volume is not currently supported for hourly OHLCV intervals before 2020-09-22.*
   */
  volume: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion.
   */
  timestamp: Timestamp;
}

/**
 * Represents the response for a cryptocurrency's historical OHLCV data.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyOhlcvHistorical | OHLCV Historical v2}
 * @template TQuoteKey - The key type for the quote, defaults to `USD`.
 * @template TQuoteValue - The value type for the quote, defaults to a subset of the Quote object.
 */
export interface CryptoOhlcvHistoricalResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CryptoOhlcvHistoricalQuoteValue,
> {
  /**
   * The CoinMarketCap cryptocurrency ID.
   */
  id: number;
  /**
   * The cryptocurrency name.
   */
  name: string;

  /**
   * The cryptocurrency symbol.
   */
  symbol: string;

  /**
   * An array of OHLCV quotes for the supplied interval.
   */
  quotes: Array<{
    /**
     * Timestamp (ISO 8601) of the start of this time series interval.
     */
    time_open: Timestamp;

    /**
     * Timestamp (ISO 8601) of the end of this time series interval.
     */
    time_close: Timestamp;

    /**
     * Timestamp (ISO 8601) of the high of this time series interval.
     */
    time_high: Timestamp;

    /**
     * Timestamp (ISO 8601) of the low of this time series interval.
     */
    time_low: Timestamp;

    /**
     * A map of market quotes in different currency conversions.
     * *The default map included is `USD`.*
     */
    quote: QuoteMap<TQuoteKey, TQuoteValue>;
  }>;
}

/**
 * A time period quote in the currency conversion option.
 */
export interface CryptoPricePerformanceQuoteValue {
  /**
   * Cryptocurrency price at the start of the requested time period historically converted into units of the convert currency.
   */
  open: number;

  /**
   * Highest USD price achieved within the requested time period historically converted into units of the convert currency.
   */
  high: number;

  /**
   * Lowest USD price achieved within the requested time period historically converted into units of the convert currency.
   */
  low: number;

  /**
   * Cryptocurrency price at the end of the requested time period historically converted into units of the convert currency.
   */
  close: number;

  /**
   * The approximate percentage change (**ROI**) if purchased at the start of the time period.
   * *This is the time of launch or earliest known price for the `all_time` period.*
   * *This value includes historical change in market rate for the specified convert currency.*
   */
  percent_change: number;

  /**
   * The actual price change between the start of the time period and end.
   * *This is the time of launch or earliest known price for the `all_time` period.*
   * *This value includes historical change in market rate for the specified convert currency.*
   */
  price_change: number;

  /**
   * Timestamp (ISO 8601) of the closest convert currency reference price used during `open` price conversion.
   */
  open_timestamp: Timestamp;

  /**
   * Timestamp (ISO 8601) of the closest convert currency reference price used during `high` price conversion.
   * *For `yesterday` UTC close will be used.*
   */
  high_timestamp: Timestamp;

  /**
   * Timestamp (ISO 8601) of the closest convert currency reference price used during `low` price conversion.
   * *For `yesterday` UTC close will be used.*
   */
  low_timestamp: Timestamp;
  close_timestamp: Timestamp;
}

/**
 * Represents the response for a cryptocurrency's price performance period.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyPriceperformancestatsLatest | Price Performance Stats v2}
 * @template TQuoteKey - The key type for the quote, defaults to `USD`.
 * @template TQuoteValue - The value type for the quote, defaults to {@link CryptoPricePerformanceQuoteValue}.
 */
export type CryptoPricePerformancePeriodResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CryptoPricePerformanceQuoteValue,
> = {
  /**
   * Timestamp (ISO 8601) of the start of this time period.
   * *A rolling period back from current time for time periods outside of `yesterday`.*
   */
  open_timestamp: Timestamp;

  /**
   * Timestamp (ISO 8601) of the end of this time period.
   * *A rolling period back from current time for time periods outside of `yesterday`.*
   */
  close_timestamp: Timestamp;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency achieved it's highest USD price during the requested time period.
   * *The `yesterday` period currently doesn't support this field and will return `null`.*
   */
  high_timestamp: Timestamp | null;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency achieved it's lowest USD price during the requested time period.
   * *The `yesterday` period currently doesn't support this field and will return `null`.*
   */
  low_timestamp: Timestamp | null;

  /**
   * An object map of time period quotes for each convert option requested.
   * *The default map included is `USD`.*
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
};

/**
 * Represents the response for a cryptocurrency's price performance stats.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyPriceperformancestatsLatest | Price Performance Stats v2}
 * @template TQuoteKey - The key type for the quote, defaults to `USD`.
 * @template TQuoteValue - The value type for the quote, defaults to {@link CryptoPricePerformanceQuoteValue}.
 */
export type CryptoPricePerformanceStatsResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CryptoPricePerformanceQuoteValue,
> = {
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
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * Timestamp (ISO 8601) of the last time this cryptocurrency's market data was updated.
   */
  last_updated: Timestamp;

  /**
   * An object map of time periods by period requested.
   */
  periods: Pair<PerformanceStatsTimePeriodOnly, CryptoPricePerformancePeriodResponse<TQuoteKey, TQuoteValue>>;
};

/**
 * Represents a coin within a specific cryptocurrency category.
 */
export interface CryptoCategoryCoin<TQuoteKey extends string = "USD"> {
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
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * The cryptocurrency's CoinMarketCap rank by market cap.
   */
  cmc_rank: number;

  /**
   * The number of active trading pairs available for this cryptocurrency across supported exchanges.
   */
  num_market_pairs: number;

  /**
   * The approximate number of coins circulating for this cryptocurrency.
   */
  circulating_supply: number;

  /**
   * The approximate total amount of coins in existence right now (minus any coins that have been verifiably burned).
   */
  total_supply: number;

  /**
   * The market cap by total supply.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  market_cap_by_total_supply?: number;

  /**
   * The expected maximum limit of coins ever to be available for this cryptocurrency.
   */
  max_supply: number;

  /**
   * Timestamp (ISO 8601) of the last time this cryptocurrency's market data was updated.
   */
  last_updated: Timestamp;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap.
   */
  date_added: Timestamp;

  /**
   * Array of string tags associated with this cryptocurrency.
   * *Currently only a mineable tag will be returned if the cryptocurrency is mineable.*
   * *Additional tags will be returned in the future.*
   */
  tags: string[];

  /**
   * Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise `null`.
   */
  platform: Platform | null;

  /**
   * A map of market quotes in different currency conversions.
   * *The default map key included is `USD`.*
   */
  quote: QuoteMap<
    TQuoteKey,
    Pick<
      Quote,
      | "price"
      | "volume_24h"
      | "percent_change_1h"
      | "percent_change_24h"
      | "percent_change_7d"
      | "market_cap"
      | "last_updated"
    > &
      Partial<
        Pick<Quote, "volume_24h_reported" | "volume_7d" | "volume_7d_reported" | "volume_30d" | "volume_30d_reported">
      >
  >;
}

/**
 * Represents the response structure for a cryptocurrency category.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyCategory | CMC Category}
 * @see {@link CryptoCategoryCoin}
 * @template TQuoteKey - The key type for the quote, defaults to `USD`.
 */
export interface CryptoCategoryResponse<TQuoteKey extends string = "USD"> {
  /**
   * The unique ID of the category
   */
  id: number;

  /**
   * The name of the category
   */
  name: string;

  /**
   * The title of the category
   */
  title: string;

  /**
   * The description of the category
   */
  description: string;

  /**
   * The number of tokens in the category
   */
  num_tokens: number;

  /**
   * Average price change of coins within this category
   */
  avg_price_change: number;

  /**
   * Market cap of coins within this category
   */
  market_cap: number;

  /**
   * Market cap change of coins within this category
   */
  market_cap_change: number;

  /**
   * Volume of coins within this category
   */
  volume: number;

  /**
   * Volume change of coins within this category
   */
  volume_change: number;

  /**
   * Timestamp (ISO 8601) of when this was last updated.
   */
  last_updated: UnixEpoch;

  /**
   * Array of cryptocurrency objects matching the list options.
   */
  coins: Array<CryptoCategoryCoin<TQuoteKey>>;
}

/**
 * Represents the response for crypto categories.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyCategories | CMC Categories}
 */
export interface CryptoCategoriesResponse {
  /**
   * The unique ID of the category
   */
  id: number;

  /**
   * The name of the category
   */
  name: string;

  /**
   * The title of the category
   */
  title: string;

  /**
   * The description of the category
   */
  description: string;

  /**
   * The number of tokens in the category
   */
  num_tokens: number;

  /**
   * Average price change of coins within this category
   */
  avg_price_change: number;

  /**
   * Market cap of coins within this category
   */
  market_cap: number;

  /**
   * Market cap change of coins within this category
   */
  market_cap_change: number;

  /**
   * Volume of coins within this category
   */
  volume: number;

  /**
   * Volume change of coins within this category
   */
  volume_change: number;

  /**
   * Timestamp (ISO 8601) of when this was last updated
   */
  last_updated: Timestamp;
}

/**
 * Represents a cryptocurrency that is part of an airdrop.
 */
export interface CryptoAirdropCoin {
  /**
   * The unique CoinMarketCap ID for this asset.
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
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;
}

/**
 * A results object for the airdrop requested.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyAirdrop | CMC Airdrop}
 */
export interface CryptoAirdropResponse {
  /**
   * The unique ID of the airdrop
   */
  id: string;

  /**
   * The project name
   */
  project_name: string;

  /**
   * The description of the airdrop
   */
  description: string;

  /**
   * The current status of the airdrop
   */
  status: string;

  /**
   * The coin associated with the airdrop.
   */
  coin: CryptoAirdropCoin;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap
   */
  start_date: Timestamp;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap
   */
  end_date: Timestamp;

  /**
   * The total prize amount for the airdrop.
   */
  total_prize: number;

  /**
   * The number of winners for the airdrop.
   */
  winner_count: number;

  /**
   * A link to the airdrop information
   */
  link: string;
}

/**
 * Represents a response containing multiple crypto airdrop details.
 * This type is an array of {@link CryptoAirdropResponse} objects.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyAirdrops | CMC Airdrops}
 */
export type CryptoAirdropsResponse = CryptoAirdropResponse[];

/**
 * All trending cryptocurrency market data, determined and sorted by CoinMarketCap search volume.
 * @template TQuoteKey - The key type for the quote, defaults to `USD`.
 */
export interface CryptoTrendingResponse<TQuoteKey extends string = "USD"> {
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
   *The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * The cryptocurrency's CoinMarketCap rank by market cap.
   */
  cmc_rank: number;

  /**
   * `1` if this is a fiat
   */
  is_fiat: 0 | 1;

  /**
   * The self reported number of coins circulating for this cryptocurrency.
   */
  self_reported_circulating_supply: number;

  /**
   * The self reported market cap for this cryptocurrency.
   */
  self_reported_market_cap: number;

  /**
   * `1` if this cryptocurrency has at least *1 active market currently* being tracked by the platform, otherwise `0`.
   * *A value of `1` is analogous with `listing_status=active`*.
   */
  is_active: 0 | 1;

  /**
   * The number of active trading pairs available for this cryptocurrency across supported exchanges.
   */
  num_market_pairs: number;

  /**
   * The approximate number of coins circulating for this cryptocurrency.
   */
  circulating_supply: number;

  /**
   * The approximate total amount of coins in existence right now (minus any coins that have been verifiably burned).
   */
  total_supply: number;

  /**
   * The market cap by total supply.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  market_cap_by_total_supply?: number;

  /**
   * The expected maximum limit of coins ever to be available for this cryptocurrency.
   */
  max_supply: number;

  /**
   * Timestamp (ISO 8601) of the last time this cryptocurrency's market data was updated.
   */
  last_updated: Timestamp;

  /**
   * Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap.
   */
  date_added: Timestamp;

  /**
   * Array of tags associated with this cryptocurrency.
   * *Currently only a mineable tag will be returned if the cryptocurrency is mineable.*
   * *Additional tags will be returned in the future.*
   */
  tags: string[];

  /**
   * Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise `null`.
   */
  platform: Platform | null;

  /**
   * A map of market quotes in different currency conversions.
   * *The default map included is `USD`.*
   */
  quote: QuoteMap<
    TQuoteKey,
    Pick<
      Quote,
      | "price"
      | "volume_24h"
      | "percent_change_1h"
      | "percent_change_24h"
      | "percent_change_7d"
      | "market_cap"
      | "last_updated"
    > &
      Partial<
        Pick<Quote, "volume_24h_reported" | "volume_7d" | "volume_7d_reported" | "volume_30d" | "volume_30d_reported">
      >
  >;
}

/**
 * Represents the response for the latest trending cryptocurrencies.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingLatest | CMC Trending Latest}
 * @template TQuoteKey - The type of the quote key, defaults to `USD`.
 * @typedef {Array} CryptoTrendingLatestResponse - An array of objects that extend CryptoTrendingResponse with additional properties.
 * @property {number} is_fiat - Indicates if the cryptocurrency is fiat (1) or not (0).
 * @property {number} is_active - Indicates if the cryptocurrency is active (1) or not (0).
 * @property {number | null} self_reported_circulating_supply - The self-reported circulating supply of the cryptocurrency, or null if not available.
 * @property {number | null} self_reported_market_cap - The self-reported market cap of the cryptocurrency, or null if not available.
 */
export type CryptoTrendingLatestResponse<TQuoteKey extends string = "USD"> = Array<
  CryptoTrendingResponse<TQuoteKey> & {
    is_fiat: number;
    is_active: number;
    self_reported_circulating_supply: number | null;
    self_reported_market_cap: number | null;
  }
>;

/**
 * Represents the response for the most visited cryptocurrencies.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingMostvisited | CMC Trending Most Visited}
 * @template TQuoteKey - The key for the quote currency, defaults to "USD".
 * @type {Array<CryptoTrendingResponse<TQuoteKey>>}
 */
export type CryptoMostVisitedResponse<TQuoteKey extends string = "USD"> = Array<CryptoTrendingResponse<TQuoteKey>>;

/**
 * Represents a response containing an array of trending cryptocurrencies, either gainers or losers.
 * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingGainerslosers | CMC Trending Grainers & Losers}
 * @template TQuoteKey - The key representing the quote currency, defaults to "USD".
 * @type {Array<CryptoTrendingResponse<TQuoteKey>>}
 */
export type CryptoGrainersLosersResponse<TQuoteKey extends string = "USD"> = Array<CryptoTrendingResponse<TQuoteKey>>;
