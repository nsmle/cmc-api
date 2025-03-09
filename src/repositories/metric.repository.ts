import endpoints from "@core/endpoints";
import { Repository } from "@core/repository";
import { dateToUnix } from "@util/date.util";
import { Enumerable } from "@util/decorators.util";
import { isNumeric } from "@util/type.util";
import type { Convert, Interval } from "@option/common.option";
import type { CryptoIdOnly } from "@option/crypto.option";
import type { AuxiliaryMetricGlobalQuotesHistoricalList, MetricIndexHistoricalInterval } from "@option/metric.option";
import type {
  Metric100IndexConstituents,
  Metric100IndexHistoricalResponse,
  Metric100IndexLatestResponse,
  MetricBlockchainStatsLatestResponse,
  MetricFearAndGreedHistoricalResponse,
  MetricFearAndGreedLatestResponse,
  MetricGlobalQuote,
  MetricGlobalQuoteHistorical,
  MetricGlobalQuotesHistorical,
  MetricGlobalQuotesHistoricalResponse,
  MetricGlobalQuotesResponse,
} from "@response/metric.response";

export class MetricRepository extends Repository {
  /**
   * Endpoints are used to interact with CoinMarketCap Global Metrics, CMC 100 Index, Fear and Greed, and Blockchain Stats APIs
   * @internal @private
   */
  @Enumerable(false)
  private endpoints = endpoints.metric;

