import type { Timestamp } from "@option/common.option";
import type { Urls } from "@response/common.response";

/**
 * The aggregated security scan results for a decentralized exchange (DEX) contract.
 */
export interface DexSecurityScanAggregated {
  /**
   * The contract has been verified.
   */
  contract_verified: boolean;

  /**
   * The contract is identified as a honeypot.
   */
  honeypot: boolean;
}

/**
 * The security scan results from a third-party for a decentralized exchange (DEX).
 */
export interface DexSecurityScanThirdParty {
  /**
   * Indicates if the token is involved in an airdrop scam.
   */
  airdrop_scam: boolean;

  /**
   * Indicates if the token has anti-whale mechanisms.
   */
  anti_whale: boolean;

  /**
   * Indicates if the anti-whale mechanisms are modifiable.
   */
  anti_whale_modifiable: boolean;

  /**
   * Indicates if the token is blacklisted.
   */
  blacklisted: boolean;

  /**
   * Indicates if the ownership of the token can be taken back.
   */
  can_take_back_ownership: boolean;

  /**
   * Indicates if the token cannot be bought.
   */
  cannot_buy: boolean;

  /**
   * Indicates if the token cannot be sold completely.
   */
  cannot_sell_all: boolean;

  /**
   * Indicates if the token allows external calls.
   */
  external_call: boolean;

  /**
   * Indicates if the owner of the token is hidden.
   */
  hidden_owner: boolean;

  /**
   * Indicates if the token is a honeypot (a trap set to detect, deflect, or counteract attempts at unauthorized use).
   */
  honeypot: boolean;

  /**
   * Indicates if the token is listed in a decentralized exchange (DEX).
   */
  in_dex: boolean;

  /**
   * Indicates if the token is mintable.
   */
  mintable: boolean;

  /**
   * Indicates if the token is open source.
   */
  open_source: boolean;

  /**
   * Indicates if the owner can change the balance of the token.
   */
  owner_change_balance: boolean;

  /**
   * Indicates if personal slippage is modifiable.
   */
  personal_slippage_modifiable: boolean;

  /**
   * Indicates if the token uses a proxy contract.
   */
  proxy: boolean;

  /**
   * Indicates if the token has a self-destruct function.
   */
  self_destruct: boolean;

  /**
   * Indicates if slippage is modifiable.
   */
  slippage_modifiable: boolean;

  /**
   * Indicates if there is a trading cool-down period.
   */
  trading_cool_down: boolean;

  /**
   * Indicates if the transfer of the token can be paused.
   */
  transfer_pausable: boolean;

  /**
   * Indicates if the token is a true token (not a scam or fake).
   */
  true_token: boolean;

  /**
   * Indicates if the token is on a trust list.
   */
  trust_list: boolean;

  /**
   * Indicates if the token is whitelisted.
   */
  whitelisted: boolean;
}

/**
 * Represents a security scan for a decentralized exchange (DEX).
 * @see {@link DexSecurityScanAggregated}
 * @see {@link DexSecurityScanThirdParty}
 * @template TAggregated - The type for aggregated security scan data. Defaults to `DexSecurityScanAggregated`.
 * @template TThirdParty - The type for third-party security scan data. Defaults to `DexSecurityScanThirdParty`.
 */
export interface DexSecurityScan<TAggregated = DexSecurityScanAggregated, TThirdParty = DexSecurityScanThirdParty> {
  /**
   * The aggregated security scan data.
   */
  aggregated: TAggregated;

  /**
   * The third-party security scan data.
   */
  third_party: TThirdParty;
}

/**
 * A mapping values of a decentralized exchange (DEX) with various attributes.
 */
export interface DexIdMap {
  /**
   * The unique identifier of the DEX
   */
  id: number;

  /**
   * The name of the DEX
   */
  name: string;

  /**
   * The slug representing the network of the DEX
   */
  network_slug: string;

  /**
   * An alternative name for the DEX
   */
  alternativeName?: string;

  /**
   * The identifier of the associated cryptocurrency
   */
  cryptocurrencyId?: string;

  /**
   * The slug representing the associated cryptocurrency
   */
  cryptocurrencySlug?: string;

  /**
   * The URL to explore the DEX pool
   */
  poolExplorerUrl?: string;

  /**
   * The URL to explore the DEX token
   */
  tokenExplorerUrl?: string;

  /**
   * The URL to view the transaction hash
   */
  transactionHashUrl?: string;

  /**
   * The identifier of the wrapped token
   */
  wrappedTokenId?: string;

  /**
   * The slug representing the wrapped token
   */
  wrappedTokenSlug?: string;
}

