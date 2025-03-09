import type { Timestamp } from "@option/common.type";

/**
 * An rate limit and daily/monthly credit limit details for your API Key.
 */
export interface MiscKeyInfoPlan {
  /**
   * The number of API credits that can be used each monthly period before receiving a HTTP `429` rate limit error. \
   * *This limit is based on the API plan tier.*
   */
  credit_limit_monthly: number;

  /**
   * A human readable countdown of when the API key monthly credit limit will reset back to `0`.
   */
  credit_limit_monthly_reset: string;

  /**
   * Timestamp (ISO 8601) of when the monthly credit limit will reset. \
   * *This is based on your billing plan activation date for premium subscription based keys or calendar month UTC midnight for free Basic plan keys.*
   */
  credit_limit_monthly_reset_timestamp: Timestamp;

  /**
   * The number of API calls that can be made within the same UTC minute before receiving a HTTP `429` rate limit error. \
   * *This limit is based on the API plan tier.*
   */
  rate_limit_minute: number;
}

/**
 * A live usage details about your API Key.
 */
export interface MiscKeyInfoUsage {
  /**
   * Usage stats around the minute based rate limit.
   */
  current_minute: {
    /**
     * The number of API calls that have been made in the current UTC minute.
     */
    requests_made: number;

    /**
     * The number of remaining API calls that can be made in the current UTC minute before receiving a HTTP `429` rate limit error. \
     * *This limit resets each UTC minute.*
     */
    requests_left: number;
  };

  /**
   * Usage stats around the daily API credit limit.
   */
  current_day: {
    /**
     * The number of API credits used during the current daily period.
     */
    credits_used: number;

    /**
     * The number of remaining API credits that can be used during the current daily period before receiving a HTTP 429 rate limit error. \
     * *This limit resets at the end of each daily period.*
     */
    credits_left: number;
  };

  /**
   * Usage stats around the monthly API credit limit.
   */
  current_month: {
    /**
     * The number of API credits used during the current monthly period.
     */
    credits_used: number;

    /**
     * The number of remaining API credits that can be used during the current monthly period before receiving a HTTP 429 rate limit error. \
     * *This limit resets at the end of each monthly period.*
     */
    credits_left: number;
  };
}

/**
 * Details about your API key are returned in this object.
 * @see {@link MiscKeyInfoPlan}
 * @see {@link MiscKeyInfoUsage}
 */
export interface MiscKeyInfo {
  /**
   * An rate limit and daily/monthly credit limit details for your API Key.
   */
  plan: MiscKeyInfoPlan;

  /**
   * A live usage details about your API Key.
   */
  usage: MiscKeyInfoUsage;
}

/**
 * The response object represents the details about your API key.
 * @see {@link MiscKeyInfo}
 */
export type MiscKeyInfoResponse = MiscKeyInfo;

/**
 * A fiat currency supported by CoinMarketCap.
 */
export interface MiscFiat {
  /**
   * The unique CoinMarketCap ID for this asset.
   */
  id: number;

  /**
   * The name of this asset.
   */
  name: string;

  /**
   * The currency sign for this asset.
   */
  sign: string;

  /**
   * The ticker symbol for this asset, always in all caps.
   */
  symbol: string;
}

/**
 * The response object represents a list of fiat currencies supported by CoinMarketCap.
 * @see {@link MiscFiat}
 */
export type MiscFiatsResponse = MiscFiat[];

/**
 * Market value conversion quote for a specific currency.
 */
export interface MiscPriceConversionQuote {
  /**
   * Converted price in terms of the quoted currency and historic time (if supplied).
   */
  price: number;

  /**
   * Timestamp (ISO 8601) of when the destination currency's market value was recorded.
   */
  last_updated: Timestamp;
}

/**
 * A conversion of a base currency to a specific quote currency.
 * @template TQuoteKey - The key of the quote currency.
 * @template TQuoteValue - The value of the quote currency.
 * @see {@link MiscPriceConversionQuote}
 */
export interface MiscPriceConversion<
  TQuoteKey extends string = string,
  TQuoteValue extends object = MiscPriceConversionQuote,
> {
  /**
   * The unique CoinMarketCap ID for your base currency.
   */
  id: number;

  /**
   * The name of your base currency.
   */
  name: string;

  /**
   * The symbol for your base currency.
   */
  symbol: string;

  /**
   * Amount of base currency to convert from.
   */
  amount: number;

  /**
   * Timestamp (ISO 8601) of when the referenced market value of the base currency was recorded.
   */
  last_updated: Timestamp;

  /**
   * An object map of price conversions.
   */
  quote: Record<TQuoteKey, TQuoteValue>;
}

/**
 * The response object represents a conversion of a base currency to a specific quote currency.
 * @template TQuoteKey - The key of the quote currency.
 * @template TQuoteValue - The value of the quote currency.
 * @see {@link MiscPriceConversion}
 * @see {@link MiscPriceConversionQuote}
 */
export type MiscPriceConversionResponse<
  TQuoteKey extends string = string,
  TQuoteValue extends object = MiscPriceConversionQuote,
> = MiscPriceConversion<TQuoteKey, TQuoteValue>;