  /**
   * The latest global cryptocurrency market metrics. \
   * *Use the `convert` option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * **Available api plans**: `Basic`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 5 minute.* \
   * **Plan credit use**: *1 call credit per call and 1 call credit per convert option beyond the first.* \
   * **CMC equivalent pages**: *The latest aggregate global market stats ticker across all CMC pages like {@link https://coinmarketcap.com | coinmarketcap.com}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1GlobalmetricsQuotesLatest | Global Metrics Quotes Latest}. \
   * {@link MetricGlobalQuotesResponse}. \
   * {@link MetricGlobalQuotes}. \
   * {@link MetricGlobalQuote}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get global quotes and convert the quote to "EUR" and "USD"
   * ```typescript
   * const globalQuotes = await cmc.metric.quotes<"EUR" | "USD">(["EUR", "USD"]);
   * console.log(globalQuotes.quote.EUR, globalQuotes.quote.USD);
   * ```
   *
   * @example get global quotes and convert the quote to "BTC" and "ETH"
   * ```typescript
   * const globalQuotes = await cmc.metric.quotes<"BTC" | "ETH">(["BTC", "ETH"]);
   * console.log(globalQuotes.quote.BTC, globalQuotes.quote.ETH);
   * ```
   *
   * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
   * @template TQuoteValue - The type of the quote value, defaults to `MetricGlobalQuote`.
   * @template TResponse - The type of the response, defaults to `MetricGlobalQuotesResponse` with `TQuoteKey` and `TQuoteValue`.
   *
   * @param {Convert} [convert] - Optional parameter to specify the conversion currency or ID.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the response containing the quotes.
   */
  public async quotes<
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = MetricGlobalQuote,
    TResponse = MetricGlobalQuotesResponse<TQuoteKey, TQuoteValue>,
  >(convert?: Convert): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.quotes, {
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
    });
  }

  /**
   * An interval of historical global cryptocurrency market metrics based on time and interval parameters
   *
   * **Technical Notes**:
   * - *A historic quote for every `interval` period between your `timeStart` and `timeEnd` will be returned.*
   * - *If a `timeStart` is not supplied, the `interval` will be applied in reverse from `timeEnd`.*
   * - *If `timeEnd` is not supplied, it defaults to the current time.*
   * - *At each `interval` period, the historic quote that is closest in time to the requested time will be returned.*
   * - *If no historic quotes are available in a given `interval` period up until the next interval period, it will be skipped.*
   *
   * **Available api plans**:
   * - `Hobbyist` *(1 month)*
   * - `Startup` *(1 month)*
   * - `Standard` *(3 month)*
   * - `Professional` *(12 months)*
   * - `Enterprise` *(Up to 6 years)*.
   *
   * **Cache frequency**: *Every 5 minute.* \
   * **Plan credit use**: *1 call credit per 100 historical data points returned (rounded up).* \
   * **CMC equivalent pages**: *CoinMarketCap Total Market Capitalization global chart {@link https://coinmarketcap.com/charts/ | coinmarketcap.com/charts/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1GlobalmetricsQuotesHistorical | Global Metrics Quotes Historical}. \
   * {@link MetricGlobalQuotesHistoricalResponse}. \
   * {@link MetricGlobalQuotesHistorical}. \
   * {@link MetricGlobalQuoteHistorical}. \
   * {@link AuxiliaryMetricGlobalQuotesHistoricalList}. \
   * {@link Interval}. \
   * {@link Convert}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get global quotes in range "2024-12-01" - "2025-01-01" and convert to "BTC" and "ETH"
   * ```typescript
   * const start = new Date("2024-12-01T00:00:00Z");
   * const end = new Date("2025-01-01T00:00:00Z");
   * const globalQuotesHistorical = await cmc.metric.quotesHistorical<"BTC" | "ETH">(start, end, 10, "1d", ["BTC", "ETH"]);
   * for (const quotes of globalQuotesHistorical.quotes) console.log(quotes.quote.BTC, quotes.quote.ETH);
   * ```
   * @template TQuoteKey - The key type for the quote, defaults to `"USD"`.
   * @template TQuoteValue - The value type for the quote, defaults to `MetricGlobalQuoteHistorical`.
   * @template TQuotes - The type for the quotes object, defaults to `MetricGlobalQuotesHistorical<TQuoteKey, TQuoteValue>`.
   * @template TResponse - The response type, defaults to `MetricGlobalQuotesHistoricalResponse<TQuoteKey, TQuoteValue, TQuotes>`.
   *
   * @param {Date} [timeStart] - The start time for the historical data.
   * @param {Date} [timeEnd] - The end time for the historical data.
   * @param {number} [count=10] - The number of data points to fetch.
   * @param {Interval} [interval="1d"] - The interval between data points.
   * @param {Convert} [convert] - The currency crypto/fiat to convert the data to.
   * @param {AuxiliaryMetricGlobalQuotesHistoricalList} [aux] - The list of auxiliary metrics to include.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the historical quotes data.
   */
  public async quotesHistorical<
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = MetricGlobalQuoteHistorical,
    TQuotes extends object = MetricGlobalQuotesHistorical<TQuoteKey, TQuoteValue>,
    TResponse = MetricGlobalQuotesHistoricalResponse<TQuoteKey, TQuoteValue, TQuotes>,
  >(
    timeStart?: Date,
    timeEnd?: Date,
    count: number = 10,
    interval: Interval = "1d",
    convert?: Convert,
    aux: AuxiliaryMetricGlobalQuotesHistoricalList = [
      "btc_dominance",
      "eth_dominance",
      "active_cryptocurrencies",
      "active_exchanges",
      "active_market_pairs",
      "total_volume_24h",
      "total_volume_24h_reported",
      "altcoin_market_cap",
      "altcoin_volume_24h",
      "altcoin_volume_24h_reported",
    ],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.quotesHistorical, {
      ...(timeStart && { time_start: dateToUnix(timeStart) }),
      ...(timeEnd && { time_end: dateToUnix(timeEnd) }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      count: count,
      interval: interval,
      aux: aux,
    });
  }

  /**
   * The latest CoinMarketCap 100 Index value, constituents, and constituent weights
   *
   * **Available api plans**: `Basic`, `Startup`, `Hobbyist`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 5 minutes.* \
   * **Plan credit use**: *1 call credit per API call.* \
   * **CMC equivalent pages**: *CoinMarketCap 100 Index on {@link https://coinmarketcap.com/charts/cmc100/ | coinmarketcap.com/charts/cmc100}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV3IndexCMC100Latest | CoinMarketCap 100 Index Latest}. \
   * {@link Metric100IndexLatestResponse}. \
   * {@link Metric100IndexLatest}. \
   * {@link Metric100IndexConstituents}.
   *
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get latest coinmarketcap 100 index
   * ```typescript
   * import type { Metric100IndexConstituents, Metric100IndexLatestResponse } from "cmc-api";
   * const index100Latest = await cmc.metric.index<Metric100IndexConstituents, Metric100IndexLatestResponse<Metric100IndexConstituents>>();
   * for (const constituents of index100Latest.constituents) console.log(constituents.name, constituents.weight);
   * console.log(index100Latest.value_24h_percentage_change);
   * ```
   *
   * @template TConstituents - The type of the constituents in the metric index. Defaults to `Metric100IndexConstituents`.
   * @template TResponse - The type of the response object. Defaults to `Metric100IndexLatestResponse<TConstituents>`.
   *
   * @returns A promise that resolves to the latest metric index data of type `TResponse`.
   */
  public async index<
    TConstituents extends object = Metric100IndexConstituents,
    TResponse = Metric100IndexLatestResponse<TConstituents>,
  >(): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.index);
  }

  /**
   * An interval of historic CoinMarketCap 100 Index values based on the interval parameter.
   *
   * **Available api plans**: `Basic`, `Startup`, `Hobbyist`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 5 minutes.* \
   * **Plan credit use**: *1 API call credit per request no matter query size.* \
   * **CMC equivalent pages**: *CoinMarketCap 100 Index on {@link https://coinmarketcap.com/charts/cmc100/ | coinmarketcap.com/charts/cmc100}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV3IndexCMC100Historical | CoinMarketCap 100 Index Historical}. \
   * {@link Metric100IndexHistoricalResponse}. \
   * {@link Metric100IndexHistorical}. \
   * {@link Metric100IndexConstituents}. \
   * {@link MetricIndexHistoricalInterval}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get historical coinmarketcap 100 index
   * ```typescript
   * import type { Metric100IndexConstituents, Metric100IndexHistoricalResponse } from "cmc-api";
   * const start = new Date("2024-12-01T00:00:00Z");
   * const end = new Date("2025-01-01T00:00:00Z");
   * const index100Historical = await cmc.metric.indexHistorical<Metric100IndexConstituents, Metric100IndexHistoricalResponse<Metric100IndexConstituents>>(start, end);
   * for (const index100 of index100Historical) console.log(index100.value, index100.constituents);
   * ```
   *
   * @template TConstituents - The type of the index constituents. Defaults to `Metric100IndexConstituents`.
   * @template TResponse - The type of the response. Defaults to `Metric100IndexHistoricalResponse<TConstituents>`.
   *
   * @param {Date} [timeStart] - The start time for the historical data.
   * @param {Date} [timeEnd] - The end time for the historical data.
   * @param {number} [count=5] - The number of data points to retrieve.
   * @param {MetricIndexHistoricalInterval} [interval] - The interval for the historical data.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the historical index data.
   */
  public async indexHistorical<
    TConstituents extends object = Metric100IndexConstituents,
    TResponse = Metric100IndexHistoricalResponse<TConstituents>,
  >(timeStart?: Date, timeEnd?: Date, count: number = 5, interval?: MetricIndexHistoricalInterval): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.indexHistorical, {
      ...(timeStart && { time_start: dateToUnix(timeStart) }),
      ...(timeEnd && { time_end: dateToUnix(timeEnd) }),
      count: count,
      interval: interval,
    });
  }

  /**
   * The latest CMC Crypto Fear and Greed value.
   *
   * **Available api plans**: `Basic`, `Startup`, `Hobbyist`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 15 minutes.* \
   * **Plan credit use**: *1 call credit per request.* \
   * **CMC equivalent pages**: *CMC Crypto Fear and Greed Index card on {@link https://coinmarketcap.com/charts/ | coinmarketcap.com/charts}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV3FearandgreedLatest | CMC Crypto Fear and Greed Latest}. \
   * {@link MetricFearAndGreedLatestResponse}. \
   * {@link MetricFearAndGreedLatest}. \
   * {@link MetricFearAndGreed}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get latest fear and greed
   * ```typescript
   * import type { MetricFearAndGreedLatest } from "cmc-api";
   * const fearAndGreedLatest = await cmc.metric.fearAndGreed<MetricFearAndGreedLatest>();
   * console.log(fearAndGreedLatest);
   * ```
   *
   * @template TResponse - The expected response type. Defaults to `MetricFearAndGreedLatestResponse`.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the latest Fear and Greed index data of type `TResponse`.
   */
  public async fearAndGreed<TResponse = MetricFearAndGreedLatestResponse>(): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.fearAndGreed);
  }

  /**
   * A paginated list of all CMC Crypto Fear and Greed values at 12am UTC time.
   *
   * **Available api plans**: `Basic`, `Startup`, `Hobbyist`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 15 seconds.* \
   * **Plan credit use**: *1 API call credit per request no matter query size.* \
   * **CMC equivalent pages**: *CMC Crypto Fear and Greed Index card on {@link https://coinmarketcap.com/charts/ | coinmarketcap.com/charts}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV3FearandgreedHistorical | CMC Crypto Fear and Greed Historical}. \
   * {@link MetricFearAndGreedHistoricalResponse}. \
   * {@link MetricFearAndGreedHistorical}. \
   * {@link MetricFearAndGreed}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get the historical fear and greed
   * ```typescript
   * import type { MetricFearAndGreedHistorical } from "cmc-api";
   * const fearAndGreedHistorical = await cmc.metric.fearAndGreedHistorical<MetricFearAndGreedHistorical[]>();
   * for (const fearAndGreed of fearAndGreedHistorical) console.log(fearAndGreed);
   * ```
   *
   * @template TResponse - The expected response type. Defaults to `MetricFearAndGreedHistoricalResponse`.
   *
   * @param {number} [limit=50] - The number of records to fetch. Defaults to `50`.
   * @param {number} [offset=1] - The starting paginated list of items. Defaults to `1`.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the historical Fear and Greed index data.
   */
  public async fearAndGreedHistorical<TResponse = MetricFearAndGreedHistoricalResponse>(
    limit: number = 50,
    offset: number = 1,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.fearAndGreedHistorical, {
      limit: limit,
      start: offset,
    });
  }

  /**
   * The latest blockchain statistics data for 1 or more blockchains. \
   * *`Bitcoin`, `Litecoin`, and `Ethereum` are currently supported.* \
   * *Additional blockchains will be made available on a regular basis.*
   *
   * **Available api plans**: `Enterprise`. \
   * **Cache frequency**: *Every 15 seconds.* \
   * **Plan credit use**: *1 call credit per request.* \
   * **CMC equivalent pages**: *CoinMarketCap blockchain explorer pages like {@link https://blockchain.coinmarketcap.com/ | blockchain.coinmarketcap.com}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1BlockchainStatisticsLatest | CoinMarketCap Blockchain Statistics Latest}. \
   * {@link MetricBlockchainStatsLatestResponse}. \
   * {@link MetricBlockchainStats}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get blockchain statistics by id
   * ```typescript
   * const blockchainStats = await cmc.metric.stats<"1" | "2" | "1027">({ id: [1, 2, 1027] });
   * console.log(blockchainStats[1], blockchainStats[2], blockchainStats[1027]);
   * ```
   *
   * @example get blockchain statistics by symbol
   * ```typescript
   * const blockchainStats = await cmc.metric.stats<"BTC" | "LTC" | "ETH">({ symbol: ["BTC", "LTC", "ETH"] });
   * console.log(blockchainStats.BTC, blockchainStats.LTC, blockchainStats.ETH);
   * ```
   *
   * @example get blockchain statistics by slug
   * ```typescript
   * const blockchainStats = await cmc.metric.stats<"bitcoin" | "litecoin" | "ethereum">({ slug: ["bitcoin", "litecoin", "ethereum"] });
   * console.log(blockchainStats.bitcoin, blockchainStats.ethereum, blockchainStats.litecoin);
   * ```
   *
   * @template TKey - The type of the key used in the response. Defaults to `string`, e.g: "bitcoin" or "ethereum".
   * @template TResponse - The type of the response expected from the API. Defaults to `MetricBlockchainStatsLatestResponse<TKey>`.
   *
   * @param {CryptoIdOnly} id - The identifier for the cryptocurrency, can be the `ids`, `slugs`, or `symbols`.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the latest blockchain statistics for the specified cryptocurrency.
   */
  public async stats<TKey extends string = string, TResponse = MetricBlockchainStatsLatestResponse<TKey>>(
    id: CryptoIdOnly,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.blockchainStats, {
      ...(id?.id && { id: id.id }),
      ...(id?.slug && { slug: id.slug }),
      ...(id?.symbol && { symbol: id.symbol }),
    });
  }
}