/**
 * Represents a response containing a map of Dex IDs.
 * @see {@link DexIdMap}
 */
export type DexIdMapResponse = DexIdMap[];

/**
 * The metadata of a decentralized exchange (DEX).
 */
export interface DexMetadata {
  /**
   * Unique identifier for the DEX
   */
  id: number;

  /**
   * Name of the DEX
   */
  name: string;

  /**
   * Slug (URL-friendly name) of the DEX
   */
  slug: string;

  /**
   * URL to the hosted cmc logo of the DEX. *`64px` is default size returned.* \
   * Replace `64x64` in the image path with these alternative sizes: `16`, `32`, `64`, `128`, `200`
   */
  logo: string;

  /**
   * Current status of the DEX, either `"active"` or `"inactive"`
   */
  status: "active" | "inactive";

  /**
   * Notice or announcement related to the DEX, can be `null`
   */
  notice: string | null;

  /**
   * Description of the DEX, can be `null`
   */
  description: string | null;

  /**
   * Optional date when the DEX was launched
   */
  date_launched?: Timestamp;

  /**
   * URLs related to the DEX, including chat, twitter, website, fee, and blog
   */
  urls: Pick<Urls, "chat" | "twitter" | "website"> & {
    fee: string[];
    blog: string[];
  };
}

/**
 * A response containing metadata for multiple decentralized exchanges (DEX).
 * @see {@link DexMetadata}
 */
export type DexMetadataResponse = DexMetadata[];

/**
 * A market quote for a listing on a decentralized exchange (DEX).
 */
export interface DexListingQuote {
  /**
   * The id of specified currency
   */
  convert_id: string;

  /**
   * The timestamp of the last update
   */
  last_updated: Timestamp;

  /**
   * The type of market for the quote. \
   * *Can be `"spot"`, `"perpetual"`, or `"futures"`.*
   */
  market_type: "spot" | "perpetual" | "futures";

  /**
   * The number of transactions in the last 24 hours. \
   * *Can be `null` if the data is not available.*
   */
  num_transactions_24h?: number | null;

  /**
   * The percentage change in volume over the last 24 hours
   */
  percent_change_volume_24h?: number;

  /**
   * Reported 24 hour volume in the specified currency
   */
  volume_24h: number;
}

/**
 * A decentralized exchange (DEX) listing.
 * @see {@link Urls} \
 * @see {@link DexListingQuote}
 * @template TQuote - The type of the quote object, defaults to `DexListingQuote`.
 */
export interface DexListing<TQuote extends object = DexListingQuote> {
  /**
   * The unique identifier for the DEX listing
   */
  id: number;

  /**
   * The URL-friendly name of the DEX
   */
  slug: string;

  /**
   * The name of the DEX
   */
  name: string;

  /**
   * The status of the DEX, either `"active"` or `"inactive"`
   */
  status: "active" | "inactive";

  /**
   * The type of the DEX. \
   * *Can be `"orderbook"`, `"swap"`, or `"aggregator"`.*
   */
  type: "orderbook" | "swap" | "aggregator";

  /**
   * The URL to the hosted cmc logo of the DEX. *`64px` is default size returned.* \
   * *Replace `64x64` in the image path with these alternative sizes: `16`, `32`, `64`, `128`, `200`*
   */
  logo: string;

  /**
   * The description of the DEX, can be `null`
   */
  description: string | null;

  /**
   * Notice or announcement related to the DEX, can be `null`
   */
  notice: string | null;

  /**
   * The 24 hour trading volume in USD
   */
  market_share: number;

  /**
   * The number of market pairs available on the DEX
   */
  num_market_pairs: number;

  /**
   * The date when the DEX was launched
   */
  date_launched?: Timestamp;

  /**
   * The timestamp of the last update
   */
  last_updated: Timestamp;

  /**
   * An array of market quotes
   */
  quote: TQuote[];

  /**
   * Various resource URLs for this DEX
   */
  urls?: Pick<Urls, "chat" | "twitter" | "website"> & {
    /**
     * Array of official web URLs covering exchange fees.
     */
    fee: string[];

    /**
     * Array of official blog URLs
     */
    blog: string[];
  };
}

/**
 * A list of decentralized exchange (DEX) listings.
 * @see {@link DexListing}
 * @see {@link DexListingQuote}
 * @template TQuote - The type of the quote object, which extends the default `DexListingQuote` object.
 */
export type DexListingResponse<TQuote extends object = DexListingQuote> = DexListing<TQuote>[];

/**
 * A market quotes in different currency conversions.
 */
