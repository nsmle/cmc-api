import { Repository } from "@core/repository";
import { AuxiliaryList, ListingStatus, SortType } from "@option/crypto.options";

export class CryptoRepository extends Repository {
  /**
   * Mapping of all cryptocurrencies to unique CoinMarketCap ids.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyMap | CoinMarketCap ID Map}.
   *
   * @param {ListingStatus} [listingStatus=["active"]] - Only status of the listing (default: `active`, available: `active`, `inactive`, or `untracked`).
   * @param {SortType} [sort="id"] - What field to sort the list of cryptocurrencies by.
   * @param {number} [limit] - Optionally specify the number of results to return. Use this parameter and the `offset` parameter to determine your own pagination size.
   * @param {number} [offset] - Optionally offset the start (1-based index) of the paginated list of items to return.
   * @param {string[]} [symbol] - List of cryptocurrency symbols.
   * @param {AuxiliaryList} [aux=["platform","first_historical_data","last_historical_data","is_active"]] - Optionally specify a list of supplemental data fields to return.
   *
   * @example get list of cryptocurrencies
   * ```ts
   * const apikey = process.env.COINMARKETCAP_API_KEY;
   * const cmc = new CoinMarketCapApi(apikey);
   *
   * const cryptos  = await cmc.crypto.list("active", "id", 10, 1, ["BTC", "ETH"]);
   * const btc = cryptos.data.find((crypto) => crypto.symbol === "BTC");
   * const eth = cryptos.data.find((crypto) => crypto.symbol === "ETH");
   *
   * console.log(btc);
   * console.log(eth);
   * ```
   * @todo: Returns a mapping of all cryptocurrencies to unique CoinMarketCap ids.
   */
  public async list(
    listingStatus: ListingStatus = "active",
    sort: SortType = "id",
    limit?: number,
    offset?: number,
    symbol?: string[],
    aux: AuxiliaryList = ["platform", "first_historical_data", "last_historical_data", "is_active"],
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   *
   * @todo: Retrieves detailed information about a specific cryptocurrency.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyInfo | Metadata v2}.
   */
  public async info(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns a paginated list of all active cryptocurrencies with latest market data. The default "market_cap" sort returns cryptocurrency in order of CoinMarketCap's market cap rank (as outlined in our methodology) but you may configure this call to order by another market ranking field. Use the "convert" option to return market values in multiple fiat and cryptocurrency conversions in the same call.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsLatest | Latest Listings}.
   */
  public async listing(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns a paginated list of most recently added cryptocurrencies.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsNew | New Listings}.
   */
  public async listingNew(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns a ranked and sorted list of all cryptocurrencies for a historical UTC date.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsHistorical | Listings Historical}.
   */
  public async listingHistory(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * Returns the latest market quote for 1 or more cryptocurrencies. Use the "convert" option to return market values in multiple fiat and cryptocurrency conversions in the same call.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyQuotesLatest | Quotes Latest v2}.
   */
  public async quotes(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns an interval of historic market quotes for any cryptocurrency based on time and interval parameters.
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyQuotesHistorical | Quotes Historical v2}.
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV3CryptocurrencyQuotesHistorical | Quotes Historical v3}.
   *
   * @param {"v2"|"v3"} version - Version of the endpoint.
   */
  public async quotesHistorical(version: "v2" | "v3"): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Lists all active market pairs that CoinMarketCap tracks for a given cryptocurrency or fiat currency.
   *
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyMarketpairsLatest | Market Pairs Latest}.
   */
  public async marketPairs(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns the latest OHLCV (Open, High, Low, Close, Volume) market values for one or more cryptocurrencies for the current UTC day.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyOhlcvLatest | OHLCV Latest v2}.
   */
  public async ohlcv(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns historical OHLCV (Open, High, Low, Close, Volume) data along with market cap for any cryptocurrency using time interval parameters.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyOhlcvHistorical | OHLCV Historical v2}.
   */
  public async ohlcvHistory(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns price performance statistics for one or more cryptocurrencies including launch price ROI and all-time high / all-time low.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyPriceperformancestatsLatest | Price Performance Stats v2}.
   */
  public async performance(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns information about a single coin category available on CoinMarketCap. Includes a paginated list of the cryptocurrency quotes and metadata for the category.
   * @link {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyCategory | Category}.
   */
  public async category(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns information about all coin categories available on CoinMarketCap. Includes a paginated list of cryptocurrency quotes and metadata from each category.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyCategories | Categories}.
   */
  public async categories(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns information about a single airdrop available on CoinMarketCap. Includes the cryptocurrency metadata.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyAirdrop | Airdrop}.
   */
  public async airdrop(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns a list of past, present, or future airdrops which have run on CoinMarketCap.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyAirdrops | Airdrops}.
   */
  public async aridrops(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns a paginated list of all trending cryptocurrency market data, determined and sorted by CoinMarketCap search volume.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingLatest | Trending Latest}.
   */
  public async trending(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns a paginated list of all trending cryptocurrency market data, determined and sorted by traffic to coin detail pages.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingMostvisited | Trending Most Visited}.
   */
  public async mostVisited(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * @todo: Returns a paginated list of all trending cryptocurrencies, determined and sorted by the largest price gains or losses.
   * @see {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingGainerslosers | Trending Gainers & Losers}.
   */
  public async gainersLosers(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
