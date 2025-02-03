import type { CmcStatusResponse } from "@response/status.response";

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