export interface DexQuote {
  /**
   * id of specified currency
   */
  convert_id: string;

  /**
   * The fully diluted value of the asset
   */
  fully_diluted_value: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion
   */
  last_updated: string;

  /**
   * Total liquidity available currently in the specified currency. \
   * *This field will return `null` if not available.*
   */
  liquidity: number | null;

  /**
   * The percentage change in price over the last hour
   */
  percent_change_price_1h: number;

  /**
   * The percentage change in price over the last 24 hours
   */
  percent_change_price_24h: number;

  /**
   * The price in the specified currency for this spot pair
   */
  price: number;

  /**
   * The price of the base asset in quote asset for this spot pair
   */
  price_by_quote_asset: number;

  /**
   * Reported 24 hour volume in the specified spot pair in the specified currency
   */
  volume_24h: number;

  /**
   * The 24 hours buy volume of the asset
   */
  "24h_buy_volume"?: number;

  /**
   * The 24 hours sell volume of the asset
   */
  "24h_sell_volume"?: number;
}

/**
 * Interface representing the quotes for a decentralized exchange (DEX).
 * @see {@link DexQuote}
 * @see {@link DexSecurityScan}
 * @template TQuote - Type of the quote object, extending `DexQuote`.
 * @template TSecurityScan - Type of the security scan object, extending `DexSecurityScan`.
 */
export interface DexQuotes<TQuote extends object = DexQuote, TSecurityScan extends object = DexSecurityScan> {
  /**
   * The contract addres of this base asset in the spot pair
   */
  base_asset_contract_address: string;

  /**
   * The id of this base asset in the spot pair
   */
  base_asset_id: string;

  /**
   * The name of this base asset in the spot pair
   */
  base_asset_name: string;

  /**
   * The symbol of this base asset in the spot pair
   */
  base_asset_symbol: string;

  /**
   * The ucid of this base asset in the spot pair
   */
  base_asset_ucid: string;

  /**
   * Buy tax on the asset
   */
  buy_tax?: number;

  /**
   * The unique contract address for this spot pair
   */
  contract_address: string;

  /**
   * Timestamp (ISO 8601) when we started tracking this asset
   */
  created_at: Timestamp;

  /**
   * Timestamp (ISO 8601) of the launch date for this exchange
   */
  date_launched: Timestamp;

  /**
   * The id of this dex the spot pair is on
   */
  dex_id: string;

  /**
   * The name of this dex the spot pair is on
   */
  dex_slug: string;

  /**
   * Number of holders of the asset
   */
  holders?: number;

  /**
   * Timestamp (ISO 8601) of the last time this record was updated
   */
  last_updated: Timestamp;

  /**
   * The name of this spot pair
   */
  name: string;

  /**
   * The id of the network the spot pair is on
   */
  network_id: string;

  /**
   * The slug of the network the spot pair is on
   */
  network_slug: string;

  /**
   * Number of transactions in past 24 hours
   */
  num_transactions_24h?: number;

  /**
   * Percentage of the base asset in the pool
   */
  percent_pooled_base_asset?: number;

  /**
   * Base asset in the pool
   */
  pool_base_asset?: number;

  /**
   * When the pool of the asset was created
   */
  pool_created?: Timestamp;

  /**
   * Quote asset in the pool
   */
  pool_quote_asset?: number;

  /**
   * Array of market quotes in different currency conversions
   * @see {@link DexQuote}
   */
  quote: TQuote[];

  /**
   * The contract addresss of this quote asset in the spot pair
   */
  quote_asset_contract_address: string;

  /**
   * The id of this quote asset in the spot pair
   */
  quote_asset_id: string;

  /**
   * The name of this quote asset in the spot pair
   */
  quote_asset_name: string;

  /**
   * The symbol of this quote asset in the spot pair
   */
  quote_asset_symbol: string;

  /**
   * The ucid of this quote asset in the spot pair
   */
  quote_asset_ucid: string;

  /**
   * Security scan by Go+ \
   * *Only returned if passed in aux*
   * @see {@link DexSecurityScan}
   */
  security_scan?: TSecurityScan;

  /**
   * Sell tax on the asset
   */
  sell_tax?: number;

  /**
   * Total supply of the base asset
   */
  total_supply_base_asset?: number;

  /**
   * Total supply of the quote asset
   */
  total_supply_quote_asset?: number;

  /**
   * Number of asset buys in the past 24 hours
   */
  "24h_no_of_buys"?: number;

  /**
   * Number of asset sells in the past 24 hours
   */
  "24h_no_of_sells"?: number;

