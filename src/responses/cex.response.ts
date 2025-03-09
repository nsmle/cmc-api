import type { Pair, Timestamp } from "@option/common.option";
import type { Quote, QuoteMap } from "@response/common.response";

/**
 * Various resource URLs for an exchange.
 */
export interface CexUrls {
  /**
   * Official website URLs.
   */
  website: string[];

  /**
   * Official blog URLs.
   */
  blog: string[];

  /**
   * Official chat URLs.
   */
  chat: string[];

  /**
   * Official web URLs covering exchange fees.
   */
  fee: string[];

  /**
   * Official twitter profile URLs.
   */
  twitter: string[];
}

/**
 * Represents the mapping of a centralized exchange (CEX) in CoinMarketCap.
 */
export interface CexIdMap {
  /**
   * The unique CoinMarketCap ID for this exchange.
   */
  id: number;

  /**
   * The name of this exchange.
   */
  name: string;

  /**
   * The web URL friendly shorthand version of this exchange name.
   */
  slug: string;

  /**
   * `1` if this exchange is still being actively tracked and updated, otherwise `0`.
   */
  is_active: number;

  /**
   * The listing status of the exchange. \
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  status?: "active" | "inactive" | "untracked";

  /**
   * Timestamp (ISO 8601) of the earliest market data record available to query using our historical endpoints. \
   * *`null` if there is no historical data currently available for this exchange.*
   */
  first_historical_data: Timestamp | null;

  /**
   * Timestamp (ISO 8601) of the latest market data record available to query using our historical endpoints. \
   * *`null` if there is no historical data currently available for this exchange.*
   */
  last_historical_data: Timestamp | null;
}

/**
 * A map of exchange objects by ID or slugs (as used in query parameters).
 * @template TKey - The type of the key used in the map, defaults to string.
 */
export type CexIdMapResponse<TKey extends string = string> = Pair<TKey, CexIdMap>;

/**
 * Array of exchange object results.
 * @see {@link CexIdMap}
 */
export type CexIdMapResponses = CexIdMap[];

/**
 * Represents a market quote for a centralized exchange (CEX).
 * @see {@link Quote}
 */
export type CexMarketQuote = Pick<Quote, "volume_24h" | "volume_7d" | "volume_30d"> & {
  /**
   * Adjusted 24 hour volume in the specified currency for spot markets excluding markets with no fees and transaction mining.
   */
  volume_24h_adjusted: number;

  /**
   * 24 hour volume change percentage in the specified currency.
   */
  percent_change_volume_24h: number;

  /**
   * 7 day volume change percentage in the specified currency.
   */
  percent_change_volume_7d: number;

  /**
   * 30 day volume change percentage in the specified currency.
   */
  percent_change_volume_30d: number;

  /**
   * 24 hour liquidity in the specified currency.
   */
  effective_liquidity_24h: number;

  /**
   * Reported 24 hour derivative volume in the specified currency.
   */
  derivative_volume?: number;

  /**
   * Reported 24 hour derivative open interest in the specified currency.
   */
  open_interest?: number;

  /**
   * Reported all time derivative volume in the specified currency.
   */
  derivative_volume_usd?: number;

  /**
   * Reported all time spot volume in the specified currency.
   */
  spot_volume_usd?: number;
};

/**
 * Object of a centralized exchange (CEX).
 * @see {@link CexUrls}
 */
export interface CexMetadata {
  /**
   * The unique CoinMarketCap ID for the exchange.
   */
  id: number;

  /**
   * Name of the exchange.
   */
  name: string;

  /**
   * The web URL friendly shorthand version of the exchange name.
   */
  slug: string;

  /**
   * Link to a CoinMarketCap hosted logo png for the exchange. *`64px` is default size returned.* \
   * *Replace `"64x64"` in the image path with these alternative sizes: `16`, `32`, `64`, `128`, `200`*
   */
  logo: string;

  /**
   * A CoinMarketCap supplied brief description of this cryptocurrency exchange. \
   * *This field will return `null` if a description is not available.*
   */
  description: string | null;

  /**
   * Timestamp (ISO 8601) of the launch date for this exchange.
   */
  date_launched: Timestamp;

