import { CoinMarketCapApi } from "@core/api";

export class Client {
  public cmc: CoinMarketCapApi;
  protected apikey: string;

  constructor(cmc: CoinMarketCapApi) {
    this.cmc = cmc;
  }

  /**
   * @todo: Implement this method
   */
  public async get(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Implement this method
   */
  public async post(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public setApiKey(apiKey: string): void {
    this.apikey = apiKey;
  }
}
