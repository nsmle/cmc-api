import type { CmcStatusResponse } from "@response/status.response";

/**
 * Enumeration of possible error codes returned by the CMC API.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | Error Response Codes}
 * @enum
 */
export enum CmcErrorCode {
  /** This API Key is invalid */
  ApikeyInvalid = 1001,

  /** API key missing */
  ApikeyMissing = 1002,

  /**
   * Your API Key must be activated.
   * Please go to {@link https://pro.coinmarketcap.com/account/plan | CoinMarketCap Account Plan}
   */
  ApikeyPlanRequiresPayment = 1003,

  /** Your API Key's subscription plan has expired */
  ApikeyPlanPaymentExpired = 1004,

  /** An API Key is required for this call */
  ApikeyRequired = 1005,

  /** Your API Key subscription plan doesn't support this endpoint */
  ApikeyPlanNotAuthorized = 1006,

  /** This API Key has been disabled. Please contact support */
  ApikeyDisable = 1007,

  /** You've exceeded your API Key's HTTP request rate limit. Rate limits reset every minute */
  ApikeyPlanMinuteRateLimitReached = 1008,

  /** You've exceeded your API Key's daily rate limit */
  ApikeyPlanDailyRateLimitReached = 1009,

  /** You've exceeded your API Key's monthly rate limit */
  ApikeyPlanMonthlyRateLimitReached = 1010,

  /** You've hit an IP rate limit */
  IpRateLimitReached = 1011,
}

/**
 * Abstract class representing a error of CMC API.
 *
 * @abstract
 * @extends {Error}
 */
export abstract class CmcError extends Error {
  /**
   * A response data associated with the error.
   * @type {unknown}
   */
  public data: unknown;

  /**
   * The error code returned by the CMC API.
   * @type {number | null}
   */
  public errorCode: number | null;

  /**
   * The error message returned by the CMC API.
   * @type {string}
   */
  public errorMessage: string;

  /**
   * The number of credits consumed by the request.
   * @type {number}
   */
  public creditCount: number;

  /**
   * The time elapsed for the request in milliseconds.
   * @type {number}
   */
  public elapsed: number;

  /**
   * Optional notice message returned by the CMC API.
   * @type {string}
   * @optional
   */
  public notice?: string;

  /**
   * The timestamp when the error occurred.
   * @type {string}
   */
  public timestamp: string;

  /**
   * Creates an instance of CmcError.
   *
   * @param {CmcStatusResponse} response - The response object from the CMC API.
   * @param {unknown} data - Additional data associated with the error.
   */
  constructor(response: CmcStatusResponse, data: unknown) {
    super(response.error_message);
    this.data = data;
    this.errorCode = response.error_code;
    this.errorMessage = response.error_message;
    this.creditCount = response.credit_count;
    this.elapsed = response.elapsed;
    this.timestamp = response.timestamp;
    if (this.notice) this.notice = response.notice;
  }
}

/**
 * Error thrown when the provided API key for CoinMarketCap is disabled.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcApikeyDisabledError extends CmcError {}

/**
 * Error thrown when a required API key for CoinMarketCap is missing.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcApikeyRequiredError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap is invalid.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcInvalidError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap is missing.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcMissingError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap's subscription plan has expired.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcPaymentExpiredError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap requires payment.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcPaymentRequiredError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap's subscription plan does not support the endpoint.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcPlanUnauthorizeError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap's subscription plan requires activation.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcDailyRateLimitError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap's subscription plan has reached the daily rate limit.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcIpRateLimitError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap's subscription plan has reached the minute rate limit.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcMinuteRateLimitError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap's subscription plan has reached the monthly rate limit.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcMonthlyRateLimitError extends CmcError {}

/**
 * Error thrown when the provided API key for CoinMarketCap's subscription plan does not support the endpoint or general request errors.
 * @see {@link https://pro.coinmarketcap.com/api/v1#section/Errors-and-Rate-Limits | CoinMarketCap Errors and Rate Limits}
 * @extends {CmcError}
 */
export class CmcRequestError extends CmcError {}