  /**
   * 24 hours volume of the quote asset
   */
  "24h_volume_quote_asset"?: number;
}

/**
 * A response containing an array of decentralized exchange (DEX) quotes.
 * @template TQuote - The type of the quote object. Defaults to `DexQuote`.
 * @template TSecurityScan - The type of the security scan object. Defaults to `DexSecurityScan`.
 */
export type DexQuotesResponse<
  TQuote extends object = DexQuote,
  TSecurityScan extends object = DexSecurityScan,
> = DexQuotes<TQuote, TSecurityScan>[];

/**
 * An market quote for a decentralized exchange (DEX) trade. \
 * *This type extends a subset of properties from `DexQuote`*
 * *and includes additional properties specific to the trade amounts and total value.*
 * @see {@link DexQuote}
 */
export type DexTradeQuote = Pick<DexQuote, "convert_id" | "price" | "price_by_quote_asset"> & {
  /**
   * Amount of base asset traded
   */
  amount_base_asset: number;

  /**
   * Amount of quote asset traded
   */
  amount_quote_asset: number;

  /**
   * Total value of trade in the specified currency
   */
  total: number;
};

/**
 * A decentralized exchange (DEX) trade.
 * @see {@link DexTradeQuote}
 * @template TQuote - The type of the quote object, defaults to `DexTradeQuote`.
 */
export interface DexTrade<TQuote extends object = DexTradeQuote> {
  /**
   * Timestamp (ISO 8601) of specified transaction
   */
  date: Timestamp;

  /**
   * The type of trade, either `"buy"` or `"sell"`
   */
  type: "buy" | "sell";

  /**
   * Transaction hash of the trade. \
   * *Only returned if passed in aux*
   */
  transaction_hash?: string;

  /**
   * Link to the transaction on a blockchain explorer if available \
   * *Only returned if passed in aux*
   */
  blockchain_explorer_link?: string;

  /**
   * An array of market quotes in different currency conversions.
   * @see {@link DexTradeQuote}
   */
  quote: TQuote[];
}

/**
 * A collection of decentralized exchange (DEX) trades.
 * @see {@link DexTrade}
 * @see {@link DexTradeQuote}
 * @see {@link DexSecurityScan}
 * @template TQuote - The type of the quote asset in the trade. Defaults to `DexTradeQuote`.
 * @template TTrade - The type of the trade. Defaults to `DexTrade<TQuote>`.
 * @template TSecurityScan - The type of the security scan object. Defaults to `DexSecurityScan`.
 */
export interface DexTrades<
  TQuote extends object = DexTradeQuote,
  TTrade extends object = DexTrade<TQuote>,
  TSecurityScan extends object = DexSecurityScan,
> {
  /**
   * Number of asset buys in the past 24 hours
   */
  "24h_no_of_buys"?: number;

  /**
   * Number of asset sells in the past 24 hours
   */
  "24h_no_of_sells"?: number;

  /**
   * 24 hours volume of the quote asset
   */
  "24h_volume_quote_asset"?: number | null;

  /**
   * The contract addres of this base asset in the spot pair
   */
  base_asset_contract_address: string;

  /**
   * The id of this base asset in the spot pair
   */
  base_asset_id: string;

  /**
   * The name of this base asset in the spot pair.
   */
  base_asset_name: string;

  /**
   * The symbol of this base asset in the spot pair.
   */
  base_asset_symbol: string;

  /**
   * The ucid of this base asset in the spot pair.
   */
  base_asset_ucid: string;

  /**
   * Buy tax on the asset
   */
  buy_tax?: number;

  /**
   * The unique contract address for this spot pair.
   */
  contract_address: string;

  /**
   * Timestamp (ISO 8601) when we started tracking this asset.
   */
  created_at: Timestamp;

  /**
   * Timestamp (ISO 8601) of the launch date for this exchange.
   */
  date_launched: Timestamp;

  /**
   * The id of this dex the spot pair is on.
   */
  dex_id: string;

  /**
   * The name of this dex the spot pair is on.
   */
  dex_slug: string;

  /**
   * Number of holders of the asset
   */
  holders?: number;

  /**
   * Timestamp (ISO 8601) of the last time this record was updated.
   */
  last_updated: Timestamp;

  /**
   * The name of this spot pair.
   */
  name: string;

  /**
   * The id of the network the spot pair is on.
   */
  network_id: string;

  /**
   * The slug of the network the spot pair is on.
   */
  network_slug: string;

  /**
   * Number of transactions in past 24 hours
   */
  num_transactions_24h?: number;

  /**
   * Percentage of the base asset in the pool
   */
  percent_pooled_base_asset?: number;

  /**
   * Base asset in the pool
   */
  pool_base_asset?: number;

  /**
   * When the pool of the asset was created
   */
  pool_created?: Timestamp;

  /**
   * Quote asset in the pool
   */
  pool_quote_asset?: number;

  /**
   * The contract addresss of this quote asset in the spot pair.
   */
  quote_asset_contract_address: string;

  /**
   * The id of this quote asset in the spot pair.
   */
  quote_asset_id: string;

  /**
   * The name of this quote asset in the spot pair.
   */
  quote_asset_name: string;

  /**
   * The symbol of this quote asset in the spot pair.
   */
  quote_asset_symbol: string;

  /**
   * The ucid of this quote asset in the spot pair.
   */
  quote_asset_ucid: string;

  /**
   * Security scan by Go+
   */
  security_scan?: TSecurityScan[];

  /**
   * Sell tax on the asset
   */
  sell_tax?: number;

  /**
   * Total supply of the quote asset
   */
  total_supply_base_asset?: number;

  /**
   * Total supply of the quote asset
   */
  total_supply_quote_asset?: number;

  /**
   * A array of market quotes in different currency conversions.
   */
  trades: TTrade[];
}

