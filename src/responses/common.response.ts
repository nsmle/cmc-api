import type { Pair, Timestamp } from "@option/common.option";

/**
 * An object containing various resource URLs for this cryptocurrency.
 */
export interface Urls {
  /**
   * Array of website URLs.
   */
  website: string[];

  /**
   * Array of white paper or technical documentation URLs.
   */
  technical_doc: string[];

  /**
   * Array of block explorer URLs.
   */
  explorer: string[];

  /**
   * Array of source code URLs.
   */
  source_code: string[];

  /**
   * Array of message board URLs.
   */
  message_board: string[];

  /**
   * Array of chat service URLs.
   */
  chat: string[];

  /**
   * Array of announcement URLs.
   */
  announcement: string[];

  /**
   * Array of official Twitter(X) profile URLs.
   */
  twitter: string[];

  /**
   * Array of Reddit community page URLs.
   */
  reddit: string[];

  /**
   * Array of Facebook page URLs.
   */
  facebook: string[];
}

/**
 * Represents a contract address coin.
 */
export interface ContractAddressCoin {
  /**
   * The unique CoinMarketCap ID for the contract address coin.
   */
  id: string;

  /**
   * The name of the contract address coin.
   */
  name: string;

  /**
   * The ticker symbol for the contract address coin.
   */
  symbol: string;

  /**
   * The web URL friendly shorthand version of the contract address coin name.
   */
  slug: string;
}

/**
 * Represents the platform of the contract address.
 */
export interface ContractAddressPlatform {
  /**
   * The name of the contract address platform.
   */
  name: string;

  /**
   * The coin of the contract address platform.
   */
  coin: ContractAddressCoin;
}

/**
 * Represents a contract address for a cryptocurrency.
 */
export interface ContractAddress {
  /**
   * The contract address of the cryptocurrency.
   */
  contract_address: string;

  /**
   * The platform of the cryptocurrency.
   */
  platform: ContractAddressPlatform;
}

/**
 * Metadata about the cryptocurrency platform.
 * If the cryptocurrency is not a token, this field will be null.
 */
export interface Platform {
  /**
   * The unique CoinMarketCap ID for the parent platform cryptocurrency.
   */
  id: number;

  /**
   * The name of the parent platform cryptocurrency.
   */
  name: string;

  /**
   * The ticker symbol for the parent platform cryptocurrency.
   */
  symbol: string;

  /**
   * The web URL friendly shorthand version of the parent platform cryptocurrency name.
   */
  slug: string;

  /**
   * The token address on the parent platform cryptocurrency.
   */
  token_address: string;
}

/**
 * Represents a quote for a cryptocurrency.
 */
export interface Quote {
  /**
   * Price in the specified currency for this historical.
   */
  price: number;

  /**
   * Rolling 24 hour adjusted volume in the specified currency.
   */
  volume_24h: number;

  /**
   * 24 hour change in the specified currencies volume.
   */
  volume_change_24h: number;

  /**
   * Rolling 24 hour reported volume in the specified currency.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  volume_24h_reported?: number;

  /**
   * Rolling 7 day adjusted volume in the specified currency.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  volume_7d?: number;

  /**
   * Rolling 7 day reported volume in the specified currency.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  volume_7d_reported?: number;

  /**
   * Rolling 30 day adjusted volume in the specified currency.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  volume_30d?: number;

  /**
   * Rolling 30 day reported volume in the specified currency.
   * *This field is only returned if requested through the `aux` request parameter.*
   */
  volume_30d_reported?: number;

  /**
   * Market cap in the specified currency.
   */
  market_cap: number;

  /**
   * Market cap dominance in the specified currency.
   */
  market_cap_dominance: number;

  /**
   * Fully diluted market cap in the specified currency.
   */
  fully_diluted_market_cap: number;

  /**
   * Total Value Locked
   */
  tvl: number | null;

  /**
   * 1 hour change in the specified currency.
   */
  percent_change_1h: number;

  /**
   * 24 hour change in the specified currency.
   */
  percent_change_24h: number;

  /**
   * 7 day change in the specified currency.
   */
  percent_change_7d: number;

  /**
   * Timestamp (ISO 8601) of when the conversion currency's current value was referenced.
   * *e.g. "2021-09-14T00:00:00.000Z"*
   */
  last_updated: Timestamp;

  /**
   * The quoted price of the cryptocurrency.
   */
  price_quote: number;
}

/**
 * A market quote in the currency conversion option.
 * @template TKey The key type of quote.
 * @template TValue The value type of quote.
 * @see {@link Quote}
 */
export type QuoteMap<TKey extends string = string, TValue = Quote> = Pair<TKey, TValue>;

/**
 * Represents a tag with a slug, name, and category.
 */
export interface Tags {
  /**
   * The web URL friendly shorthand version of the tag name.
   */
  slug: string;

  /**
   * The tag name.
   */
  name: string;

  /**
   * The category of the tag.
   */
  category: string;
}
