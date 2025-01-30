import { CmcApikeyDisabledError } from "@error/cmc-apikey-disabled.error";
import { CmcApikeyRequiredError } from "@error/cmc-apikey-required.error";
import { CmcInvalidError } from "@error/cmc-invalid.error";
import { CmcMissingError } from "@error/cmc-missing.error";
import { CmcPaymentExpiredError } from "@error/cmc-payment-expired.error";
import { CmcPaymentRequiredError } from "@error/cmc-payment-required.error";
import { CmcPlanUnauthorizeError } from "@error/cmc-plan-unauthorize.error";
import { CmcDailyRateLimitError } from "@error/cmc-rate-limit-daily.error";
import { CmcIpRateLimitError } from "@error/cmc-rate-limit-ip.error";
import { CmcMinuteRateLimitError } from "@error/cmc-rate-limit-minute.error";
import { CmcMonthlyRateLimitError } from "@error/cmc-rate-limit-monthly.error";
import { CmcRequestError } from "@error/cmc-request.error";
import { CmcErrorCode } from "@error/cmc.error";
import { Pair } from "@option/common.type";
import { CmcErrorClass, CmcResponseStatus } from "@response/status.response";

/**
 * The `Client` class provides methods to interact with the CoinMarketCap API.
 * It allows sending HTTP GET requests, setting API keys, and handling errors.
 *
 * @remarks
 * This class includes methods for generating URIs with query parameters,
 * generating HTTP headers, and handling various error codes returned by the API.
 *
 * @example
 * ```typescript
 * import { CoinMarketCapApi } from "cmc-api";
 *
 * const apikey = process.env.COINMARKETCAP_APIKEY;
 * const cmc = new CoinMarketCapApi(apikey);
 *
 * const data = await client.req('/v1/cryptocurrency/map');
 *
 * console.log(data);
 */
export class Client {
  /**
   * The base URL for the API client.
   * This URL is used as the root for all API requests made by the client.
   */
  private baseURL: string;

  /**
   * The API key used for authenticating requests to the service.
   * @protected
   */
  protected apikey: string;

  /**
   * Represents the status of the CMC response.
   */
  protected status: CmcResponseStatus;

  /**
   * A collection of base URLs for the CoinMarketCap API.
   * @readonly
   * @see {@link https://pro.coinmarketcap.com/api/v1#section/Quick-Start-Guide | Quick Start Guide}
   */
  public static readonly BaseURL = {
    Sandbox: "https://sandbox-api.coinmarketcap.com",
    Pro: "https://pro-api.coinmarketcap.com",
  };

  constructor() {
    if (!this.baseURL) this.baseURL = Client.BaseURL.Pro;
  }

  /**
   * Sends an HTTP GET request to the specified endpoint with optional query parameters and headers.
   *
   * @template TData - The expected type of the response data.
   * @template TQuery - The type of the query parameters, defaults to `Pair<string, string>`.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TQuery} [query] - Optional query parameters to include in the request.
   * @param {Pair<string, string>} [headers] - Optional headers to include in the request.
   * @returns {Promise<TData>} - A promise that resolves to the response data of type `TData`.
   * @throws {CmcErrorClass} Will throw an error if the response status indicates an error.
   */
  public async req<TData = any, TQuery = Pair<string, string>>(
    endpoint: string,
    query?: TQuery,
    headers?: Pair<string, string>,
  ): Promise<TData> {
    const request = await fetch(this.genUri(endpoint, query), {
      method: "GET",
      headers: this.genHeaders(headers),
    });

    const result: any = await request.json();
    const status: CmcResponseStatus = result?.status;
    const data: TData = result?.data;

    this.status = status;
    if (status.error_code > 0) throw this.error(status);
    return data;
  }

  /**
   * Sets the API key for the client.
   *
   * @param apiKey - The API key to be set.
   * @example
   * ```typescript
   * const apikey = process.env.COINMARKETCAP_APIKEY;
   * const cmc = new CoinMarketCapApi(apikey);
   * cmc.client.setApiKey('dfa3195f-f1d4-f1c1-a1fa-83461b5f42eb');
   * ```
   */
  public setApiKey(apiKey: string): void {
    this.apikey = apiKey;
  }

  /**
   * Sets the base URL for the client.
   *
   * @param {string} baseUrl - The base URL to be set.
   * @example
   * ```typescript
   * const apikey = process.env.COINMARKETCAP_APIKEY;
   * const cmc = new CoinMarketCapApi(apikey);
   * cmc.client.setBaseUrl('https://sandbox-api.coinmarketcap.com');
   * ```
   */
  public setBaseUrl(baseUrl: string): void {
    this.baseURL = baseUrl;
  }

