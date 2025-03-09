import type {
  CmcApikeyDisabledError,
  CmcApikeyRequiredError,
  CmcDailyRateLimitError,
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

/**
 * Represents a base response from the CMC API.
 *
 * @template TData - The type of the data contained in the response.
 *
 * @typedef {Object} CmcBaseResponse
 * @property {TData} data - The data returned by the API.
 * @property {CmcStatusResponse} status - The status of the response.
 *
 * @typedef {Object} CmcBaseResponse
 * @property {Object} [data] - An optional object containing the data and status.
 * @property {TData} data.data - The data returned by the API.
 * @property {CmcStatusResponse} data.status - The status of the response.
 * @property {CmcStatusResponse} [status] - An optional status of the response.
 */
export type CmcBaseResponse<TData = unknown> =
  | {
      data: TData;
      status: CmcStatusResponse;
    }
  | {
      data?: {
        data: TData;
        status: CmcStatusResponse;
      };
      status?: CmcStatusResponse;
    };

/**
 * Representing the status response from the CMC API.
 */
export interface CmcStatusResponse {
  /**
   * The timestamp of the response.
   */
  timestamp: string;

  /**
   * The error code, if any. `null` if there is no error.
   */
  error_code: number | null;

  /**
   * The error message, if any.
   */
  error_message: string;

  /**
   * The time elapsed for the request in milliseconds.
   */
  elapsed: number;

  /**
   * The number of credits used for the request.
   */
  credit_count: number;

  /**
   * An optional notice message.
   */
  notice?: string;
}

/**
 * Represents the different classes of errors that can occur in the CMC API.
 *
 * @typedef {CmcErrorClass}
 *
 * @property {CmcInvalidError} CmcInvalidError - Represents an invalid error.
 * @property {CmcMissingError} CmcMissingError - Represents a missing error.
 * @property {CmcPaymentRequiredError} CmcPaymentRequiredError - Represents a payment required error.
 * @property {CmcPaymentExpiredError} CmcPaymentExpiredError - Represents a payment expired error.
 * @property {CmcApikeyRequiredError} CmcApikeyRequiredError - Represents an API key required error.
 * @property {CmcPlanUnauthorizeError} CmcPlanUnauthorizeError - Represents a plan unauthorized error.
 * @property {CmcApikeyDisabledError} CmcApikeyDisabledError - Represents an API key disabled error.
 * @property {CmcMinuteRateLimitError} CmcMinuteRateLimitError - Represents a minute rate limit error.
 * @property {CmcDailyRateLimitError} CmcDailyRateLimitError - Represents a daily rate limit error.
 * @property {CmcMonthlyRateLimitError} CmcMonthlyRateLimitError - Represents a monthly rate limit error.
 * @property {CmcIpRateLimitError} CmcIpRateLimitError - Represents an IP rate limit error.
 * @property {CmcRequestError} CmcRequestError - Represents a general request error.
 */
export type CmcErrorClass =
  | CmcInvalidError
  | CmcMissingError
  | CmcPaymentRequiredError
  | CmcPaymentExpiredError
  | CmcApikeyRequiredError
  | CmcPlanUnauthorizeError
  | CmcApikeyDisabledError
  | CmcMinuteRateLimitError
  | CmcDailyRateLimitError
  | CmcMonthlyRateLimitError
  | CmcIpRateLimitError
  | CmcRequestError;
