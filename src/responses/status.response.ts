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

export interface CmcResponseStatus {
  timestamp: string;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
  notice: string;
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
