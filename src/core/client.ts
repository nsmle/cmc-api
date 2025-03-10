import {
  CmcApikeyDisabledError,
  CmcApikeyRequiredError,
  CmcDailyRateLimitError,
  CmcErrorCode,
  CmcInvalidError,
  CmcIpRateLimitError,
  CmcMinuteRateLimitError,
  CmcMissingError,
  CmcMonthlyRateLimitError,
  CmcPaymentExpiredError,
  CmcPaymentRequiredError,
  CmcPlanUnauthorizeError,
  CmcRequestError,
} from "@core/errors";
import { Enumerable } from "@util/decorators.util";
import type { CmcBaseResponse, CmcErrorClass, CmcStatusResponse } from "@response/status.response";

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
 * const data = await cmc.client.req('/v1/cryptocurrency/map');
 * console.log(data);
 * ```
 */
export class Client {
  /**
   * The base URL for the API client.
   * This URL is used as the root for all API requests made by the client.
   * @internal @private
   */
  @Enumerable(false)
  private baseURL: string;

  /**
   * The API key used for authenticating requests to the service.
   * @internal @private
   */
  @Enumerable(false)
  private apikey: string;

  /**
   * Represents the status of the CMC response.
   */
  public status: CmcStatusResponse;

  /**
   * Callback function to handle errors that occur during a request.
   *
   * @param request - The URL of the request that caused the error.
   * @param response - The response object associated with the error.
   */
  public onError: (request: URL, response: unknown) => void;

  /**
   * The API key used for accessing the sandbox environment of the service.
   * This key is intended for testing purposes and should not be used in production.
   * @internal @private
   * @constant {string}
   */
  private static readonly SandboxApikey = "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c";

  /**
   * A collection of base URLs for the CoinMarketCap API.
   * @readonly @internal @private
   * @see {@link https://pro.coinmarketcap.com/api/v1#section/Quick-Start-Guide | Quick Start Guide}
   */
  private static readonly BaseURL = {
    Sandbox: "https://sandbox-api.coinmarketcap.com",
    Pro: "https://pro-api.coinmarketcap.com",
  };

  /**
   * Initializes a new instance of the `Client` class.
   * The constructor sets the base URL to the Pro API by default.
   */
  constructor() {
    if (!this.baseURL) this.baseURL = Client.BaseURL.Pro;
  }

  /**
   * Send an HTTP GET request to the specified endpoint with optional query parameters and headers.
   *
   * @template TData - The expected type of the response data.
   * @template TQuery - The type of the query parameters, defaults to `Record<string, string | number | (string | number)[] | boolean>`.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TQuery} [query] - Optional query parameters to include in the request.
   * @param {Record<string, string>} [headers] - Optional headers to include in the request.
   * @returns {Promise<TData>} - A promise that resolves to the response data of type `TData`.
   * @throws {CmcErrorClass} Will throw an error if the response status indicates an error.
   */
  public async req<TData = unknown, TQuery = Record<string, string | number | (string | number)[] | boolean>>(
    endpoint: string,
    query?: TQuery,
    headers?: Record<string, string>,
  ): Promise<TData> {
    const uri = this.genUri(endpoint, query);
    const requestInit = { method: "GET", headers: this.genHeaders(headers) };
    const request = await fetch(uri, requestInit);

    const result: CmcBaseResponse<TData> = await request.json();
    const status: CmcStatusResponse = result?.data?.status || result?.status;
    const data: TData = (result?.data?.data || result?.data) as TData;

    this.status = status;
    if (this.onError && (!status || status?.error_code > 0)) this.onError(uri, result);
    if (status?.error_code > 0) throw this.error(data);
    return (data ?? result) as TData;
  }

  /**
   * Set the API key for the client.
   *
   * @param apiKey - The API key to be set.
   * @returns The client instance with the API key set.
   * @example
   * ```typescript
   * const apikey = process.env.COINMARKETCAP_APIKEY;
   * const cmc = new CoinMarketCapApi(apikey);
   * cmc.client.setApiKey('dfa3195f-f1d4-f1c1-a1fa-83461b5f42eb');
   * ```
   */
  public setApiKey(apiKey: string): Client {
    this.apikey = apiKey;
    return this;
  }

  /**
   * Set the base URL for the client.
   *
   * @param {string} baseUrl - The base URL to be set.
   * @returns The client instance with the base URL set.
   * @example
   * ```typescript
   * const apikey = process.env.COINMARKETCAP_APIKEY;
   * const cmc = new CoinMarketCapApi(apikey);
   * cmc.client.setBaseUrl('https://sandbox-api.coinmarketcap.com');
   * ```
   */
  public setBaseUrl(baseUrl: string): Client {
    this.baseURL = baseUrl;
    return this;
  }

  /**
   * Converts an array of strings into a single comma-separated string.
   * If the input is already a string, it returns the input as is.
   *
   * @template TValue - The type of the input value, defaults to `string | number | (string | number)[]`.
   * @param {TValue} value - The input which can be either a string or an array of strings.
   * @returns A comma-separated string if the input is an array, otherwise the input string.
   */
  public commaSeparate<TValue = string | number | (string | number)[]>(value: TValue): string {
    return Array.isArray(value) ? value.join(",") : String(value);
  }

  /**
   * Set up the client to use the CoinMarketCap API sandbox environment.
   * This method sets the API key to the sandbox key and the base URL to the sandbox URL.
   * @returns The client instance with the sandbox environment set.
   */
  public sandbox(): Client {
    this.apikey = Client.SandboxApikey;
    this.baseURL = Client.BaseURL.Sandbox;
    return this;
  }

  /**
   * Generates a complete URI with query parameters.
   *
   * @template TQuery - The type of the query parameters, defaults to `Record<string, string | number | (string | number)[] | boolean>`.
   * @param {string} endpoint - The endpoint to append to the base URL.
   * @param {TQuery} [query] - An optional object containing query parameters as key-value pairs.
   * @returns {URL} - The generated URL with the provided endpoint and query parameters.
   */
  private genUri<TQuery = Record<string, string | number | (string | number)[] | boolean>>(
    endpoint: string,
    query?: TQuery,
  ): URL {
    const uri = new URL(endpoint, this.baseURL);
    if (query) {
      for (const key of Object.keys(query))
        if (query[key] && query[key] !== "undefined" && query[key] !== "null") {
          if (Array.isArray(query[key])) {
            uri.searchParams.append(key, this.commaSeparate(query[key]));
          } else {
            uri.searchParams.append(key, String(query?.[key]));
          }
        }
    }

    return uri;
  }

  /**
   * Generates HTTP headers for the API request.
   *
   * @param additionHeaders - An object containing additional headers to be included in the request.
   * @returns A Headers object with the API key and any additional headers appended.
   *
   * @see {@link Headers}
   */
  private genHeaders(additionHeaders: Record<string, string>): Headers {
    const headers = new Headers();
    headers.append("X-CMC_PRO_API_KEY", this.apikey);
    if (additionHeaders) for (const key of Object.keys(additionHeaders)) headers.append(key, additionHeaders[key]);
    return headers;
  }

  /**
   * Handles errors based on the provided {@link CmcStatusResponse} and returns an appropriate {@link CmcErrorClass} instance.
   *
   * @param {CmcStatusResponse} status - The status object containing the error code and other relevant information.
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
  private error(data?: unknown): CmcErrorClass {
    switch (this.status?.error_code) {
      case CmcErrorCode.ApikeyInvalid:
        return new CmcInvalidError(this.status, data);
      case CmcErrorCode.ApikeyMissing:
        return new CmcMissingError(this.status, data);
      case CmcErrorCode.ApikeyPlanRequiresPayment:
        return new CmcPaymentRequiredError(this.status, data);
      case CmcErrorCode.ApikeyPlanPaymentExpired:
        return new CmcPaymentExpiredError(this.status, data);
      case CmcErrorCode.ApikeyRequired:
        return new CmcApikeyRequiredError(this.status, data);
      case CmcErrorCode.ApikeyPlanNotAuthorized:
        return new CmcPlanUnauthorizeError(this.status, data);
      case CmcErrorCode.ApikeyDisable:
        return new CmcApikeyDisabledError(this.status, data);
      case CmcErrorCode.ApikeyPlanMinuteRateLimitReached:
        return new CmcMinuteRateLimitError(this.status, data);
      case CmcErrorCode.ApikeyPlanDailyRateLimitReached:
        return new CmcDailyRateLimitError(this.status, data);
      case CmcErrorCode.ApikeyPlanMonthlyRateLimitReached:
        return new CmcMonthlyRateLimitError(this.status, data);
      case CmcErrorCode.IpRateLimitReached:
        return new CmcIpRateLimitError(this.status, data);
    }

    return new CmcRequestError(this.status, data);
  }
}
