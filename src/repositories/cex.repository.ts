import endpoints from "@core/endpoints";
import { Repository } from "@core/repository";
import { dateToUnix } from "@util/date.util";
import { isNumeric } from "@util/type.util";
import type {
  AuxiliaryCexList,
  AuxiliaryCexListing,
  AuxiliaryCexMarketPairs,
  AuxiliaryCexMetadata,
  AuxiliaryCexQuotes,
  CexCategory,
  CexCategoryMarketPairs,
  CexId,
  CexListFilter,
  CexListingSort,
  CexListingType,
  CexListSort,
  CexMarketPairsFeeType,
  CexMatched,
} from "@option/cex.option";
import type { Convert, Interval, ListingStatus, SortDir } from "@option/common.type";
import type {
  CexAssetsResponse,
  CexIdMapResponse,
  CexIdMapResponses,
  CexListingLatestResponse,
  CexMarketPairQuote,
  CexMarketPairsResponse,
  CexMarketQuote,
  CexMetadataResponse,
  CexQuotesHistoricalQuote,
  CexQuotesHistoricalResponse,
  CexQuotesLatestResponse,
  CexQuotesValue,
} from "@response/cex.response";

export class CexRepository extends Repository {
  /** @private Endpoints are used to interact with CoinMarketCap Exchange APIs. */
  private endpoints = endpoints.cex;