/**
 * A response containing an array of decentralized exchange (DEX) trades.
 * @see {@link DexTrade}
 * @see {@link DexTrades}
 * @see {@link DexTradeQuote}
 * @see {@link DexSecurityScan}
 * @template TQuote - The type of the quote object, extending from `DexTradeQuote`.
 * @template TTrade - The type of the trade object, extending from `DexTrade` with `TQuote`.
 * @template TSecurityScan - The type of the security scan object, extending from `DexSecurityScan`.
 */
export type DexTradesResponse<
  TQuote extends object = DexTradeQuote,
  TTrade extends object = DexTrade<TQuote>,
  TSecurityScan extends object = DexSecurityScan,
> = DexTrades<TQuote, TTrade, TSecurityScan>[];

/**
 * A quote for a DEX (Decentralized Exchange) pair.
 */
export interface DexPairQuote {
  /**
   * 24 hours buy volume of the asset
   */
  "24h_buy_volume"?: number;

  /**
   * 24 hours sell volume of the asset
   */
  "24h_sell_volume"?: number;

  /**
   * id of specified currency
   */
  convert_id: string;

  /**
   * The fully diluted value of the asset.
   */
  fully_diluted_value: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced for this conversion
   */
  last_updated: string;

  /**
   * Total liquidity available currently in the specified currency. \
   * *This field will return `null` if not available.*
   */
  liquidity?: number | null;

  /**
   * 1 hour price change percentage in the specified spot pair in the specified currency
   */
  percent_change_price_1h: number;

  /**
   * 24 hour price change percentage in the specified spot pair in the specified currency
   */
  percent_change_price_24h: number;

  /**
   * Price in the specified currency for this spot pair
   */
  price: number;

  /**
   * Price of the base asset in quote asset for this spot pair
   */
  price_by_quote_asset: number;

  /**
   * Reported 24 hour volume in the specified spot pair in the specified currency
   */
  volume_24h: number;
}

/**
 * A DEX (Decentralized Exchange) pair.
 */
export interface DexPairs<TQuote extends object = DexPairQuote, TSecurityScan extends object = DexSecurityScan> {
  /**
   * Number of asset buys in the past 24 hours
   */
  "24h_no_of_buys"?: number;

  /**
   * Number of asset sells in the past 24 hours
   */
  "24h_no_of_sells"?: number;

  /**
   * 24 hours volume of the quote asset
   */
  "24h_volume_quote_asset"?: number;

  /**
   * The contract addres of this base asset in the spot pair
   */
  base_asset_contract_address: string;

  /**
   * The id of this base asset in the spot pair
   */
  base_asset_id: string;

  /**
   * The name of this base asset in the spot pair
   */
  base_asset_name: string;

  /**
   * The symbol of this base asset in the spot pair
   */
  base_asset_symbol: string;

  /**
   * The ucid of this base asset in the spot pair
   */
  base_asset_ucid: string;

  /**
   * Buy tax on the asset
   */
  buy_tax?: number;

  /**
   * The unique contract address for this spot pair
   */
  contract_address: string;

  /**
   * Timestamp (ISO 8601) when we started tracking this asset
   */
  created_at: Timestamp;

  /**
   * Timestamp (ISO 8601) of the launch date for this exchange
   */
  date_launched: Timestamp;