  /**
   * Notice or disclaimer related to the exchange. \
   * *Can be `null` if no notice is available.*
   */
  notice: string | null;

  /**
   * List of countries where the exchange operates.
   */
  countries: string[];

  /**
   * List of fiat currencies supported by the exchange.
   */
  fiats: string[];

  /**
   * List of tags associated with the exchange. \
   * *Can be `null` if no tags are available.*
   */
  tags: string[] | null;

  /**
   * Type of the exchange. \
   * *Can be `null` if no type is specified.*
   */
  type: string | null;

  /**
   * Maker fee percentage charged by the exchange.
   */
  maker_fee: number;

  /**
   * Taker fee percentage charged by the exchange.
   */
  taker_fee: number;

  /**
   * The number of weekly visitors.
   */
  weekly_visits: number;

  /**
   * Reported all time spot volume in the specified currency.
   */
  spot_volume_usd: number;

  /**
   * Timestamp (ISO 8601) of the last update to the spot trading volume.
   */
  spot_volume_last_updated?: Timestamp;

  /**
   * Various resource URLs for the exchange.
   */
  urls: CexUrls;
}

/**
 * Represents the response containing metadata for a centralize exchange (CEX).
 * @template TKey - The type of the key used in the response. e.g: `"binance" | "1"`, Defaults to `string`.
 * @see {@link CexMetadata}
 */
export type CexMetadataResponse<TKey extends string = string> = Pair<TKey, CexMetadata>;

/**
 * Represents a platform for a centralized exchange (CEX) asset.
 */
export interface CexAssetPlatform {
  /**
   * The CoinMarketCap ID for the blockchain platform where the assets are held on the exchange.
   */
  crypto_id: number;

  /**
   * The symbol for the blockchain platform where the assets are held on the exchange.
   */
  symbol: string;

  /**
   * The name for the blockchain platform where the assets are held on the exchange.
   */
  name: string;
}

/**
 * Represents a cryptocurrency asset on a centralized exchange (CEX).
 */
export interface CexAssetCurrency {
  /**
   * The CoinMarketCap ID for the coin/token used for this wallet.
   */
  crypto_id: number;

  /**
   * The symbol for the coin/token used for this wallet.
   */
  symbol: string;

  /**
   * The name for the coin/token used for this wallet.
   */
  name: string;

  /**
   * The price in USD for 1 coin/token.
   */
  price_usd: number;
}

/**
 * Represents an asset held on a centralized exchange (CEX).
 * @see {@link CexAssetPlatform}
 * @see {@link CexAssetCurrency}
 */
export interface CexAsset {
  /**
   * The address of the wallet.
   */
  wallet_address: string;
  /**
   * The amount of coins/tokens held in this wallet.
   */
  balance: number;

  /**
   * The platform of the asset.
   */
  platform: CexAssetPlatform;

  /**
   * The currency of the asset.
   */
  currency: CexAssetCurrency;
}

/**
 * Represents the response for CEX (Centralized Exchange) assets.
 * Response may be an array of {@link CexAsset} or a map of {@link CexAsset} arrays.
 * @template TKey - The type of the key used in the response, defaults to `string`.
 * @see {@link CexAsset}
 */
export type CexAssetsResponse<TKey extends string = string> = Pair<TKey, CexAsset[]> & CexAsset[];

/**
 * Represents the response for CEX (Centralized Exchange) listings.
 * @template TQuoteKey - The key type for the quote, defaults to `"USD"`.
 * @template TQuoteValue - The value type for the quote, defaults to `CexMarketQuote`.
 * @see {@link QuoteMap}
 * @see {@link CexMarketQuote}
 */
export interface CexListing<TQuoteKey extends string = "USD", TQuoteValue extends object = CexMarketQuote> {
  /**
   * The unique CoinMarketCap ID for this exchange.
   */
  id: number;

  /**
   * The name of this exchange.
   */
  name: string;

  /**
   * The web URL friendly shorthand version of this exchange name.
   */
  slug: string;

  /**
   * The number of trading pairs actively tracked on this exchange.
   */
  num_market_pairs: number;

  /**
   * The fiat currencies supported by the exchange.
   */
  fiats?: string[];

