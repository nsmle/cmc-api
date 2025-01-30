import { CoinMarketCapApi } from "@core/api";

export class Client {
  public cmc: CoinMarketCapApi;

  constructor(cmc: CoinMarketCapApi) {
    this.cmc = cmc;
  }

  /**
   * TODO: Implement this method
   */
  public async get(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * TODO: Implement this method
   */
  public async post(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
