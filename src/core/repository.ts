import { Enumerable } from "@util/decorators.util";
import type { CoinMarketCapApi } from "@core/api";

export abstract class Repository {
  @Enumerable(false)
  protected cmc: CoinMarketCapApi;

  constructor(cmc: CoinMarketCapApi) {
    this.cmc = cmc;
  }
}
