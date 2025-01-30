import { CmcResponseStatus } from "@response/status.response";

export abstract class CmcError extends Error {
  public data: unknown;

  public errorCode: number;
  public errorMessage: string;
  public creditCount: number;
  public elapsed: number;
  public notice: string;
  public timestamp: string;

  constructor(response: CmcResponseStatus, data: unknown) {
    super(response.error_message);
    this.data = data;
    this.errorCode = response.error_code;
    this.errorMessage = response.error_message;
    this.creditCount = response.credit_count;
    this.elapsed = response.elapsed;
    this.notice = response.notice;
    this.timestamp = response.timestamp;
  }
}