  /**
   * The traffic score.
   */
  traffic_score: number;

  /**
   * The exchange rank.
   */
  rank: number;

  /**
   * @deprecated after 4 November 2024, always return `null`.
   */
  exchange_score: null;

  /**
   * The liquidity score.
   */
  liquidity_score: number | null;

  /**
   * Timestamp (ISO 8601) of the last time this record was upated.
   */
  last_updated: Timestamp;

  /**
   * A map of market quotes in different currency conversions. \
   * *The default map included is `"USD"`.*
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
}

/**
 * Array of exchange objects matching the list options.
 * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
 * @template TQuoteValue - The type of the quote value, defaults to `CexMarketQuote`.
 * @see {@link CexListing}
 * @see {@link CexMarketQuote}
 */
export type CexListingLatestResponse<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CexMarketQuote,
> = CexListing<TQuoteKey, TQuoteValue>[];

/**
 * Base currency details object for the market pair.
 */
export interface CexMarketPairBase {
  /**
   * The CoinMarketCap ID for the base currency in the market pair.
   */
  currency_id: number;

  /**
   * The name of this cryptocurrency. \
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  currency_name?: string;

  /**
   * The symbol for the base currency in this market pair.
   */
  currency_symbol: string;

  /**
   * The exchange reported symbol for the base currency in this market pair. \
   * *In most cases this is identical to CoinMarketCap's symbol but it may differ if the exchange uses an outdated or contentious symbol that contrasts with the majority of other markets.*
   */
  exchange_symbol: string;

  /**
   * The web URL friendly shorthand version of this cryptocurrency name. \
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  currency_slug?: string;

  /**
   * The currency type for the base currency in this market pair, either "cryptocurrency" or "fiat".
   */
  currency_type: "cryptocurrency" | "fiat";
}

/**
 * A default exchange reported quote containing raw exchange reported values.
 */
export interface CexMarketPairQuoteExchangeReported {
  /**
   * The last exchange reported price for this market pair in quote currency units.
   */
  price: number;

  /**
   * The last exchange reported 24 hour volume for this market pair in base cryptocurrency units.
   */
  volume_24h_base: number;

  /**
   * The last exchange reported 24 hour volume for this market pair in quote cryptocurrency units.
   */
  volume_24h_quote: number;

  /**
   * Percentage of total exchange `volume_24h`.
   */
  volume_percentage: number;

  /**
   * Timestamp (ISO 8601) of the last time this market data was updated.
   */
  last_updated: Timestamp;
}

/**
 * Representing a quote for a market pair on a centralized exchange (CEX).
 */
export interface CexMarketPairQuote {
  /**
   * The last reported exchange price for this market pair converted into the requested convert currency.
   */
  price: number;

  /**
   * The latest exchange reported price in base units converted into the requested convert currency. \
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  price_quote?: number;

  /**
   * The last reported exchange volume for this market pair converted into the requested convert currency.
   */
  volume_24h: number;

  /**
   * -2% Depth in the specified currency.
   */
  depth_negative_two: number;

  /**
   * +2% Depth in the specified currency.
   */
  depth_positive_two: number;

  /**
   * The effective liquidity of the market pair.
   */
  effective_liquidity?: number;

  /**
   * The market score.
   */
  market_score?: number;

