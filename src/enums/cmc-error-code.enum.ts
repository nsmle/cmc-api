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
