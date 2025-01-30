import { CoinMarketCapApi } from "@core/api";

export abstract class Repository {
  public cmc: CoinMarketCapApi;

  constructor(cmc: CoinMarketCapApi) {
    this.cmc = cmc;
  }
}