  /**
   * The market reputation score.
   */
  market_reputation?: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion.
   */
  last_updated: Timestamp;
}

/**
 * Represents a market pair on a centralized exchange (CEX).
 * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
 * @template TQuoteValue - The type of the quote value, defaults to `CexMarketPairQuote`.
 * @template TQuoteExchangeReported - The type of the exchange reported quote, defaults to `CexMarketPairQuoteExchangeReported`.
 * @see {@link CexMarketPair}
 * @see {@link CexMarketPairBase}
 * @see {@link CexMarketPairQuote}
 * @see {@link CexMarketPairQuoteExchangeReported}
 * @see {@link Pair}
 */
export interface CexMarketPair<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CexMarketPairQuote,
  TQuoteExchangeReported extends object = CexMarketPairQuoteExchangeReported,
> {
  /**
   * The CoinMarketCap ID for this market pair. \
   * *This ID can reliably be used to identify this unique market as the ID never changes.*
   */
  market_id: number;

  /**
   * The name of this market pair. \
   * *e.g: `"BTC/USD"`.*
   */
  market_pair: string;

  /**
   * The category of trading this market falls under. \
   * *Spot markets are the most common but options include derivatives and OTC.*
   */
  category: "spot" | "derivatives" | "otc";

  /**
   * The fee type the exchange enforces for this market.
   */
  fee_type: "percentage" | "no-fees" | "transactional-mining" | "unknown";

  outlier_detected?: number | null;
  exclusions?: string | null;

  /**
   * Base currency details object for this market pair.
   */
  market_pair_base: CexMarketPairBase;

  /**
   * Quote (secondary) currency details object for this market pair.
   */
  market_pair_quote: CexMarketPairBase;

  /**
   * Market Pair quotes object containing `key->quote` objects for each convert option requested. \
   * *`"USD"` and `"exchange_reported"` are defaults.*
   */
  quote: Pair<TQuoteKey, TQuoteValue> & {
    /**
     * A default exchange reported quote containing raw exchange reported values.
     */
    exchange_reported: TQuoteExchangeReported;
  };
}

/**
 * Represents the market pairs for a centralized exchange (CEX).
 * @template TQuoteKey - The type of the quote key, defaults to "USD".
 * @template TQuoteValue - The type of the quote value, defaults to CexMarketPairQuote.
 * @see {@link CexMarketPair}
 * @see {@link CexMarketPairQuote}
 */
export interface CexMarketPairs<TQuoteKey extends string = "USD", TQuoteValue extends object = CexMarketPairQuote> {
  /**
   * The CoinMarketCap ID for this exchange.
   */
  id: number;

  /**
   * The name of this exchange.
   */
  name: string;

  /**
   * The slug for this exchange.
   */
  slug: string;

  /**
   * The number of market pairs that are open for trading on this exchange.
   */
  num_market_pairs: number;

  /**
   * Reported 24 hour volume in USD.
   */
  volume_24h: number;

  /**
   * Array of all active market pairs for this exchange.
   */
  market_pairs: CexMarketPair<TQuoteKey, TQuoteValue>[];
}

/**
 * Represents the response for CEX market pairs.
 * @template TKey - The type of the key for the market pair.
 * @template TQuoteKey - The type of the key for the quote, defaults to "USD".
 * @template TQuoteValue - The type of the value for the quote, defaults to `CexMarketPairQuote`.
 * @see {@link CexMarketPairs}
 * @see {@link CexMarketPairQuote}
 */
export type CexMarketPairsResponse<
  TKey extends string = string,
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CexMarketPairQuote,
> = Pair<TKey, CexMarketPairs<TQuoteKey, TQuoteValue>>;

/**
 * A market quotes value.
 */
export interface CexQuotesValue {
  /**
   * Reported 24 hour volume in the specified currency.
   */
  volume_24h: number;

  /**
   * Adjusted 24 hour volume in the specified currency for spot markets excluding markets with no fees and transaction mining.
   */
  volume_24h_adjusted: number;

  /**
   * 7 day volume in the specified currency.
   */
  volume_7d: number;

  /**
   * 30 day volume in the specified currency.
   */
  volume_30d: number;

  /**
   * 24 hour percent change in the specified currency.
   */
  percent_change_volume_24h: number;

  /**
   * 7 day percent change in the specified currency.
   */
  percent_change_volume_7d: number;

  /**
   * 30 day percent change in the specified currency.
   */
  percent_change_volume_30d: number;

  /**
   * 24 hour liquidity in the specified currency.
   */
  effective_liquidity_24h: number;

  /**
   * Reported 24 hour derivative volume in the specified currency.
   */
  derivative_volume: number;

  /**
   * Reported 24 hour spot volume in the specified currency.
   */
  spot_volume: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion.
   */
  last_updated: Timestamp;
}

/**
 * Represents the quotes for a centralized exchange (CEX).
 *
 * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
 * @template TQuoteValue - The type of the quote value, defaults to `CexQuotesValue`.
 * @see {@link QuoteMap}
 * @see {@link CexQuotesValue}
 */
export interface CexQuotes<TQuoteKey extends string = "USD", TQuoteValue extends object = CexQuotesValue> {
  /**
   * The CoinMarketCap exchange ID.
   */
  id: number;