  /**
   * Converts an array of strings or numbers into a single comma-separated string.
   *
   * @template TValues - The type of values in the array, which can be either string or number.
   * @param {TValues[]} array - The array of values to be joined into a comma-separated string.
   * @returns {string} A string with the array values separated by commas.
   */
  public commaSeparate<TValues = string | number>(array: TValues[]): string {
    return array.join(",");
  }

  /**
   * Generates a complete URI with query parameters.
   *
   * @template TQuery - The type of the query parameters, defaults to a pair of strings.
   * @param {string} endpoint - The endpoint to append to the base URL.
   * @param {TQuery} [query] - An optional object containing query parameters as key-value pairs.
   * @returns {URL} - The generated URL with the provided endpoint and query parameters.
   */
  private genUri<TQuery = Pair<string, string>>(endpoint: string, query?: TQuery): URL {
    const uri = new URL(endpoint, this.baseURL);
    for (const key of Object.keys(query)) if (query[key]) uri.searchParams.append(key, query[key]);
    return uri;
  }

  /**
   * Generates HTTP headers for the API request.
   *
   * @param additionHeaders - An object containing additional headers to be included in the request.
   * @returns A Headers object with the API key and any additional headers appended.
   *
   * @see {@link Pair}
   * @see {@link Headers}
   */
  private genHeaders(additionHeaders: Pair<string, string>): Headers {
    const headers = new Headers();
    headers.append("X-CMC_PRO_API_KEY", this.apikey);
    if (additionHeaders) for (const key of Object.keys(additionHeaders)) headers.append(key, additionHeaders[key]);
    return headers;
  }

  /**
   * Handles errors based on the provided {@link CmcResponseStatus} and returns an appropriate {@link CmcErrorClass} instance.
   *
   * @param {CmcResponseStatus} status - The status object containing the error code and other relevant information.
   * @param {any} data - Optional additional data related to the error.
   * @returns An instance of a class extending {@link CmcErrorClass} that corresponds to the specific error code.
   *
   * The method maps the following error codes to their respective error classes:
   * - {@link CmcErrorCode.ApikeyInvalid} for {@link CmcInvalidError}
   * - {@link CmcErrorCode.ApikeyMissing} for {@link CmcMissingError}
   * - {@link CmcErrorCode.ApikeyPlanRequiresPayment} for {@link CmcPaymentRequiredError}
   * - {@link CmcErrorCode.ApikeyPlanPaymentExpired} for {@link CmcPaymentExpiredError}
   * - {@link CmcErrorCode.ApikeyRequired} for {@link CmcApikeyRequiredError}
   * - {@link CmcErrorCode.ApikeyPlanNotAuthorized} for {@link CmcPlanUnauthorizeError}
   * - {@link CmcErrorCode.ApikeyDisable} for {@link CmcApikeyDisabledError}
   * - {@link CmcErrorCode.ApikeyPlanMinuteRateLimitReached} for {@link CmcMinuteRateLimitError}
   * - {@link CmcErrorCode.ApikeyPlanDailyRateLimitReached} for {@link CmcDailyRateLimitError}
   * - {@link CmcErrorCode.ApikeyPlanMonthlyRateLimitReached} for {@link CmcMonthlyRateLimitError}
   * - {@link CmcErrorCode.IpRateLimitReached} for {@link CmcIpRateLimitError}
   *
   * If the error code does not match any of the above, a generic {@link CmcRequestError} is returned.
   */
  private error(status: CmcResponseStatus, data?: any): CmcErrorClass {
    switch (status.error_code) {
      case CmcErrorCode.ApikeyInvalid:
        return new CmcInvalidError(status, data);
      case CmcErrorCode.ApikeyMissing:
        return new CmcMissingError(status, data);
      case CmcErrorCode.ApikeyPlanRequiresPayment:
        return new CmcPaymentRequiredError(status, data);
      case CmcErrorCode.ApikeyPlanPaymentExpired:
        return new CmcPaymentExpiredError(status, data);
      case CmcErrorCode.ApikeyRequired:
        return new CmcApikeyRequiredError(status, data);
      case CmcErrorCode.ApikeyPlanNotAuthorized:
        return new CmcPlanUnauthorizeError(status, data);
      case CmcErrorCode.ApikeyDisable:
        return new CmcApikeyDisabledError(status, data);
      case CmcErrorCode.ApikeyPlanMinuteRateLimitReached:
        return new CmcMinuteRateLimitError(status, data);
      case CmcErrorCode.ApikeyPlanDailyRateLimitReached:
        return new CmcDailyRateLimitError(status, data);
      case CmcErrorCode.ApikeyPlanMonthlyRateLimitReached:
        return new CmcMonthlyRateLimitError(status, data);
      case CmcErrorCode.IpRateLimitReached:
        return new CmcIpRateLimitError(status, data);
    }

    return new CmcRequestError(status, data);
  }
}
