import type { CmcApikeyDisabledError } from "@error/cmc-apikey-disabled.error";
import type { CmcApikeyRequiredError } from "@error/cmc-apikey-required.error";
import type { CmcInvalidError } from "@error/cmc-invalid.error";
import type { CmcMissingError } from "@error/cmc-missing.error";
import type { CmcPaymentExpiredError } from "@error/cmc-payment-expired.error";
import type { CmcPaymentRequiredError } from "@error/cmc-payment-required.error";
import type { CmcPlanUnauthorizeError } from "@error/cmc-plan-unauthorize.error";
import type { CmcDailyRateLimitError } from "@error/cmc-rate-limit-daily.error";
import type { CmcIpRateLimitError } from "@error/cmc-rate-limit-ip.error";
import type { CmcMinuteRateLimitError } from "@error/cmc-rate-limit-minute.error";
import type { CmcMonthlyRateLimitError } from "@error/cmc-rate-limit-monthly.error";
import type { CmcRequestError } from "@error/cmc-request.error";

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

export interface CmcStatusResponse {
  timestamp: string;
  error_code: number | null;
  error_message: string;
  elapsed: number;
  credit_count: number;
  notice?: string;
}

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