  /**
   * The exchange name.
   */
  name: string;

  /**
   * The exchange slug.
   */
  slug: string;

  /**
   * The number of active trading pairs available for this exchange.
   */
  num_market_pairs: number;

  /**
   * The exchange score.
   * @deprecated after 4 November 2024, always return `null`.
   */
  exchange_score: null;

  /**
   * The liquidity score.
   */
  liquidity_score: number;

  /**
   * The exchange rank.
   */
  rank: number;

  /**
   * The traffic score.
   */
  traffic_score: number;

  /**
   * Timestamp (ISO 8601) of the last time this exchange's market data was updated.
   */
  last_updated: Timestamp;

  /**
   * A map of market quotes in different currency conversions. \
   * *The default map included is `"USD"`.*
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
}

/**
 * A map of exchange objects by ID or slugs (as used in query parameters).
 * @template TKey - The type of the key for the pair, defaults to `string`.
 * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
 * @template TQuoteValue - The type of the quote value, defaults to `CexQuotesValue`.
 * @see {@link CexQuotes}
 * @see {@link CexQuotesValue}
 * @see {@link Pair}
 */
export type CexQuotesLatestResponse<
  TKey extends string = string,
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CexQuotesValue,
> = Pair<TKey, CexQuotes<TQuoteKey, TQuoteValue>>;

/**
 * The market details for the current interval and currency conversion option.
 */
export interface CexQuotesHistoricalQuote {
  /**
   * Combined 24 hour volume for all market pairs on this exchange at the current historical interval.
   */
  volume_24h: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion.
   */
  timestamp: Timestamp;
}

/**
 * Represents the historical quotes for a centralized exchange (CEX).
 * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
 * @template TQuoteValue - The type of the quote value, defaults to `CexQuotesHistoricalQuote`.
 * @see {@link QuoteMap}
 * @see {@link CexQuotesHistoricalQuote}
 */
export interface CexQuotesHistoricalQuotes<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CexQuotesHistoricalQuote,
> {
  /**
   * Number of market pairs available at the current historical interval.
   */
  num_market_pairs: number;

  /**
   * Timestamp (ISO 8601) of when this historical quote was recorded.
   */
  timestamp: Timestamp;

  /**
   * A map of market details for this quote in different currency conversions. \
   * *The default map included is `"USD"`.*
   */
  quote: QuoteMap<TQuoteKey, TQuoteValue>;
}

/**
 * Represents the historical quotes for a centralized exchange (CEX).
 * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
 * @template TQuoteValue - The type of the quote value, defaults to `CexQuotesHistoricalQuote`.
 * @see {@link QuoteMap}
 * @see {@link CexQuotesHistoricalQuote}
 * @see {@link CexQuotesHistoricalQuotes}
 */
export interface CexQuotesHistorical<
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CexQuotesHistoricalQuote,
> {
  /**
   * The CoinMarketCap exchange ID.
   */
  id: number;

  /**
   * The exchange name.
   */
  name: string;

  /**
   * The exchange slug.
   */
  slug: string;

  /**
   * An array of quotes for each interval for this exchange.
   */
  quotes: CexQuotesHistoricalQuotes<TQuoteKey, TQuoteValue>[];
}

/**
 * An exchange object for each exchange requested. The map key being the id/slug used in the request.
 * @template TKey - The type of the key for the pair, defaults to `string`.
 * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
 * @template TQuoteValue - The type of the quote value, defaults to `CexQuotesHistoricalQuote`.
 * @see {@link CexQuotesHistorical}
 * @see {@link CexQuotesHistoricalQuote}
 * @see {@link Pair}
 */
export type CexQuotesHistoricalResponse<
  TKey extends string = string,
  TQuoteKey extends string = "USD",
  TQuoteValue extends object = CexQuotesHistoricalQuote,
> = Pair<TKey, CexQuotesHistorical<TQuoteKey, TQuoteValue>>;