  /**
   * Retrieved a paginated list of all active cryptocurrency exchanges by CoinMarketCap ID. \
   * *Use the convenience endpoint to search for and leverage unique exchange IDs across endpoints, as common exchange identifiers can change over time.* \
   * *As a convenience you may pass a comma-separated list of exchanges by `slug` to filter this list to only those you require or the `aux` parameter to slim down the payload*
   *
   * **Available api plans**: `Basic`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Mapping data is updated only as needed, every 30 seconds.* \
   * **Plan credit use**: *1 call credit per call.* \
   * **CMC equivalent pages**: *No equivalent, this data is only available via API.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ExchangeMap | Exchange ID Map}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get a list of all active exchanges
   * ```typescript
   * import type { CexIdMapResponses } from "cmc-api";
   * const exchanges = await cmc.cex.list<CexIdMapResponses>();
   * for (const exchange of exchanges) {
   *   console.log(exchange.id, exchange.name, exchange.is_active);
   * }
   * ```
   *
   * @example get binance exchange
   * ```typescript
   * import type { CexIdMapResponse } from "cmc-api";
   * const exchanges = await cmc.cex.list<CexIdMapResponse<"binance">>("active", { cexSlug: "binance" });
   * console.log(exchanges.binance);
   * ```
   *
   * @template TResponse - The expected response type.
   *
   * @param {ListingStatus} [status="active"] - The listing status to filter by. Defaults to "active".
   * @param {CexListFilter} [filter] - Optional filters to apply to the list.
   * @param {number} [limit] - The maximum number of results to return.
   * @param {number} [offset=1] - The starting point for the results. Defaults to 1.
   * @param {CexListSort} [sort="id"] - The sorting order of the results. Defaults to "id".
   * @param {AuxiliaryCexList} [aux=["first_historical_data", "last_historical_data", "is_active"]] - Additional auxiliary fields to include in the response. Defaults to ["first_historical_data", "last_historical_data", "is_active"].
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the response of type TResponse.
   */
  public async list<TResponse = CexIdMapResponse | CexIdMapResponses>(
    status: ListingStatus = "active",
    filter?: CexListFilter,
    limit?: number,
    offset: number = 1,
    sort: CexListSort = "id",
    aux: AuxiliaryCexList = ["first_historical_data", "last_historical_data", "is_active"],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.map, {
      ...(filter?.cexSlug && { slug: filter.cexSlug }),
      ...(filter?.cryptoId && { crypto_id: filter.cryptoId }),
      listing_status: status,
      start: offset,
      limit: limit,
      sort: sort,
      aux: aux,
    });
  }

  /**
   * Fetches all static metadata for one or more CEX (Centralized Exchange) by its ID or slug. \
   * *This information includes details like launch date, logo, official website URL, social links, and market fee documentation URL.*
   *
   * **Available api plans**: `Basic`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Static data is updated only as needed, every 30 seconds.* \
   * **Plan credit use**: *1 call credit per 100 exchanges returned (rounded up).* \
   * **CMC equivalent pages**: *Exchange detail page metadata like {@link https://coinmarketcap.com/exchanges/binance/ | coinmarketcap.com/exchanges/binance/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ExchangeInfo | Exchange Metadata}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get exchange metadata by ID
   * ```typescript
   * const metadata = await cmc.cex.metadata<"3673">({ id: 3673 });
   * console.log(metadata["3673"]);
   * ```
   *
   * @example get multiple exchange metadata by slug
   * ```typescript
   * const metadata = await cmc.cex.metadata<"binance" | "okx">({ slug: ["binance", "okx"] });
   * console.log(metadata.binance);
   * console.log(metadata.okx);
   * ```
   *
   * @template TKey - The type of the key used in the metadata response. Defaults to `string`.
   * @template TResponse - The type of the response expected from the metadata request. Defaults to `CexMetadataResponse`.
   *
   * @param {CexId} id - The identifier object for the CEX, which can contain either an `id` or a `slug`.
   * @param {AuxiliaryCexMetadata} [aux=["urls", "logo", "description", "date_launched", "notice"]] - An optional array of auxiliary metadata fields to include in the response.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the metadata response for the specified CEX.
   */
  public async metadata<TKey extends string = string, TResponse = CexMetadataResponse<TKey>>(
    id: CexId,
    aux: AuxiliaryCexMetadata = ["urls", "logo", "description", "date_launched", "notice"],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.metadata, {
      ...(id?.id && { id: id.id }),
      ...(id?.slug && { slug: id.slug }),
      aux: aux,
    });
  }

  /**
   * Returns the exchange assets in the form of token holdings. \
   * *This information includes details like wallet address, cryptocurrency, blockchain platform, balance, and etc.* \
   * *Only wallets containing at least 100,000 USD in balance are shown, Balances from wallets might be delayed*
   *
   * **Available api plans**: `Free`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Balance data is updated statically based on the source. Price data is updated every 5 minutes.* \
   * **Plan credit use**: *1 credit.* \
   * **CMC equivalent pages**: *Exchange detail page like {@link https://coinmarketcap.com/exchanges/binance/ | coinmarketcap.com/exchanges/binance/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ExchangeAssets | Exchange Assets}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get exchange assets by ID exchange
   * ```typescript
   * const assets = await cmc.cex.assets<"3673">(3673);
   * for (const asset of assets["3673"]) {
   *   console.log(asset.balance, asset.wallet_address);
   * }
   * ```
   *
   * @template TKey - The type of the key used in the response.
   * @template TResponse - The type of the response expected from the API.
   *
   * @param {number} id - A CoinMarketCap exchange ID. *e.g: `270`*
   *
   * @returns {Promise<TResponse>} A promise that resolves to the response from the API.
   */
  public async assets<TKey extends string = string, TResponse = CexAssetsResponse<TKey>>(
    id: number,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.assets, {
      id: id,
    });
  }

  /**
   * A paginated list of all cryptocurrency exchanges including the latest aggregate market data for each exchange. \
   * *Use the "convert" option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 1 minute.* \
   * **Plan credit use**: *1 call credit per 100 exchanges returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Latest exchange listing and ranking pages like {@link https://coinmarketcap.com/rankings/exchanges/ | coinmarketcap.com/rankings/exchanges/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ExchangeListingsLatest | Exchange Listings Latest}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get the 10 exchange listings with the exchange score in descending order and convert to EUR and USD
   * ```typescript
   * const listings = await cmc.cex.listing<"EUR" | "USD">(10, 1, "all", "all", "exchange_score", "desc", ["EUR", "USD"]);
   * for (const listing of listings) {
   *   console.log(listing.id, listing.name, listing.quote.EUR.volume_24h, listing.quote.USD.volume_24h);
   * }
   * ```
   *
   * @template TQuoteKey - The type of the quote key, defaults to "USD".
   * @template TQuoteValue - The type of the quote value, defaults to CexMarketQuote.
   * @template TResponse - The type of the response, defaults to CexListingLatestResponse with TQuoteKey and TQuoteValue.
   *
   * @param {number} [limit=100] - The maximum number of listings to return.
   * @param {number} [offset=1] - The starting point for the page listings to return.
   * @param {CexCategory} [category="all"] - The category of the listings to return.
   * @param {CexListingType} [marketType="all"] - The type of market for the listings.
   * @param {CexListingSort} [sort="volume_24h"] - The sorting criteria for the listings.
   * @param {SortDir} [sortDir] - The direction of the sorting (ascending or descending).
   * @param {Convert} [convert] - The currency to convert the listings to.
   * @param {AuxiliaryCexListing} [aux=["num_market_pairs", "traffic_score", "rank", "exchange_score", "effective_liquidity_24h"]] - Additional auxiliary fields to include in the response.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the latest listings response.
   */
  public async listing<
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CexMarketQuote,
    TResponse = CexListingLatestResponse<TQuoteKey, TQuoteValue>,
  >(
    limit: number = 100,
    offset: number = 1,
    category: CexCategory = "all",
    marketType: CexListingType = "all",
    sort: CexListingSort = "volume_24h",
    sortDir?: SortDir,
    convert?: Convert,
    aux: AuxiliaryCexListing = [
      "num_market_pairs",
      "traffic_score",
      "rank",
      "exchange_score",
      "effective_liquidity_24h",
    ],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.listings, {
      limit: limit,
      start: offset,
      market_type: marketType,
      sort: sort,
      sort_dir: sortDir,
      category: category,
      aux: aux,
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
    });
  }

  /**
   * Returns all active market pairs that CoinMarketCap tracks for a given exchange, The latest price and volume information is returned for each market.
   * *Use the "convert" option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 60 seconds.* \
   * **Plan credit use**: *1 call credit per 100 market pairs returned (rounded up) and 1 call credit per `convert` option beyond the first* \
   * **CMC equivalent pages**: *Exchange level active markets pages like {@link https://coinmarketcap.com/exchanges/binance/ | coinmarketcap.com/exchanges/binance/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ExchangeMarketpairsLatest | Exchange Market Pairs Latest}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get binance market pairs by ID
   * ```typescript
   * const marketPairs = await cmc.cex.marketPairs<"3673">({ id: 3673 });
   * console.log(marketPairs["3673"]);
   * ```
   *
   * @example get binance market pairs by slug
   * ```typescript
   * const marketPairs = await cmc.cex.marketPairs<"binance">({ slug: "binance" });
   * console.log(marketPairs.binance);
   * ```
   *
   * @template TKey - The type of the key for the market pairs.
   * @template TQuoteKey - The type of the quote key for the market pairs. Defaults to "USD".
   * @template TQuoteValue - The type of the quote value for the market pairs. Defaults to `CexMarketPairQuote`.
   * @template TResponse - The type of the response. Defaults to `CexMarketPairsResponse<TKey, TQuoteKey, TQuoteValue>`.
   *
   * @param {CexId} id - The ID of the centralized exchange.
   * @param {number} [limit=100] - The maximum number of market pairs to return.
   * @param {number} [offset=1] - The starting index for the market pairs to return.
   * @param {CexMatched} [matched] - The matched criteria for the market pairs.
   * @param {CexCategoryMarketPairs} [category="all"] - The category of market pairs to return.
   * @param {CexMarketPairsFeeType} [feeType="all"] - The fee type of market pairs to return.
   * @param {Convert} [convert] - The conversion criteria for the market pairs.
   * @param {AuxiliaryCexMarketPairs} [aux=["num_market_pairs", "category", "fee_type"]] - The auxiliary fields to include in the response.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the market pairs response.
   */
  public async marketPairs<
    TKey extends string = string,
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CexMarketPairQuote,
    TResponse = CexMarketPairsResponse<TKey, TQuoteKey, TQuoteValue>,
  >(
    id: CexId,
    limit: number = 100,
    offset: number = 1,
    matched?: CexMatched,
    category: CexCategoryMarketPairs = "all",
    feeType: CexMarketPairsFeeType = "all",
    convert?: Convert,
    aux: AuxiliaryCexMarketPairs = ["num_market_pairs", "category", "fee_type"],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.pairs, {
      ...(id?.id && { id: id.id }),
      ...(id?.slug && { slug: id.slug }),
      ...(matched?.id && { matched_id: matched.id }),
      ...(matched?.symbol && { matched_symbol: matched.symbol }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      limit: limit,
      start: offset,
      category: category,
      fee_type: feeType,
      aux: aux,
    });
  }

  /**
   * Returns the latest aggregate market data for 1 or more exchanges. \
   * *Use the "convert" option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 60 seconds.* \
   * **Plan credit use**: *1 call credit per 100 exchanges returned (rounded up) and 1 call credit per `convert` option beyond the first* \
   * **CMC equivalent pages**: *Latest market data summary for specific exchanges like  {@link https://coinmarketcap.com/rankings/exchanges/ | coinmarketcap.com/rankings/exchanges/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ExchangeQuotesLatest | Exchange Quotes Latest}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get binance quotes by id for BTC and ETH
   * ```typescript
   * const quotes = await cmc.cex.quotes<"3673", "BTC" | "ETH">({ id: 3673 }, ["BTC", "ETH"]);
   * console.log(quotes["3673"].quote.BTC.volume_24h, quotes["3673"].quote.ETH.volume_24h);
   * ```
   *
   * @example get binance quotes by slug for BTC and ETH
   * ```typescript
   * const quotes = await cmc.cex.quotes<"binance", "BTC" | "ETH">({ slug: "binance" }, ["BTC", "ETH"]);
   * console.log(quotes.binance.quote.BTC.volume_24h, quotes.binance.quote.ETH.volume_24h);
   * ```
   *
   * @template TKey - The type of the key used in the response.
   * @template TQuoteKey - The type of the quote key, defaults to "USD".
   * @template TQuoteValue - The type of the quote value, defaults to `CexQuotesValue`.
   * @template TResponse - The type of the response, defaults to `CexQuotesLatestResponse` with `TKey`, `TQuoteKey`, and `TQuoteValue`.
   *
   * @param {CexId} id - The id/slug of the CEX to fetch quotes for.
   * @param {Convert} [convert] - Optional conversion fiat/cryptocurrency symbol/id, can be a numeric ID or a string.
   * @param {AuxiliaryCexQuotes} [aux] - Optional auxiliary data to include in the response, defaults to an array of specific metrics.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the latest quotes response.
   */
  public async quotes<
    TKey extends string = string,
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CexQuotesValue,
    TResponse = CexQuotesLatestResponse<TKey, TQuoteKey, TQuoteValue>,
  >(
    id: CexId,
    convert?: Convert,
    aux: AuxiliaryCexQuotes = [
      "num_market_pairs",
      "traffic_score",
      "rank",
      "exchange_score",
      "liquidity_score",
      "effective_liquidity_24h",
    ],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.quotes, {
      ...(id?.id && { id: id.id }),
      ...(id?.slug && { slug: id.slug }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      aux: aux,
    });
  }

  /**
   * Returns an interval of historic quotes for any exchange based on time and interval parameters.
   *
   * **Available api plans**:
   * - `Hobbyist` *(1 month)*
   * - `Startup` *(1 month)*
   * - `Standard` *(3 month)*
   * - `Professional` *(Up to 12 months)*
   * - `Enterprise` *(Up to 6 years)*.
   *
   * **Cache frequency**: *Every 5 minutes.* \
   * **Plan credit use**: *1 call credit per 100 historical data points returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *No equivalent, this data is only available via API outside of our volume sparkline charts in {@link coinmarketcap.com/rankings/exchanges/ | coinmarketcap.com/rankings/exchanges/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ExchangeQuotesHistorical | Exchange Quotes Historical}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get binance historical quotes by exchange slug in interval 4h and convert to BTC and ETH
   * ```typescript
   * const start = new Date("2024-12-01T00:00:00Z");
   * const end = new Date("2025-01-01T00:00:00Z");
   * const quotesHistorical = await cmc.cex.quotesHistory<"binance", "BTC" | "ETH">({ slug: "binance" }, start, end, 10, "4h", ["BTC", "ETH"]);
   *
   * for (const binanceQuote of quotesHistorical.binance.quotes) {
   *   console.log(
   *     binanceQuote.timestamp,
   *     binanceQuote.num_market_pairs,
   *     binanceQuote.quote.BTC.volume_24h,
   *     binanceQuote.quote.ETH.volume_24h,
   *   );
   * }
   * ```
   *
   * @template TKey - The type of the key for the response.
   * @template TQuoteKey - The type of the quote key, defaults to "USD".
   * @template TQuoteValue - The type of the quote value, defaults to `CexQuotesHistoricalQuote`.
   * @template TResponse - The type of the response, defaults to `CexQuotesHistoricalResponse`.
   *
   * @param {CexId} id - The identifier of the cryptocurrency.
   * @param {Date} [timeStart] - The start time for the historical data.
   * @param {Date} [timeEnd] - The end time for the historical data.
   * @param {number} [count=10] - The number of interval periods to retrieve.
   * @param {Interval} [interval="5m"] - The interval between data points.
   * @param {Convert} [convert] - The currency to convert the quotes to.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the historical quotes response.
   */
  public async quotesHistory<
    TKey extends string = string,
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CexQuotesHistoricalQuote,
    TResponse = CexQuotesHistoricalResponse<TKey, TQuoteKey, TQuoteValue>,
  >(
    id: CexId,
    timeStart?: Date,
    timeEnd?: Date,
    count: number = 10,
    interval: Interval = "5m",
    convert?: Convert,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.quotesHistorical, {
      ...(id?.id && { id: id.id }),
      ...(id?.slug && { slug: id.slug }),
      ...(timeStart && { time_start: dateToUnix(timeStart) }),
      ...(timeEnd && { time_end: dateToUnix(timeEnd) }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      count: count,
      interval: interval,
    });
  }
}
