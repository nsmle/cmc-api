import { Enumerable } from "@util/decorators.util";
import type { CoinMarketCapApi } from "@core/api";

/**
 * Abstract base class for repositories that interact with the CoinMarketCap API.
 *
 * @decorator `@Enumerable(false)` - Marks the `cmc` property as non-enumerable.
 * @category Core
 */
export abstract class Repository {
  /**
   * The instance of the CoinMarketCapApi to interact with the CoinMarketCap service.
   * @protected
   */
  @Enumerable(false)
  protected cmc: CoinMarketCapApi;

  /**
   * Creates an instance of the repository with the provided {@link CoinMarketCapApi | `CoinMarketCapApi`}.
   *
   * @param cmc - An instance of the CoinMarketCapApi to interact with the CoinMarketCap service.
   */
  constructor(cmc: CoinMarketCapApi) {
    this.cmc = cmc;
  }
}