  /**
   * The id of this dex the spot pair is on
   */
  dex_id: string;

  /**
   * The short name of this dex the spot pair is on
   */
  dex_slug: string;

  /**
   * Number of holders of the asset
   */
  holders?: number;

  /**
   * Timestamp (ISO 8601) of the last time this record was updated
   */
  last_updated: Timestamp;

  /**
   * The name of this spot pair
   */
  name: string;

  /**
   * The id of the network the spot pair is on
   */
  network_id: string;

  /**
   * The slug of the network the spot pair is on
   */
  network_slug: string;

  /**
   * Number of transactions in past 24 hours
   */
  num_transactions_24h?: number;

  /**
   * Percentage of the base asset in the pool
   */
  percent_pooled_base_asset?: number;

  /**
   * Base asset in the pool
   */
  pool_base_asset?: number;

  /**
   * When the pool of the asset was created
   */
  pool_created: Timestamp;

  /**
   * Quote asset in the pool
   */
  pool_quote_asset?: number;

  /**
   * An array of market quotes in different currency conversions
   */
  quote: TQuote[];

  /**
   * The contract addresss of this quote asset in the spot pair
   */
  quote_asset_contract_address: string;

  /**
   * The id of this quote asset in the spot pair
   */
  quote_asset_id: string;

  /**
   * The name of this quote asset in the spot pair
   */
  quote_asset_name: string;

  /**
   * The symbol of this quote asset in the spot pair
   */
  quote_asset_symbol: string;

  /**
   * The ucid of this quote asset in the spot pair
   */
  quote_asset_ucid: string;

  /**
   * A unique identifier used to fetch the next batch of results from the next API related API call, if applicable. \
   * *`scroll_id` is an alternative to traditional pagingation techniques.*
   */
  scroll_id: string;

  /**
   * Security scan by Go+ \
   * *Only returned if passed in aux*
   * @see {@link DexSecurityScan}
   */
  security_scan?: TSecurityScan[];

  /**
   * Sell tax on the asset
   */
  sell_tax?: number;

  /**
   * Total supply of the quote asset
   */
  total_supply_base_asset?: number;

  /**
   * Total supply of the quote asset
   */
  total_supply_quote_asset?: number;
}

/**
 * An array response of DEX (Decentralized Exchange) pairs.
 * @see {@link DexPairs}
 * @see {@link DexPairQuote}
 * @see {@link DexSecurityScan}
 * @template TQuote - The type of the quote object, extending from `DexPairQuote`.
 * @template TSecurityScan - The type of the security scan object, extending from `DexSecurityScan`.
 */
export type DexPairsResponse<
  TQuote extends object = DexPairQuote,
  TSecurityScan extends object = DexSecurityScan,
> = DexPairs<TQuote, TSecurityScan>[];

/**
 * Represents a Dex OHLCV (Open, High, Low, Close, Volume) Quote. \
 * *This type is a combination of selected properties from `DexQuote` and additional OHLCV properties.*
 * @see {@link DexQuote}
 */
export type DexOhlcvQuote = Pick<DexQuote, "24h_buy_volume" | "24h_sell_volume" | "convert_id" | "last_updated"> & {
  /**
   * Latest price today in UTC time for the convert option requested. \
   * *This is not the final price during close as the current day period is not over.*
   */
  close: number;

  /**
   * Highest price so far today in UTC time for the convert option requested.
   */
  high: number;

  /**
   * Lowest price today in UTC time for the convert option requested.
   */
  low: number;

  /**
   * Price from first datapoint of today in UTC time for the convert option requested.
   */
  open: number;

  /**
   * Adjusted volume for this time series interval.
   */
  volume: number;
};

/**
 * A Dex OHLCV (Open, High, Low, Close, Volume) response.
 * @see {@link DexOhlcvQuote}
 * @see {@link DexSecurityScan}
 * @template TQuote - The type of the quote object, defaults to `DexOhlcvQuote`.
 * @template TSecurityScan - The type of the security scan object, defaults to `DexSecurityScan`.
 */
export interface DexOhlcv<TQuote extends object = DexOhlcvQuote, TSecurityScan extends object = DexSecurityScan> {
  /**
   * Number of asset buys in the past 24 hours.
   */
  "24h_no_of_buys"?: number;

  /**
   * Number of asset sells in the past 24 hours.
   */
  "24h_no_of_sells"?: number;

  /**
   * 24 hours volume of the quote asset.
   */
  "24h_volume_quote_asset"?: number | null;

  /**
   * The contract addres of this base asset in the spot pair.
   */
  base_asset_contract_address: string;

