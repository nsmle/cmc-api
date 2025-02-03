import type { CmcStatusResponse } from "@response/status.response";

export enum CmcErrorCode {
  ApikeyInvalid = 1001,
  ApikeyMissing = 1002,
  ApikeyPlanRequiresPayment = 1003,
  ApikeyPlanPaymentExpired = 1004,
  ApikeyRequired = 1005,
  ApikeyPlanNotAuthorized = 1006,
  ApikeyDisable = 1007,
  ApikeyPlanMinuteRateLimitReached = 1008,
  ApikeyPlanDailyRateLimitReached = 1009,
  ApikeyPlanMonthlyRateLimitReached = 1010,
  IpRateLimitReached = 1011,
}

export abstract class CmcError extends Error {
  public data: unknown;

  public errorCode: number | null;
  public errorMessage: string;
  public creditCount: number;
  public elapsed: number;
  public notice?: string;
  public timestamp: string;

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
