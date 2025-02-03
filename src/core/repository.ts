import type { CoinMarketCapApi } from "@core/api";

export abstract class Repository {
  protected cmc: CoinMarketCapApi;

  constructor(cmc: CoinMarketCapApi) {
    this.cmc = cmc;
  }
}