  /**
   * The id of this base asset in the spot pair.
   */
  base_asset_id: string;

  /**
   * The name of this base asset in the spot pair.
   */
  base_asset_name: string;

  /**
   * The symbol of this base asset in the spot pair.
   */
  base_asset_symbol: string;

  /**
   * The ucid of this base asset in the spot pair.
   */
  base_asset_ucid: string;

  /**
   * Buy tax on the asset.
   */
  buy_tax?: number;

  /**
   * The unique contract address for this spot pair.
   */
  contract_address: string;

  /**
   * Timestamp (ISO 8601) when we started tracking this asset.
   */
  created_at: Timestamp;

  /**
   * Timestamp (ISO 8601) of the launch date for this exchange.
   */
  date_launched: Timestamp;

  /**
   * The id of this dex the spot pair is on.
   */
  dex_id: string;

  /**
   * The name of this dex the spot pair is on.
   */
  dex_slug: string;

  /**
   * Number of holders of the asset.
   */
  holders?: number;

  /**
   * Timestamp (ISO 8601) of the last time this record was updated.
   */
  last_updated: Timestamp;

  /**
   * The name of this spot pair.
   */
  name: string;

  /**
   * The id of the network the spot pair is on.
   */
  network_id: string;

  /**
   * The slug of the network the spot pair is on.
   */
  network_slug: string;

  /**
   * Number of transactions in past 24 hours.
   */
  num_transactions_24h?: number;

  /**
   * Percentage of the base asset in the pool.
   */
  percent_pooled_base_asset?: number;

  /**
   * Base asset in the pool.
   */
  pool_base_asset?: number;

  /**
   * When the pool of the asset was created.
   */
  pool_created?: Timestamp;

  /**
   * Quote asset in the pool.
   */
  pool_quote_asset?: number;

  /**
   * Array of market quotes in different currency conversions.
   */
  quote: TQuote[];

  /**
   * The contract addresss of this quote asset in the spot pair.
   */
  quote_asset_contract_address: string;

  /**
   * The id of this quote asset in the spot pair.
   */
  quote_asset_id: string;

  /**
   * The name of this quote asset in the spot pair.
   */
  quote_asset_name: string;

  /**
   * The symbol of this quote asset in the spot pair.
   */
  quote_asset_symbol: string;

  /**
   * The ucid of this quote asset in the spot pair.
   */
  quote_asset_ucid: string;

  /**
   * Security scan by Go+
   * @see {@link DexSecurityScan}
   */
  security_scan?: TSecurityScan[];

  /**
   * Sell tax on the asset
   */
  sell_tax?: number;

  /**
   * Timestamp (ISO 8601) of the end of this OHLCV period. \
   * *Always `null` as the current day is incomplete.* \
   * *See last_updated for the last UTC time included in the current OHLCV calculation.*
   */
  time_close: Timestamp | null;

  /**
   * Timestamp (ISO 8601) of the start of this OHLCV period.
   */
  time_open: Timestamp;

  /**
   * Total supply of the quote asset.
   */
  total_supply_base_asset?: number;

  /**
   * Total supply of the quote asset.
   */
  total_supply_quote_asset?: number;
}

/**
 * The response type for Dex OHLCV (Open, High, Low, Close, Volume) data.
 * @see {@link DexOhlcv}
 * @see {@link DexOhlcvQuote}
 * @see {@link DexSecurityScan}
 * @template TQuote - The type of the quote object, defaults to `DexOhlcvQuote`.
 * @template TSecurityScan - The type of the security scan object, defaults to `DexSecurityScan`.
 */
export type DexOhlcvResponse<
  TQuote extends object = DexOhlcvQuote,
  TSecurityScan extends object = DexSecurityScan,
> = DexOhlcv<TQuote, TSecurityScan>[];

/**
 * A historical quotes for a decentralized exchange (DEX).
 * @see {@link DexOhlcvQuote}
 * @template TQuote - The type of the quote objects, extending from `DexOhlcvQuote`.
 */
export interface DexOhlcvHistoricalQuotes<TQuote extends object = DexOhlcvQuote> {
  /**
   * An array of quote objects
   * @see {@link DexOhlcvQuote}
   */
  quote: TQuote[];

  /**
   * Timestamp (ISO 8601) of the end of this OHLCV period. \
   * *Always `null` as the current day is incomplete.* \
   * *See last_updated for the last UTC time included in the current OHLCV calculation.*
   */
  time_close: Timestamp;

  /**
   * Timestamp (ISO 8601) of the start of this OHLCV period.
   */
  time_open: Timestamp;
}

