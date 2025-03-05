import endpoints from "@core/endpoints";
import { Repository } from "@core/repository";
import { dateToUnix } from "@util/date.util";
import { Enumerable } from "@util/decorators.util";
import { isNumeric } from "@util/type.util";
import type { Interval, ListingStatus, Pair } from "@option/common.type";
import type {
  AuxiliaryList,
  AuxiliaryListing,
  AuxiliaryListingHistory,
  AuxiliaryMarketPair,
  AuxiliaryMetadata,
  AuxiliaryQuotesHistorical,
  AuxiliaryQuotesLatest,
  CryptoConvert,
  CryptoId,
  CryptoIdOnly,
  CryptoIdSingleOnly,
  CryptoIdSymbolOnly,
  ListingCryptoType,
  ListingFilter,
  ListingHistorySort,
  ListingSort,
  ListingSortDir,
  ListingTag,
  ListSort,
  MarketPairCategory,
  MarketPairFeeType,
  MarketPairSort,
  Matched,
  PerformanceStatsTimePeriod,
} from "@option/crypto.option";
import type { Quote } from "@response/common.response";
import type {
  CryptoAirdropResponse,
  CryptoAirdropsResponse,
  CryptoCategoriesResponse,
  CryptoCategoryResponse,
  CryptoGrainersLosersResponse,
  CryptoIdMapResponse,
  CryptoListingHistoricalQuoteValue,
  CryptoListingHistoricalResponse,
  CryptoListingLatestResponse,
  CryptoListingNewResponse,
  CryptoMarketPairsQuoteValue,
  CryptoMarketPairsResponse,
  CryptoMetadataV2Response,
  CryptoMostVisitedResponse,
  CryptoOhlcvHistoricalQuoteValue,
  CryptoOhlcvHistoricalResponse,
  CryptoOhlcvLatestQuoteValue,
  CryptoOhlcvLatestResponse,
  CryptoPricePerformancePeriodResponse,
  CryptoPricePerformanceQuoteValue,
  CryptoPricePerformanceStatsResponse,
  CryptoQuotesHistoricalQuoteValue,
  CryptoQuotesHistoricalResponse,
  CryptoQuotesLatestResponse,
  CryptoTrendingLatestResponse,
} from "@response/crypto.response";

export class CryptoRepository extends Repository {
  /**
   * Endpoints are used to interact with CoinMarketCap Exchange APIs
   * @internal @private
   */
  @Enumerable(false)
  private endpoints = endpoints.crypto;

