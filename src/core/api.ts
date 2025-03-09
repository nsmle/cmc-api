import { CexRepository } from "@repository/cex.repository";
import { CommunityRepository } from "@repository/community.repository";
import { CryptoRepository } from "@repository/crypto.repository";
import { DexRepository } from "@repository/dex.repository";
import { MetricRepository } from "@repository/metric.repository";
import { MiscRepository } from "@repository/misc.repository";
import { Client } from "@core/client";

/**
 * The CoinMarketCap API.
 *
 * **Quick Start Guide**
 * 1. Sign up for a free API key at [CoinMarketCap](https://pro.coinmarketcap.com/signup).
 * 2. Copy your API Key. Once you sign up you'll land on your Developer Portal account dashboard. Copy your API from the API Key box in the top left panel.
 * 3. Install the [cmc-api](https://www.npmjs.com/package/cmc-api) package using npm or yarn.
 * 4. Create a new instance of the CoinMarketCapApi class and pass your API key as an argument.
 * 5. Start making API calls!
 *
 * @remarks
 * The **[cmc-api](https://www.npmjs.com/package/cmc-api)** is an generic api wrapper for [CoinMarketCap](https://coinmarketcap.com).
 * The [CoinMarketCap API](https://pro.coinmarketcap.com/api/v1) is a suite of high-performance RESTful JSON endpoints that are specifically designed to meet the mission-critical demands of application developers, data scientists, and enterprise business platforms.
 * It provides access to high-frequency cryptocurrency market data such as price, volume, and market cap.
 *
 * @example using an production API key
 * ```typescript
 * import { CoinMarketCapApi } from "cmc-api";
 *
 * const apikey = process.env.COINMARKETCAP_APIKEY;
 * const cmc = new CoinMarketCapApi(apikey);
 * ```
 *
 * @example using sandbox
 * ```typescript
 * import { CoinMarketCapApi } from "cmc-api";
 * const cmc = CoinMarketCapApi.sandbox(); // or (new CoinMarketCapApi()).sandbox();
 * ```
 */
export class CoinMarketCapApi {
  /**
   * The client instance used to make API requests.
   */
  public client = new Client();

  /**
   * Repository for cryptocurrency-related operations.
   */
  public crypto = new CryptoRepository(this);

  /**
   * Repository for decentralized exchange-related operations.
   */
  public dex = new DexRepository(this);

  /**
   * Repository for centralized exchange-related operations.
   */
  public cex = new CexRepository(this);

  /**
   * Repository for metric-related operations.
   */
  public metric = new MetricRepository(this);

  /**
   * Repository for community-related operations.
   */
  public community = new CommunityRepository(this);

  /**
   * Repository for miscellaneous operations.
   */
  public misc = new MiscRepository(this);

  /**
   * Creates an instance of CoinMarketCapApi.
   * @param apikey - Optional API key for authentication.
   */
  constructor(apikey?: string) {
    if (apikey) this.client.setApiKey(apikey);
  }

  /**
   * Switches the client to sandbox mode.
   * @returns The CoinMarketCapApi instance in sandbox mode.
   */
  public sandbox(): CoinMarketCapApi {
    this.client.sandbox();
    return this;
  }

  /**
   * Creates a new CoinMarketCapApi instance in sandbox mode.
   * @returns A new CoinMarketCapApi instance in sandbox mode.
   */
  public static sandbox(): CoinMarketCapApi {
    const instance = new CoinMarketCapApi();
    instance.client = instance.client.sandbox();
    return instance;
  }
}