/**
 * A historical OHLCV (Open, High, Low, Close, Volume) data for a decentralized exchange (DEX).
 * @see {@link DexOhlcvHistoricalQuotes}
 * @see {@link DexSecurityScan}
 * @template TQuotes - The type of the quote objects, extending from `DexOhlcvHistoricalQuotes`.
 * @template TSecurityScan - The type of the security scan object, extending from `DexSecurityScan`.
 */
export interface DexOhlcvHistorical<
  TQuotes extends object = DexOhlcvHistoricalQuotes,
  TSecurityScan extends object = DexSecurityScan,
> {
  /**
   * Number of asset buys in the past 24 hours.
   */
  "24h_no_of_buys"?: number;

  /**
   * Number of asset sells in the past 24 hours.
   */
  "24h_no_of_sells"?: number;

  /**
   * 24 hours volume of the quote asset.
   */
  "24h_volume_quote_asset"?: number;

  /**
   * The contract addres of this base asset in the spot pair.
   */
  base_asset_contract_address: string;

  /**
   * The id of this base asset in the spot pair.
   */
  base_asset_id: string;

  /**
   * The name of this base asset in the spot pair.
   */
  base_asset_name: string;

  /**
   * The symbol of this base asset in the spot pair.
   */
  base_asset_symbol: string;

  /**
   * The ucid of this base asset in the spot pair.
   */
  base_asset_ucid: string;

  /**
   * Buy tax on the asset.
   */
  buy_tax?: number;

  /**
   * The unique contract address for this spot pair.
   */
  contract_address: string;

  /**
   * Timestamp (ISO 8601) when we started tracking this asset.
   */
  created_at: Timestamp;

  /**
   * Timestamp (ISO 8601) of the launch date for this exchange.
   */
  date_launched: Timestamp;

  /**
   * The id of this dex the spot pair is on.
   */
  dex_id: string;

  /**
   * The name of this dex the spot pair is on.
   */
  dex_slug: string;

  /**
   * Number of holders of the asset
   */
  holders?: number;

  /**
   * Timestamp (ISO 8601) of the last time this record was updated.
   */
  last_updated: Timestamp;

  /**
   * The name of this spot pair.
   */
  name: string;

  /**
   * The id of the network the spot pair is on.
   */
  network_id: string;

  /**
   * The slug of the network the spot pair is on.
   */
  network_slug: string;

  /**
   * Number of transactions in past 24 hours
   */
  num_transactions_24h?: number;

  /**
   * Percentage of the base asset in the pool
   */
  percent_pooled_base_asset?: number;

  /**
   * Base asset in the pool
   */
  pool_base_asset?: number;

  /**
   * When the pool of the asset was created
   */
  pool_created?: Timestamp;

  /**
   * Quote asset in the pool
   */
  pool_quote_asset?: number;

  /**
   * The contract addresss of this quote asset in the spot pair.
   */
  quote_asset_contract_address: string;

  /**
   * The id of this quote asset in the spot pair.
   */
  quote_asset_id: string;

  /**
   * The name of this quote asset in the spot pair.
   */
  quote_asset_name: string;

  /**
   * The symbol of this quote asset in the spot pair.
   */
  quote_asset_symbol: string;

  /**
   * The ucid of this quote asset in the spot pair.
   */
  quote_asset_ucid: string;

  /**
   * An array of historical quotes for the spot pair.
   * @see {@link DexOhlcvHistoricalQuotes}
   */
  quotes: TQuotes[];

  /**
   * Security scan by Go+
   * @see {@link DexSecurityScan}
   */
  security_scan?: TSecurityScan[];

  /**
   * Sell tax on the asset
   */
  sell_tax?: number;

  /**
   * Total supply of the quote asset
   */
  total_supply_base_asset?: number;

  /**
   * Total supply of the quote asset
   */
  total_supply_quote_asset?: number;
}

/**
 * The response for historical OHLCV (Open, High, Low, Close, Volume) data from a decentralized exchange (DEX).
 * @see {@link DexOhlcvHistorical}
 * @see {@link DexOhlcvHistoricalQuotes}
 * @see {@link DexSecurityScan}
 * @template TQuotes - The type of the quotes object, defaults to `DexOhlcvHistoricalQuotes`.
 * @template TSecurityScan - The type of the security scan object, defaults to `DexSecurityScan`.
 */
export type DexOhlcvHistoricalResponse<
  TQuotes extends object = DexOhlcvHistoricalQuotes,
  TSecurityScan extends object = DexSecurityScan,
> = DexOhlcvHistorical<TQuotes, TSecurityScan>[];