  /**
   * Retrieves a list/mapping of all cryptocurrencies to unique CoinMarketCap `ids`. \
   * *Recommend utilizing `id` instead of cryptocurrency `symbol` to securely identify cryptocurrencies with other endpoints of coinmarketcap and application logic.*
   *
   * Each cryptocurrency returned includes typical identifiers such as `name`, `symbol`, and `token_address` for flexible mapping to `id`.
   *
   * **Available api plans**: `Basic`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Mapping data is updated only as needed, every 30 seconds.* \
   * **Plan credit use**: *1 API call credit per request no matter query size.* \
   * **CMC equivalent pages**: *No equivalent, this data is only available via API.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyMap | Cryptocurrency ID Map}. \
   * {@link https://pro.coinmarketcap.com/api/v1#section/Best-Practices | CoinMarketCap API Best Practices}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get list cryptocurrencies
   * ```typescript
   * const crypto = await cmc.crypto.list("active", "id", 10, 1, ["BTC", "ETH"]);
   * const btc = crypto.find((crypto): boolean => crypto.symbol === "BTC");
   * const eth = crypto.find((crypto): boolean => crypto.symbol === "ETH");
   *
   * console.log({ btc, eth });
   * ```
   *
   * @template TResponse - The expected response type. defaults is Object or Array of {@link CryptoIdMapResponse}.
   *
   * @param {ListingStatus} [listingStatus="active"] - The status of the listings to retrieve (e.g., `"active"`).
   * @param {ListSort} [sort="id"] - The sorting criteria for the list (e.g., `"id"`).
   * @param {number} [limit] - The maximum number of items to retrieve.
   * @param {number} [offset=1] - The starting point for the list retrieval.
   * @param {(string[]|number[])} [symbol] - An array of symbols or IDs to filter the results.
   * @param {AuxiliaryList} [aux=["platform", "first_historical_data", "last_historical_data", "is_active"]] - Additional fields to include in the response.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the list of cryptocurrencies.
   */
  public async list<TResponse = CryptoIdMapResponse[]>(
    listingStatus: ListingStatus = "active",
    sort: ListSort = "id",
    limit?: number,
    offset: number = 1,
    symbol?: string[] | number[],
    aux: AuxiliaryList = ["platform", "first_historical_data", "last_historical_data", "is_active"],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.map, {
      limit: limit,
      sort: sort,
      symbol: symbol,
      start: offset,
      listing_status: listingStatus,
      aux: aux,
    });
  }

  /**
   * Fetches metadata for one or more cryptocurrency. \
   * This information includes details like logo, description, official website URL, social links, and links to a cryptocurrency's technical documentation.
   *
   * **Available api plans**: `Basic`, `Startup`, `Hobbyist`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Static data is updated only as needed, every 30 seconds.* \
   * **Plan credit use**: *1 call credit per 100 cryptocurrencies returned (rounded up).* \
   * **CMC equivalent pages**: *Cryptocurrency detail page metadata like {@link https://coinmarketcap.com/currencies/bitcoin/ | coinmarketcap.com/currencies/bitcoin/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyInfo | Cryptocurrency Metadata v2}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyInfo | Cryptocurrency Metadata v1 *(deprecated)*}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get cryptocurrency metadata by symbol
   * ```typescript
   * const crypto = await cmc.crypto.metadata<"BTC" | "ETH">({ symbol: ["BTC", "ETH"] });
   * console.log({ btc: crypto.BTC.at(0), eth: crypto.ETH.at(1) });
   * ```
   *
   * @example get cryptocurrency metadata by id
   * ```typescript
   * const crypto = await cmc.crypto.metadata<"1" | "1027">({ id: [1, 1027] });
   * console.log({ btc: crypto[1], eth: crypto[1027] });
   * ```
   *
   * @example get cryptocurrency metadata by slug
   * ```typescript
   * const crypto = await cmc.crypto.metadata<"1" | "1027">({ slug: ["bitcoin", "ethereum"] });
   * console.log({ btc: crypto[1], eth: crypto[1027] });
   * ```
   *
   * @example get cryptocurrency metadata by contract address
   * ```typescript
   * const crypto = await cmc.crypto.metadata<"1027">({ contract: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" });
   * console.log(crypto[1027]); // Ethereum
   * ```
   *
   * @template TKey - The type of the key used in the response.
   * @template TValue - The type of the value used in the response. default {@link CryptoMetadataV2Response}
   * @template TResponse - The type of the response object.
   *
   * @param {CryptoId} id - The identifier for the cryptocurrency, which can include id, slug, symbol, or contract address.
   * @param {AuxiliaryMetadata} [aux=["urls", "logo", "description", "tags", "platform", "date_added", "notice"]] - Additional metadata fields to include in the response.
   * @param {boolean} [skipInvalid=false] - Whether to skip invalid entries in the response.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the metadata response.
   */
  public async metadata<
    TKey extends string = string,
    TValue = CryptoMetadataV2Response & CryptoMetadataV2Response[],
    TResponse = Pair<TKey, TValue>,
  >(
    id: CryptoId,
    aux: AuxiliaryMetadata = ["urls", "logo", "description", "tags", "platform", "date_added", "notice"],
    skipInvalid: boolean = false,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.metadata, {
      ...(id?.id && { id: this.cmc.client.commaSeparate(id.id) }),
      ...(id?.slug && { slug: this.cmc.client.commaSeparate(id.slug) }),
      ...(id?.symbol && { symbol: this.cmc.client.commaSeparate(id.symbol) }),
      ...(id?.contract && { address: id.contract }),
      skip_invalid: skipInvalid,
      aux: aux,
    });
  }

  /**
   * A paginated list of all active cryptocurrencies with latest market data.  \
   * The default `market_cap` sort returns cryptocurrency in order of CoinMarketCap's market cap rank but you may configure this call to order by another market ranking field. \
   * Use the `convert` option to return market values in multiple fiat and cryptocurrency conversions in the same call.
   *
   * *Use this if you need a sorted and paginated list of all cryptocurrencies.* \
   * *If you want to query for market data on a few specific cryptocurrencies use {@link CryptoRepository.quotes} which is optimized for that purpose.* \
   * The response data between these endpoints is otherwise the same.
   *
   * **Available api plans**: `Basic`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 60 seconds.* \
   * **Plan credit use**: *1 call credit per 200 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Cmc latest cryptocurrency listing and ranking pages like:*
   * - {@link https://coinmarketcap.com/all/views/all/ coinmarketcap.com/all/views/all/}
   * - {@link https://coinmarketcap.com/tokens/ coinmarketcap.com/tokens/}
   * - {@link https://coinmarketcap.com/gainers-losers/ coinmarketcap.com/gainers-losers/}
   * - {@link https://coinmarketcap.com/new/ coinmarketcap.com/new/}.
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsLatest | Cryptocurrency Listings Latest}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get cryptocurrency listing latest
   * ```typescript
   * const crypto = await cmc.crypto.listing<"USD" | "EUR">(10, 1, "all", "market_cap", "desc", "all", undefined, ["USD", "EUR"]);
   * console.log(crypto.at(0), crypto.at(0).quote.USD, crypto.at(0).quote.EUR);
   * ```
   *
   * @template TQuoteKey - The key type for the quote, defaults to `"USD"`.
   * @template TQuoteValue - The value type for the quote, defaults to `Quote`.
   * @template TResponse - The response type, defaults to an array of `CryptoListingLatestResponse`.
   *
   * @param {number} [limit=100] - The number of listings to retrieve.
   * @param {number} [offset=1] - The starting point for the listings retrieval.
   * @param {ListingCryptoType} [type="all"] - The type of cryptocurrency to list.
   * @param {ListingSort} [sort="market_cap"] - The sorting criteria for the listings.
   * @param {ListingSortDir} [sortDir] - The direction of sorting (ascending or descending).
   * @param {ListingTag} [tag="all"] - The tag to filter the listings.
   * @param {ListingFilter} [filters] - Additional filters for the listings.
   * @param {CryptoConvert} [convert] - The currency to convert the listings to.
   * @param {AuxiliaryListing} [aux=["num_market_pairs","cmc_rank","date_added","tags","platform","max_supply","circulating_supply","total_supply"]] - Auxiliary fields to include in the response.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the latest cryptocurrency listings.
   */
  public async listing<
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = Quote,
    TResponse = CryptoListingLatestResponse<TQuoteKey, TQuoteValue>[],
  >(
    limit: number = 100,
    offset: number = 1,
    type: ListingCryptoType = "all",
    sort: ListingSort = "market_cap",
    sortDir?: ListingSortDir,
    tag: ListingTag = "all",
    filters?: ListingFilter,
    convert?: CryptoConvert,
    aux: AuxiliaryListing = [
      "num_market_pairs",
      "cmc_rank",
      "date_added",
      "tags",
      "platform",
      "max_supply",
      "circulating_supply",
      "total_supply",
    ],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.listings, {
      limit: limit,
      start: offset,
      cryptocurrency_type: type,
      sort: sort,
      sort_dir: sortDir,
      tag: tag,
      aux: aux,
      price_min: filters?.priceMin,
      price_max: filters?.priceMax,
      market_cap_min: filters?.marketCapMin,
      market_cap_max: filters?.marketCapMax,
      volume_24h_min: filters?.volume24hMin,
      volume_24h_max: filters?.volume24hMax,
      circulating_supply_min: filters?.circulatingSupplyMin,
      circulating_supply_max: filters?.circulatingsupplyMax,
      percent_change_24h_min: filters?.percentChange24hMin,
      percent_change_24h_max: filters?.percentChange24hMax,
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
    });
  }

  /**
   * A paginated list of most recently added cryptocurrencies. \
   * *Use this endpoint if you need a sorted and paginated list of all recently added cryptocurrencies.*
   *
   * **Available api plans**: `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 60 seconds.* \
   * **Plan credit use**: *1 call credit per 200 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Cmc `new` cryptocurrency page {@link https://coinmarketcap.com/new/ coinmarketcap.com/new/}*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsNew | Cryptocurrency New Listings}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get cryptocurrency listing new and convert to BTC and ETH
   * ```typescript
   * const crypto = await cmc.crypto.listingNew<"BTC" | "ETH">(10, 1, "desc", ["BTC", "ETH"]);
   * console.log(crypto, crypto.at(0).quote.BTC, crypto.at(0).quote.ETH);
   * ```
   *
   * @template TQuoteKey - The key type for the quote, defaults to `USD`.
   * @template TQuoteValue - The value type for the quote, defaults to `Quote`.
   * @template TResponse - The response type, defaults to an array of `CryptoListingNewResponse`.
   *
   * @param {number} [limit=100] - The maximum number of listings to return.
   * @param {number} [offset=1] - The starting point for the listings.
   * @param {ListingSortDir} [sortDir] - The direction to sort the listings.
   * @param {CryptoConvert} [convert] - The currency to convert the listings to.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the list of new cryptocurrency listings.
   */
  public async listingNew<
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = Quote,
    TResponse = CryptoListingNewResponse<TQuoteKey, TQuoteValue>[],
  >(limit: number = 100, offset: number = 1, sortDir?: ListingSortDir, convert?: CryptoConvert): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.listingsNew, {
      limit: limit,
      start: offset,
      sort_dir: sortDir,
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
    });
  }

  /**
   * A ranked and sorted list of all cryptocurrencies for a historical UTC date.
   *
   * **Available api plans**:
   * - `Hobbyist` *(1 month)*
   * - `Startup` *(1 month)*
   * - `Standard` *(3 month)*
   * - `Professional` *(12 months)*
   * - `Enterprise` *(Up to 6 years)*.
   *
   * **Cache frequency**: *The last completed UTC day is available 30 minutes after midnight on the next UTC day* \
   * **Plan credit use**: *1 call credit per 100 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first* \
   * **CMC equivalent pages**: *Cmc historical daily crypto ranking snapshot pages like this one on {@link https://coinmarketcap.com/historical/20140202/ | February 02, 2014.}*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsHistorical | Cryptocurrency Listings Historical}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get cryptocurrency listing history
   * ```typescript
   * const date = new Date()
   * const crypto = await cmc.crypto.listingHistory<"BTC" | "ETH" | "USD">(date, 10, 1, "cmc_rank", "desc", "all", ["BTC", "ETH", "USD"]);
   * console.log(crypto, crypto.at(0).quote.BTC, crypto.at(0).quote.ETH,  crypto.at(0).quote.USD);
   * ```
   *
   * @template TQuoteKey - The key type for the quote, defaults to `USD`.
   * @template TQuoteValue - The value type for the quote, defaults to a subset of the `CryptoListingHistoricalQuoteValue` object.
   * @template TResponse - The response type, defaults to an array of `CryptoListingHistoricalResponse`.
   *
   * @param {Date} date - The date for which to fetch the historical listing.
   * @param {number} [limit=100] - The maximum number of results to return.
   * @param {number} [offset=1] - The starting point for the results.
   * @param {ListingHistorySort} [sort="cmc_rank"] - The field by which to sort the results.
   * @param {ListingSortDir} [sortDir] - The direction in which to sort the results.
   * @param {ListingCryptoType} [type="all"] - The type of cryptocurrencies to include in the results.
   * @param {CryptoConvert} [convert] - The currency to convert the results to.
   * @param {{@link AuxiliaryListingHistory}} [aux] - Additional fields to include in the results.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the historical listing of cryptocurrencies.
   */
  public async listingHistory<
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CryptoListingHistoricalQuoteValue,
    TResponse = CryptoListingHistoricalResponse<TQuoteKey, TQuoteValue>[],
  >(
    date: Date,
    limit: number = 100,
    offset: number = 1,
    sort: ListingHistorySort = "cmc_rank",
    sortDir?: ListingSortDir,
    type: ListingCryptoType = "all",
    convert?: CryptoConvert,
    aux: AuxiliaryListingHistory = [
      "platform",
      "tags",
      "date_added",
      "circulating_supply",
      "total_supply",
      "max_supply",
      "cmc_rank",
      "num_market_pairs",
    ],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.listingsHistorical, {
      limit: limit,
      start: offset,
      date: dateToUnix(date),
      sort: sort,
      sort_dir: sortDir,
      cryptocurrency_type: type,
      aux: aux,
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
    });
  }

  /**
   * The latest market quote for 1 or more cryptocurrencies. \
   * *Use the `convert` option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * **Available api plans**: `Basic`, `Startup`, `Hobbyist`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 60 seconds.* \
   * **Plan credit use**: *1 call credit per 100 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Latest market data pages for specific cryptocurrencies like {@link https://coinmarketcap.com/currencies/bitcoin/ | coinmarketcap.com/currencies/bitcoin/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyQuotesLatest | Cryptocurrency Quotes Latest v2}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyQuotesHistorical | Cryptocurrency Quotes Latest v1 *(deprecated)*}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get cryptocurrency quotes latests by slug
   * ```typescript
   * const quotes = await cmc.crypto.quotes<"bitcoin" | "ethereum", "USD" | "EUR">({ slug: ["bitcoin", "ethereum"] }, ["USD", "EUR"]);
   * console.log({ btc: quotes.bitcoin, eth: quotes.ethereum, btcUsd: quotes.bitcoin.quote.USD, ethEur: quotes.ethereum.quote.EUR });
   * ```
   *
   * @template TKey - The type of the key used to identify the cryptocurrency.
   * @template TQuoteKey - The type of the key used for the quote currency. Defaults to `USD`.
   * @template TQuoteValue - The type of the value used for the quote. Defaults to `Quote`.
   * @template TValue - The type of the value returned in the response. Defaults to object or an array of `CryptoQuotesLatestResponse<TQuoteKey, TQuoteValue>`.
   * @template TResponse - The type of the response returned by the method. Defaults to `Pair<TKey, TValue>`.
   *
   * @param {CryptoIdOnly} id - The identifier for the cryptocurrency. Can be an `id`, `slug`, or `symbol`.
   * @param {CryptoConvert} [convert] - The currency to convert the quotes to.
   * @param {boolean} [skipInvalid=true] - Whether to skip invalid entries in the response.
   * @param {AuxiliaryQuotesLatest} [aux] - Additional fields to include in the response.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the latest quotes for the given cryptocurrency.
   */
  public async quotes<
    TKey extends string = string,
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = Quote,
    TValue = CryptoQuotesLatestResponse<TQuoteKey, TQuoteValue> & CryptoQuotesLatestResponse<TQuoteKey, TQuoteValue>[],
    TResponse = Pair<TKey, TValue>,
  >(
    id: CryptoIdOnly,
    convert?: CryptoConvert,
    skipInvalid: boolean = true,
    aux: AuxiliaryQuotesLatest = [
      "num_market_pairs",
      "cmc_rank",
      "date_added",
      "tags",
      "platform",
      "max_supply",
      "circulating_supply",
      "total_supply",
      "is_active",
      "is_fiat",
    ],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.quotes, {
      ...(id?.id && { id: this.cmc.client.commaSeparate(id.id) }),
      ...(id?.slug && { slug: this.cmc.client.commaSeparate(id.slug) }),
      ...(id?.symbol && { symbol: this.cmc.client.commaSeparate(id.symbol) }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      skip_invalid: skipInvalid,
      aux: aux,
    });
  }

  /**
   * An interval of historic market quotes for any cryptocurrency based on time and interval parameters.
   *
   * *A historic quote for every `interval` period between your `timeStart` and `timeEnd` will be returned.* \
   * *If a "timeStart" is not supplied, the `interval` will be applied in reverse from `timeEnd`.* \
   * *If `TimeEnd` is not supplied, it defaults to the current time.* \
   * *At each `interval` period, the historic quote that is closest in time to the requested time will be returned.* \
   * *If no historic quotes are available in a given `interval` period up until the next interval period, it will be skipped.*
   *
   * **Available api plans**:
   * - `Hobbyist` *(1 month)*
   * - `Startup` *(1 month)*
   * - `Standard` *(3 month)*
   * - `Professional` *(12 months)*
   * - `Enterprise` *(Up to 6 years)*.
   *
   * **Cache frequency**: *Every 60 seconds.* \
   * **Plan credit use**: *1 call credit per 100 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Latest market data pages for specific cryptocurrencies like {@link https://coinmarketcap.com/currencies/bitcoin/ | coinmarketcap.com/currencies/bitcoin/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV3CryptocurrencyQuotesHistorical | Cryptocurrency Quotes Historical v3}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyQuotesHistorical | Cryptocurrency Quotes Historical v2}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyQuotesHistorical | Cryptocurrency Quotes Historical v1 *(deprecated)*}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get btc and eth quotes in range "2024-12-01" - "2025-01-01"
   * ```typescript
   * const start = new Date("2024-12-01T00:00:00Z");
   * const end = new Date("2025-01-01T00:00:00Z");
   * const quotesHistory = await cmc.crypto.quotesHistory<"1" | "1027", "USD" | "EUR">({ id: [1, 1027] }, start, end);
   * const btc = quotesHistory["1"];
   * const eth = quotesHistory["1027"];
   * console.log({ btcQuotes: btc.quotes, ethQuotes: eth.quotes });
   * console.log({ btcQuoteFirst: btc.quotes?.at(0)?.quote, ethQuoteFirst: eth.quotes?.at(0)?.quote });
   * ```
   *
   * @template TKey - The type of the key used in the response.
   * @template TQuoteKey - The type of the quote key, defaults to "USD".
   * @template TQuoteValue - The type of the quote value, defaults to `Quote`.
   * @template TResponse - The type of the response, defaults to a pair of `TKey` and `CryptoQuotesHistoricalResponse<TQuoteKey, TQuoteValue>`.
   *
   * @param {CryptoIdSymbolOnly} id - The ID or symbol of the cryptocurrency.
   * @param {Date} [timeStart] - The start time for the historical data.
   * @param {Date} [timeEnd] - The end time for the historical data.
   * @param {Interval} [interval="5m"] - The interval for the historical data.
   * @param {number} [count=10] - The number of data points to fetch.
   * @param {"v2" | "v3"} [version="v3"] - The API version to use.
   * @param {CryptoConvert} [convert] - The currency to convert the quotes to.
   * @param {AuxiliaryQuotesHistorical} [aux] - The auxiliary fields to include in the response.
   * @param {boolean} [skipInvalid=true] - Whether to skip invalid data points.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the historical quotes data.
   */
  public async quotesHistory<
    TKey extends string = string,
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CryptoQuotesHistoricalQuoteValue,
    TResponse = Pair<TKey, CryptoQuotesHistoricalResponse<TQuoteKey, TQuoteValue>>,
  >(
    id: CryptoIdSymbolOnly,
    timeStart?: Date,
    timeEnd?: Date,
    interval: Interval = "5m",
    count: number = 10,
    version: "v2" | "v3" = "v3",
    convert?: CryptoConvert,
    aux: AuxiliaryQuotesHistorical = [
      "price",
      "volume",
      "market_cap",
      "circulating_supply",
      "total_supply",
      "quote_timestamp",
      "is_active",
      "is_fiat",
    ],
    skipInvalid: boolean = true,
  ): Promise<TResponse> {
    const endpoint = version == "v2" ? this.endpoints.quotesHistorical : this.endpoints.quotesHistoricalV3;
    return await this.cmc.client.req<TResponse>(endpoint, {
      ...(id?.id && { id: this.cmc.client.commaSeparate(id.id) }),
      ...(id?.symbol && { symbol: this.cmc.client.commaSeparate(id.symbol) }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      count: count,
      interval: interval,
      time_start: dateToUnix(timeStart),
      time_end: dateToUnix(timeEnd),
      skip_invalid: skipInvalid,
      aux: aux,
    });
  }

  /**
   * Lists all active market pairs that CoinMarketCap tracks for a given cryptocurrency or fiat currency. \
   * All markets with this currency as the pair base or pair quote will be returned. \
   * The latest price and volume information is returned for each market.
   *
   * *Use the `convert` option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 60 seconds.* \
   * **Plan credit use**: *1 call credit per 100 market pairs returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Cmc active cryptocurrency markets pages like {@link https://coinmarketcap.com/currencies/bitcoin/#markets coinmarketcap.com/currencies/bitcoin/#markets}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyMarketpairsLatest | Cryptocurrency Market Pairs Latest v2}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyMarketpairsLatest | Cryptocurrency Market Pairs Latest v1 *(deprecated)*}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get ethereum market pair
   * ```typescript
   * const ethereum = await cmc.crypto.marketPairs<"USD" | "BTC">({ slug: "ethereum" }, { symbol: ["USD", "BTC"] });
   * console.log({ ethMarketPairs: ethereum.market_pairs });
   * ```
   *
   * @template TQuoteKey - The key type for the quote, defaults to "USD".
   * @template TQuoteValue - The value type for the quote, defaults to `CryptoMarketPairsQuoteValue`.
   * @template TResponse - The response type, defaults to `CryptoMarketPairsResponse` with `TQuoteKey` and `TQuoteValue`.
   *
   * @param {CryptoIdSingleOnly} id - A cryptocurrency or fiat currency by CoinMarketCap ID to list market pairs for. e.g: `{ id: [1, 2]}`.
   * @param {Matched} [matched] - Optionally include one or more fiat or cryptocurrency symbols/ids to filter market pairs by.
   * @param {number} [limit=100] - The maximum number of results to return.
   * @param {number} [offset=1] - The starting point for the results.
   * @param {MarketPairCategory} [category="all"] - The category of trading this market falls under. Spot markets are the most common but options include derivatives and OTC.
   * @param {MarketPairFeeType} [feeType="all"] - The fee type the exchange enforces for this market.
   * @param {MarketPairSort} [sort="volume_24h_strict"] - Optionally specify the sort order of markets returned. By default we return a strict sort on 24 hour reported volume.
   * @param {CryptoConvert} [convert] - Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols.
   * @param {AuxiliaryMarketPair} [aux=["num_market_pairs", "category", "fee_type"]] - Auxiliary fields to include in the response.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the market pairs data.
   */
  public async marketPairs<
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CryptoMarketPairsQuoteValue,
    TResponse = CryptoMarketPairsResponse<TQuoteKey, TQuoteValue>,
  >(
    id: CryptoIdSingleOnly,
    matched?: Matched,
    limit: number = 100,
    offset: number = 1,
    category: MarketPairCategory = "all",
    feeType: MarketPairFeeType = "all",
    sort: MarketPairSort = "volume_24h_strict",
    convert?: CryptoConvert,
    aux: AuxiliaryMarketPair = ["num_market_pairs", "category", "fee_type"],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.marketPairs, {
      ...(id?.id && { id: this.cmc.client.commaSeparate(id.id) }),
      ...(id?.slug && { slug: this.cmc.client.commaSeparate(id.slug) }),
      ...(id?.symbol && { symbol: this.cmc.client.commaSeparate(id.symbol) }),
      ...(matched?.id && { matched_id: this.cmc.client.commaSeparate(matched.id) }),
      ...(matched?.symbol && { matched_symbol: this.cmc.client.commaSeparate(matched.symbol) }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      limit: limit,
      start: offset,
      category: category,
      fee_type: feeType,
      sort: sort,
      aux: aux,
    });
  }

  /**
   * The latest OHLCV (Open, High, Low, Close, Volume) market values for one or more cryptocurrencies for the current UTC day. \
   * Since the current UTC day is still active these values are updated frequently. \
   * *You can find the final calculated OHLCV values for the last completed UTC day along with all historic days using {@link CryptoRepository.ohlcvHistory}.*
   *
   * **Available api plans**: `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 10 minutes. Additional OHLCV intervals and 1 minute updates will be available in the future.* \
   * **Plan credit use**: *1 call credit per 100 OHLCV values returned (rounded up) and 1 call credit per convert option beyond the first.* \
   * **CMC equivalent pages**: *No equivalent, this data is only available via API.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyOhlcvLatest | Cryptocurrency OHLCV Latest v2}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyOhlcvLatest | Cryptocurrency OHLCV Latest v1 *(deprecated)*}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get btc and eth ohlcv and convert to usd and eur
   * ```typescript
   * const ohlcv = await cmc.crypto.ohlcv<"1" | "1027", "USD" | "EUR">({ id: [1, 1027] }, ["USD", "EUR"]);
   * const btcOhlcv = ohlcv["1"];
   * const ethOhlcv = ohlcv["1027"];
   *
   * console.log({ btcOhlcv, ethOhlcv });
   * console.log({ btcOhlcvUsd: btcOhlcv.quote.USD, ethOhlcvEur: ethOhlcv.quote.EUR });
   * ```
   *
   * @template TKey - The type of the key used to identify the cryptocurrency.
   * @template TQuoteKey - The type of the key used for the quote currency. Defaults to "USD".
   * @template TQuoteValue - The type of the value used for the quote currency. Defaults to `CryptoOhlcvLatestQuoteValue`.
   * @template TResponse - The type of the response object. Defaults to `Pair<TKey, CryptoOhlcvLatestResponse<TQuoteKey, TQuoteValue>>`.
   *
   * @param {CryptoIdSymbolOnly} id - One or more cryptocurrency symbols/ids.
   * @param {CryptoConvert} [convert] - One or more cryptocurrency or fiat currency symbols/ids.
   * @param {boolean} [skipInvalid=true] - When requesting records on multiple cryptocurrencies an error is returned if any invalid cryptocurrencies are requested or a cryptocurrency does not have matching records in the requested timeframe.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the latest OHLCV data.
   */
  public async ohlcv<
    TKey extends string = string,
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CryptoOhlcvLatestQuoteValue,
    TResponse = Pair<TKey, CryptoOhlcvLatestResponse<TQuoteKey, TQuoteValue>>,
  >(id: CryptoIdSymbolOnly, convert?: CryptoConvert, skipInvalid: boolean = true): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.ohlcv, {
      ...(id?.id && { id: this.cmc.client.commaSeparate(id.id) }),
      ...(id?.symbol && { symbol: this.cmc.client.commaSeparate(id.symbol) }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      skip_invalid: skipInvalid,
    });
  }

  /**
   * Historical OHLCV (Open, High, Low, Close, Volume) data along with market cap for any cryptocurrency using time interval parameters. \
   * *Currently daily and hourly OHLCV periods are supported.* \
   * *Volume is not currently supported for hourly OHLCV intervals before 2020-09-22.*
   *
   * *Only the date portion of the timestamp is used for daily OHLCV so it's recommended to send an ISO date format like `"2018-09-19"` without time for this `timePeriod`.*
   * *One OHLCV quote will be returned for every `timePeriod` between your `timeStart` (exclusive) and `timeEnd` (inclusive).*
   * *If a `timeStart` is not supplied, the `timePeriod` will be calculated in reverse from `timeEnd` using the `count` parameter which defaults to 10 results.* \
   * *If `timeEnd` is not supplied, it defaults to the current time.* \
   * *If you don't need every `timePeriod` between your dates you may adjust the frequency that `timePeriod` is sampled using the `interval` parameter.*
   * *For example with `timePeriod` set to `"daily"` you may set `interval` to `"2d"` to get the daily OHLCV for every other day.*
   * *You could set `interval` to `"monthly"` to get the first daily OHLCV for each month, or set it to `"yearly"` to get the daily OHLCV value against the same date every year.*
   *
   * *There are 2 types of time interval formats that may be used for `timePeriod` and `interval` parameters.* \
   * *For `timePeriod` these return aggregate OHLCV data from the beginning to end of each interval period.*
   * *Apply these time intervals to `interval` to adjust how frequently `timePeriod` is sampled.*
   *
   * **Available api plans**:
   * - `Startup` *(1 month)*
   * - `Standard` *(3 month)*
   * - `Professional` *(12 months)*
   * - `Enterprise` *(Up to 6 years)*.
   *
   * **Cache frequency**: *Latest Daily OHLCV record is available `~5` to `~10` minutes after each midnight UTC. The latest hourly OHLCV record is available 5 minutes after each UTC hour.* \
   * **Plan credit use**: *1 call credit per 100 OHLCV data points returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Cmc historical cryptocurrency data pages like {@link https://coinmarketcap.com/currencies/bitcoin/historical-data/ coinmarketcap.com/currencies/bitcoin/historical-data/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyOhlcvHistorical | Cryptocurrency OHLCV Historical v2}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyOhlcvHistorical | Cryptocurrency OHLCV Historical v1 *(deprecated)*}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get ohclv history of btc and eth in range date "2024-12-01" - "2025-01-01"
   * ```typescript
   * const start = new Date("2024-12-01T00:00:00Z");
   * const end = new Date("2025-01-01T00:00:00Z");
   *
   * const ohlcv = await cmc.crypto.ohlcvHistory<"1" | "1027", "USD">({ id: [1, 1027] }, start, end, "daily");
   * const btcOhlcv = ohlcv["1"];
   * const ethOhlcv = ohlcv["1027"];
   *
   * console.log({ btcOhlcv, ethOhlcv });
   * console.log({ btcOhlcvHistory: btcOhlcv.quotes, ethOhlcvHistory: ethOhlcv.quotes });
   * ```
   *
   * @template TKey - The type of the key used to identify the cryptocurrency.
   * @template TQuoteKey - The type of the quote key, defaults to "USD".
   * @template TQuoteValue - The type of the quote value, defaults to `CryptoOhlcvHistoricalQuoteValue`.
   * @template TResponse - The type of the response, defaults to `Pair<TKey, CryptoOhlcvHistoricalResponse<TQuoteKey, TQuoteValue>>`.
   *
   * @param {CryptoIdOnly} id - The identifier for the cryptocurrency.
   * @param {Date} [timeStart] - The start date for the historical data.
   * @param {Date} [timeEnd] - The end date for the historical data.
   * @param {"daily" | "hourly"} [timePeriod="daily"] - The time period for the historical data.
   * @param {Interval} [interval="daily"] - The interval for the historical data.
   * @param {number} [count=10] - The number of data points to fetch.
   * @param {CryptoConvert} [convert] - The conversion currency.
   * @param {boolean} [skipInvalid=true] - Whether to skip invalid data points.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the historical OHLCV data.
   */
  public async ohlcvHistory<
    TKey extends string = string,
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CryptoOhlcvHistoricalQuoteValue,
    TResponse = Pair<TKey, CryptoOhlcvHistoricalResponse<TQuoteKey, TQuoteValue>>,
  >(
    id: CryptoIdOnly,
    timeStart?: Date,
    timeEnd?: Date,
    timePeriod: "daily" | "hourly" = "daily",
    interval: Interval = "daily",
    count: number = 10,
    convert?: CryptoConvert,
    skipInvalid: boolean = true,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.ohlcvHistorical, {
      ...(id?.id && { id: this.cmc.client.commaSeparate(id.id) }),
      ...(id?.slug && { slug: this.cmc.client.commaSeparate(id.slug) }),
      ...(id?.symbol && { symbol: this.cmc.client.commaSeparate(id.symbol) }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      count: count,
      interval: interval,
      time_period: timePeriod,
      time_start: dateToUnix(timeStart),
      time_end: dateToUnix(timeEnd),
      skip_invalid: skipInvalid,
    });
  }

  /**
   * Price performance statistics for one or more cryptocurrencies including launch price ROI and all-time high / all-time low. \
   * *Stats are returned for an `"all_time"` period by default. UTC yesterday and a number of rolling time periods may be requested using the `timePeriod` parameter.* \
   * *Utilize the `convert` parameter to translate values into multiple fiats or cryptocurrencies using historical rates.*
   *
   * *You may also use {@link CryptoRepository.ohlcv} for OHLCV data for the current UTC day.* \
   * *You may also use {@link CryptoRepository.ohlcvHistory} for traditional OHLCV data at historical daily and hourly intervals.*
   *
   * **Available api plans**: `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 60 seconds* \
   * **Plan credit use**: *1 call credit per 100 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first* \
   * **CMC equivalent pages**: *The statistics module displayed on cryptocurrency pages like {@link https://coinmarketcap.com/currencies/bitcoin/ | Bitcoin}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2CryptocurrencyPriceperformancestatsLatest | Cryptocurrency Price Performance Stats v2}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyPriceperformancestatsLatest | Cryptocurrency Price Performance Stats v1 *(deprecated)*}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get performance of btc and eth in 24 hours and convert to the price into eur and usd
   * ```typescript
   * const performance = await cmc.crypto.performance<"bitcoin" | "ethereum", "EUR" | "USD">({ slug: ["bitcoin", "ethereum"] }, "24h", ["EUR", "USD"]);
   * console.log({ btcPerformance: performance.bitcoin, ethPerformance: performance.ethereum });
   * console.log({ btcPerformanceQuote: performance.bitcoin.quote.USD, ethPerformanceQuote: performance.ethereum.quote.EUR });
   * ```
   *
   * @template TKey - The type of the key used in the response.
   * @template TQuoteKey - The type of the quote key used in the response. Defaults to "USD".
   * @template TQuoteValue - The type of the quote value used in the response. Defaults to `CryptoPricePerformanceQuoteValue`.
   * @template TResponse - The type of the response, which is a pair of TKey and either `CryptoPricePerformanceStatsResponse` or `CryptoPricePerformancePeriodResponse`.
   *
   * @param {CryptoIdOnly} id - The identifier for the cryptocurrency, which can be an id, slug, or symbol.
   * @param {PerformanceStatsTimePeriod} [timePeriod="all_time"] - The time period for the performance statistics. Defaults to `"all_time"`.
   * @param {CryptoConvert} [convert] - The conversion currency or ID.
   * @param {boolean} [skipInvalid=true] - Whether to skip invalid entries. Defaults to `true`.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the performance statistics or period response.
   */
  public async performance<
    TKey extends string = string,
    TQuoteKey extends string = "USD",
    TQuoteValue extends object = CryptoPricePerformanceQuoteValue,
    TResponse = Pair<
      TKey,
      CryptoPricePerformanceStatsResponse<TQuoteKey, TQuoteValue> &
        CryptoPricePerformancePeriodResponse<TQuoteKey, TQuoteValue>
    >,
  >(
    id: CryptoIdOnly,
    timePeriod: PerformanceStatsTimePeriod = "all_time",
    convert?: CryptoConvert,
    skipInvalid: boolean = true,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.performance, {
      ...(id?.id && { id: id.id }),
      ...(id?.slug && { slug: id.slug }),
      ...(id?.symbol && { symbol: id.symbol }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      time_period: timePeriod,
      skip_invalid: skipInvalid,
    });
  }

  /**
   * Information about a single coin category available on CoinMarketCap. \
   * Includes a paginated list of the cryptocurrency quotes and metadata for the category.
   *
   * **Available api plans**: `Free`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Data is updated only as needed, every 30 seconds* \
   * **Plan credit use**: *1 API call credit per request + 1 call credit per 200 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first* \
   * **CMC equivalent pages**: *Our Cryptocurrency Category page {@link https://coinmarketcap.com/cryptocurrency-category/ | coinmarketcap.com/cryptocurrency-category/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyCategory | Cryptocurrency Category}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get zkSync category and log the market cap and the USD quote for ethereum
   * ```typescript
   * const categoryId = "644620a2b124ea0434395dd1";
   * const zkSyncCategory = await cmc.crypto.category<"USD" | "EUR">(categoryId, 10, 1, ["USD", "EUR"]);
   * console.log(zkSyncCategory.market_cap);
   *
   * const eth = zkSyncCategory.coins.filter((coin): boolean => coin.slug === "ethereum")?.at(0);
   * console.log(eth.quote.USD);
   * ```
   *
   * @template TQuoteKey - The type of the quote key, defaults to `"USD"`.
   * @template TResponse - The type of the response, defaults to `CryptoCategoryResponse<TQuoteKey>`.
   *
   * @param {string} id - The ID of the category.
   * @param {number} [limit=100] - The maximum number of items to return, defaults to `100`.
   * @param {number} [offset=1] - The starting page pagination, defaults to `1`.
   * @param {CryptoConvert} [convert] - One or more cryptocurrency or fiat currency symbols/ids.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the response of the category request.
   */
  public async category<TQuoteKey extends string = "USD", TResponse = CryptoCategoryResponse<TQuoteKey>>(
    id: string,
    limit: number = 100,
    offset: number = 1,
    convert?: CryptoConvert,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.category, {
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      limit: limit,
      start: offset,
      id: id,
    });
  }

  /**
   * Information about all coin categories available on CoinMarketCap. \
   * Includes a paginated list of cryptocurrency quotes and metadata from each category.
   *
   * **Available api plans**: `Free`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Data is updated only as needed, every 30 seconds.* \
   * **Plan credit use**: *1 API call credit per request + 1 call credit per 200 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Our Cryptocurrency Categories page {@link https://https://coinmarketcap.com/cryptocurrency-category/ | https://coinmarketcap.com/cryptocurrency-category/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyCategories | Cryptocurrency Categories}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get 10 categories and get and log/grep the title of each category
   * ```typescript
   * import type { CryptoCategoryResponse } from "cmc-api";
   * type Category = Pick<CryptoCategoryResponse, "title">;
   * const categories = await cmc.crypto.categories<Category[]>(10, 1);
   * for (const category of categories) console.log(category.title);
   * ```
   *
   * @template TResponse - The expected response type. default array of `CryptoCategoriesResponse`
   *
   * @param {number} [limit] - The maximum number of categories to return per page.
   * @param {number} [offset=1] - The starting page pagination, defaults to `1`.
   * @param {CryptoIdOnly} [id] - An optional object containing an ID, slug, or symbol to filter the categories.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the response containing the list of categories.
   */
  public async categories<TResponse = CryptoCategoriesResponse[]>(
    limit?: number,
    offset: number = 1,
    id?: CryptoIdOnly,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.categories, {
      ...(id?.id && { id: id.id }),
      ...(id?.slug && { slug: id.slug }),
      ...(id?.symbol && { symbol: id.symbol }),
      limit: limit,
      start: offset,
    });
  }

  /**
   * Information about a single airdrop available on CoinMarketCap. Includes the cryptocurrency metadata.
   *
   * **Available api plans**: `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Data is updated only as needed, every 30 seconds.* \
   * **Plan credit use**: *1 API call credit per request no matter query size.* \
   * **CMC equivalent pages**: *Cmc free airdrops page {@link https://coinmarketcap.com/airdrop/ | coinmarketcap.com/airdrop/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyAirdrop | Cryptocurrency Airdrop}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get airdrop information and log the coin of the airdrop
   * ```typescript
   * const airdropId = "bqdxotizdao";
   * const airdrop = await cmc.crypto.airdrop(airdropId);
   * console.log(airdrop);
   * console.log(airdrop.coin);
   * ```
   *
   * @template TResponse - The expected response type.
   * @param {string} id - The unique identifier of the airdrop id.
   * @returns {Promise<TResponse>} A promise that resolves to the airdrop information.
   */
  public async airdrop<TResponse = CryptoAirdropResponse>(id: string): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.airdrop, { id });
  }

  /**
   * A list of past, present, or future airdrops which have run on CoinMarketCap.
   *
   * **Available api plans**: `Free`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Data is updated only as needed, every 30 seconds.* \
   * **Plan credit use**: *1 API call credit per request no matter query size.* \
   * **CMC equivalent pages**: *Cmc free airdrops page {@link https://coinmarketcap.com/airdrop/ | coinmarketcap.com/airdrop/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyAirdrops | Cryptocurrency Airdrops}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get all upcoming airdrops and log the project name
   * ```typescript
   * import type { CryptoAirdropsResponse } from "cmc-api";
   *
   * type Airdrops = CryptoAirdropsResponse;
   * const airdrops = await cmc.crypto.airdrops<Airdrops>();
   * for (const airdrop of airdrops) console.log(airdrop.project_name);
   * ```
   *
   * @template TResponse - The expected response type. default array of crypto airdrop details `CryptoAirdropsResponse`.
   *
   * @param {("ended" | "ongoing" | "upcoming")} [status="upcoming"] - The status of the airdrops.
   * @param {number} [limit=100] - The maximum number of list airdrops to return.
   * @param {number} [offset=1] - The starting page pagination, defaults to `1`.
   * @param {CryptoIdSingleOnly} [id] - Optional identifier of specific cryptocurrency for airdrop.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the airdrop information.
   */
  public async airdrops<TResponse = CryptoAirdropsResponse>(
    status: "ended" | "ongoing" | "upcoming" = "upcoming",
    limit: number = 100,
    offset: number = 1,
    id?: CryptoIdSingleOnly,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.airdrops, {
      ...(id?.id && { id: id.id }),
      ...(id?.slug && { slug: id.slug }),
      ...(id?.symbol && { symbol: id.symbol }),
      status: status.toUpperCase(),
      limit: limit,
      start: offset,
    });
  }

  /**
   * A paginated list of all trending cryptocurrency market data, determined and sorted by CoinMarketCap search volume.
   *
   * **Available api plans**: `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 10 minutes.* \
   * **Plan credit use**: *1 call credit per 200 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *Cmc cryptocurrency Trending page {@link https://coinmarketcap.com/trending-cryptocurrencies/ | coinmarketcap.com/trending-cryptocurrencies/}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingLatest | Cryptocurrency Trending Latest}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get latest trending cryptocurrencies for the last 24 hours and log the name, symbol, and quotes for EUR and USD
   * ```typescript
   * import type { CryptoTrendingResponse } from "cmc-api";
   *
   * type QuoteKey = "USD" | "EUR";
   * type Trending = CryptoTrendingResponse<QuoteKey>;
   * const trendings = await cmc.crypto.trending<QuoteKey, Trending[]>("24h", 10, 1, ["EUR", "USD"]);
   *
   * for (const trending of trendings) {
   *    console.log(trending.name, trending.symbol, trending.slug);
   *    console.log(trending.quote.EUR, trending.quote.USD);
   * }
   * ```
   *
   * @template TQuoteKey - The key for the quote currency. default `"USD"`
   * @template TResponse - The expected response type.
   *
   * @param {timePeriod} [timePeriod="24h"] - The time period for trending data. Can be `"24h"`, `"30d"`, or `"7d"`. Defaults to `24h`.
   * @param {number} [limit=100] - The maximum number of results to return. Defaults to `100`.
   * @param {number} [offset=1] - The starting point for the results. Defaults to `1`.
   * @param {CryptoConvert} [convert] - One or more cryptocurrency or fiat currency symbols/ids.
   *
   * @returns A promise that resolves to the trending cryptocurrencies data.
   */
  public async trending<TQuoteKey extends string = "USD", TResponse = CryptoTrendingLatestResponse<TQuoteKey>>(
    timePeriod: "24h" | "30d" | "7d" = "24h",
    limit: number = 100,
    offset: number = 1,
    convert?: CryptoConvert,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.trending, {
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      time_period: timePeriod,
      limit: limit,
      start: offset,
    });
  }

  /**
   * A paginated list of all trending cryptocurrency market data, determined and sorted by traffic to coin detail pages.
   *
   * **Available api plans**: `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 24 hours.* \
   * **Plan credit use**: *1 call credit per 200 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *The CoinMarketCap {@link https://coinmarketcap.com/most-viewed-pages/ | Most Visited} trending list.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingMostvisited | Cryptocurrency Trending Most Visited}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get most visited cryptocurrencies for the last 24 hours and log the name, symbol, and quotes for EUR and USD
   * ```typescript
   * import type { CryptoTrendingResponse } from "cmc-api";
   *
   * type QuoteKey = "USD" | "EUR";
   * type Trending = CryptoTrendingResponse<QuoteKey>;
   * const trendings = await cmc.crypto.mostVisited<QuoteKey, Trending[]>("24h", 10, 1, ["EUR", "USD"]);
   *
   * for (const trending of trendings) {
   *    console.log(trending.name, trending.symbol, trending.slug);
   *    console.log(trending.quote.EUR, trending.quote.USD);
   * }
   * ```
   *
   * @template TQuoteKey - The key for the quote currency, defaults to "USD".
   * @template TResponse - The response type, defaults to `CryptoMostVisitedResponse<TQuoteKey>`.
   *
   * @param {("24h" | "30d" | "7d")} [timePeriod="24h"] - Adjusts the overall window of time for most visited currencies.
   * @param {number} [limit=100] - The maximum number of results to return.
   * @param {number} [offset=1] - The starting point for the results. Defaults to `1`.
   * @param {CryptoConvert} [convert] - One or more cryptocurrency or fiat currency symbols/ids.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the most visited cryptocurrencies data.
   */
  public async mostVisited<TQuoteKey extends string = "USD", TResponse = CryptoMostVisitedResponse<TQuoteKey>>(
    timePeriod: "24h" | "30d" | "7d" = "24h",
    limit: number = 100,
    offset: number = 1,
    convert?: CryptoConvert,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.mostVisited, {
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      time_period: timePeriod,
      limit: limit,
      start: offset,
    });
  }

  /**
   * A paginated list of all trending cryptocurrencies, determined and sorted by the largest price gains or losses.
   *
   * **Available api plans**: `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Every 10 minutes.* \
   * **Plan credit use**: *1 call credit per 200 cryptocurrencies returned (rounded up) and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *The CoinMarketCap {@link https://coinmarketcap.com/gainers-losers/ | Gainers & Losers} page.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyTrendingGainerslosers | Cryptocurrency Trending Gainers & Losers}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get the top 10 gainers and losers for the last 24 hours and log the name, symbol, and quotes for EUR and USD
   * ```typescript
   * import type { CryptoTrendingResponse } from "cmc-api";
   *
   * type QuoteKey = "USD" | "EUR";
   * type Trending = CryptoTrendingResponse<QuoteKey>;
   * const trendings = await cmc.crypto.gainersLosers<QuoteKey, Trending[]>("24h", 10, 1, ["EUR", "USD"]);
   *
   * for (const trending of trendings) {
   *    console.log(trending.name, trending.symbol, trending.slug);
   *    console.log(trending.quote.EUR, trending.quote.USD);
   * }
   * ```
   *
   * @template TQuoteKey - The key for the quote currency, defaults to "USD".
   * @template TResponse - The response type, defaults to `CryptoGrainersLosersResponse<TQuoteKey>`.
   *
   * @param {("1h" | "24h" | "30d" | "7d")} [timePeriod="24h"] - Adjusts the overall window of time for the biggest gainers and losers.
   * @param {number} [limit=100] - The maximum number of results to return. Defaults to `100`.
   * @param {number} [offset=1] - The starting point for the results. Defaults to `1`.
   * @param {CryptoConvert} [convert] - One or more cryptocurrency or fiat currency symbols/ids.
   * @param {("asc" | "desc")} [sortDir] - The direction in which to order cryptocurrencies against the specified sort.
   * @param {("percent_change_24h")} [sort="percent_change_24h"] - What field to sort the list of cryptocurrencies by.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the response containing the top gainers and losers.
   */
  public async gainersLosers<TQuoteKey extends string = "USD", TResponse = CryptoGrainersLosersResponse<TQuoteKey>>(
    timePeriod: "1h" | "24h" | "30d" | "7d" = "24h",
    limit: number = 100,
    offset: number = 1,
    convert?: CryptoConvert,
    sortDir?: "asc" | "desc",
    sort: "percent_change_24h" = "percent_change_24h",
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.gainersLosers, {
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      time_period: timePeriod,
      limit: limit,
      start: offset,
      sort: sort,
      sort_dir: sortDir,
    });
  }
}
