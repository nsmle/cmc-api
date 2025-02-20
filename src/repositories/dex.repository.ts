import endpoints from "@core/endpoints";
import { Repository } from "@core/repository";
import { dateToUnix } from "@util/date.util";
import { isNumeric } from "@util/type.util";
import type { Convert, SortDir } from "@option/common.type";
import type {
  AuxiliaryDexList,
  AuxiliaryDexListing,
  AuxiliaryDexMetadata,
  AuxiliaryDexOhlcv,
  AuxiliaryDexOhlcvHistorical,
  AuxiliaryDexPairs,
  AuxiliaryDexQuotes,
  DexBaseAsset,
  DexId,
  DexListingSort,
  DexListingType,
  DexListSort,
  DexNetwork,
  DexOhlcvHistoricalInterval,
  DexOhlcvHistoricalTimePeriod,
  DexPairsFilter,
  DexPairsSort,
  DexQuoteAsset,
} from "@option/dex.option";
import type {
  DexIdMapResponse,
  DexListingQuote,
  DexListingResponse,
  DexMetadataResponse,
  DexOhlcvHistoricalQuotes,
  DexOhlcvHistoricalResponse,
  DexOhlcvQuote,
  DexOhlcvResponse,
  DexPairQuote,
  DexPairsResponse,
  DexQuote,
  DexQuotesResponse,
  DexSecurityScan,
  DexTrade,
  DexTradeQuote,
  DexTradesResponse,
} from "@response/dex.response";

export class DexRepository extends Repository {
  /** @private Endpoints are used to interact with CoinMarketCap Decentralized Exchange APIs */
  private endpoints = endpoints.dex;

  /**
   * A list of all networks to unique CoinMarketCap ids. \
   * *Recommend utilizing CMC ID instead of network symbols to securely identify networks with CoinMarketCap other endpoints.* \
   * *Each network returned includes typical identifiers such as name, symbol, and token_address for flexible mapping to id.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getNetworks | DEX ID Map}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get 500 list of dex networks
   * ```typescript
   * import type { DexIdMapResponse } from "cmc-api";
   * const dexes = await cmc.dex.list<DexIdMapResponse>(500, 1, "id", "desc", ["alternativeName", "cryptocurrencyId", "cryptocurrenySlug"]);
   * for (const dex of dexes) console.log(dex.id, dex.name, dex.network_slug);
   * ```
   *
   * @template TResponse - The expected response type. default an array of `DexIdMap`
   *
   * @param {number} [limit] - Offset the start of the paginated list of items.
   * @param {number} [offset] - Determine the maximum number of results.
   * @param {DexListSort} [sort="id"] - Field to sort the list of networks by. default `"id"`
   * @param {SortDir} [sortDir="desc"] - The direction in which to sort the results. default `"desc"`
   * @param {AuxiliaryDexList} [aux=[]] - Additional auxiliary fields to include in the response.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the response of type TResponse.
   */
  public async list<TResponse = DexIdMapResponse>(
    limit?: number,
    offset?: number,
    sort: DexListSort = "id",
    sortDir: SortDir = "desc",
    aux: AuxiliaryDexList = [],
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.map, {
      limit: limit,
      offset: offset,
      sort: sort,
      sort_dir: sortDir,
      aux: aux,
    });
  }

  /**
   * Static metadata for one or more decentralised exchanges. \
   * *This information includes details like launch date, logo, official website URL, social links, and market fee documentation URL.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getListingsInfo | DEX Metadata} \
   * {@link DexMetadataResponse}
   * {@link DexMetadata}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get metadata for a list of DEX
   * ```typescript
   * import type { DexMetadataResponse } from "cmc-api";
   * const metadata = await cmc.dex.metadata<DexMetadataResponse>([51, 60, 68, 93, 118], ["urls", "logo"]);
   * console.log(metadata);
   * ```
   *
   * @template TResponse - The expected response type, defaults array of `DexMetadata`.
   *
   * @param {string | number | (string | number)[]} id - The ID(s) of the CoinMarketCap DEX to fetch metadata for.
   * @param {AuxiliaryDexMetadata} [aux] - Optional auxiliary metadata fields to include.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the metadata of the specified DEX.
   */
  public async metadata<TResponse = DexMetadataResponse>(
    id: string | number | (string | number)[],
    aux?: AuxiliaryDexMetadata,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.metadata, { id: id, aux: aux });
  }

  /**
   * A paginated list of all decentralised cryptocurrency exchanges including the latest aggregate market data for each exchange. \
   * *Use the `convert` option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getLatestListings | DEX Listings Latest} \
   * {@link DexListingQuote} \
   * {@link DexListingResponse} \
   * {@link DexListing}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get 10 list swap (in page 1) of DEX listings and sorted by volume_24h
   * ```typescript
   * import type { DexListingQuote, DexListingResponse } from "cmc-api";
   * const listings = await cmc.dex.listing<DexListingQuote, DexListingResponse>("swap", 10, 1, "volume_24h");
   * for (const listing of listings) console.log(listing);
   * ```
   *
   * @template TQuote - The type of the quote object. Defaults to `DexListingQuote`.
   * @template TResponse - The type of the response object. Defaults to `DexListingResponse<TQuote>`.
   *
   * @param {DexListingType} [type="all"] - The type of DEX listings to fetch. Defaults to "all".
   * @param {number} [limit] - The maximum number of listings to return.
   * @param {number} [offset] - Offset the start (1-based index) of the paginated list of items to return.
   * @param {DexListingSort} [sort="volume_24h"] - The field by which to sort the listings. Defaults to "volume_24h".
   * @param {SortDir} [sortDir="desc"] - The direction in which to sort the listings. Defaults to "desc".
   * @param {Convert} [convert] - The currency to convert the listings to.
   * @param {AuxiliaryDexListing} [aux] - Additional auxiliary field to include in the listings.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the response object containing the DEX listings.
   */
  public async listing<TQuote extends object = DexListingQuote, TResponse = DexListingResponse<TQuote>>(
    type: DexListingType = "all",
    limit?: number,
    offset?: number,
    sort: DexListingSort = "volume_24h",
    sortDir: SortDir = "desc",
    convert?: Convert,
    aux?: AuxiliaryDexListing,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.listings, {
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      type: type,
      limit: limit,
      offset: offset,
      sort: sort,
      sort_dir: sortDir,
      aux: aux,
    });
  }

  /**
   * The latest market quote for 1 or more spot pairs. \
   * *Use the `convert` option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getLatestPairsQuotes | DEX Quotes Latest} \
   * {@link DexQuote} \
   * {@link DexSecurityScan} \
   * {@link DexQuotesResponse} \
   * {@link DexQuotes}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get quotes of "WETH/USDT" by contract address in ethereum network by id
   * ```typescript
   * import type { DexQuote, DexSecurityScan } from "cmc-api";
   * const quotes = await cmc.dex.quotes<DexQuote, DexSecurityScan>("0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b", { id: 1 });  // "WETH/USDT"
   * console.log(quotes);
   * ```
   *
   * @example get quotes of "SOL/WETH" by contract address in ethereum network by slug
   * ```typescript
   * import type { DexQuote, DexSecurityScan } from "cmc-api";
   * const quotes = await cmc.dex.quotes<DexQuote, DexSecurityScan>("0x127452f3f9cdc0389b0bf59ce6131aa3bd763598", { slug: "ethereum" });  // "SOL/WETH"
   * console.log(quotes);
   * ```
   *
   * @template TQuote - The type of the quote object. Defaults to `DexQuote`.
   * @template TSecurityScan - The type of the security scan object. Defaults to `DexSecurityScan`.
   * @template TResponse - The type of the response object. Defaults to `DexQuotesResponse<TQuote, TSecurityScan>`.
   *
   * @param {string | string[]} contract - The contract address or addresses to fetch quotes for.
   * @param {DexNetwork} network - The network on which the contract resides.
   * @param {Convert} [convert] - The currency to convert the quotes to.
   * @param {boolean} [reverseOrder=true] - Whether to reverse the order of the quotes.
   * @param {boolean} [skipInvalid=false] - Whether to skip invalid quotes.
   * @param {AuxiliaryDexQuotes} [aux] - Auxiliary parameters for the quotes request.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the response containing the quotes.
   */
  public async quotes<
    TQuote extends object = DexQuote,
    TSecurityScan extends object = DexSecurityScan,
    TResponse = DexQuotesResponse<TQuote, TSecurityScan>,
  >(
    contract: string | string[],
    network: DexNetwork,
    convert?: Convert,
    reverseOrder: boolean = true,
    skipInvalid: boolean = false,
    aux?: AuxiliaryDexQuotes,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.quotes, {
      ...(network?.id && { network_id: network.id }),
      ...(network?.slug && { network_slug: network.slug }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      contract_address: contract,
      reverse_order: reverseOrder,
      skip_invalid: skipInvalid,
      aux: aux,
    });
  }

  /**
   * The latest trades. Returns up to the latest 100 trades for 1 spot pair. \
   * *Use the `convert` option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getPairLatestTrades | DEX Trades Latest} \
   * {@link DexTrade} \
   * {@link DexTradeQuote} \
   * {@link DexSecurityScan} \
   * {@link DexTradesResponse} \
   * {@link DexTrades} \
   * {@link DexNetwork}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get latest trades of "WETH/USDT" by contract address in ethereum network by id
   * ```typescript
   * const latestTrades = await cmc.dex.trades("0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b", { id: 1 });  // "WETH/USDT"
   * for (const token of latestTrades) {
   *    for (const trade of token.trades) console.log(trade);
   * }
   * ```
   * @example get latest trades of "SOL/WETH" by contract address in ethereum network by slug
   * ```typescript
   * const latestTrades = await cmc.dex.trades("0x127452f3f9cdc0389b0bf59ce6131aa3bd763598", { slug: "ethereum" }); // "SOL/WETH"
   * for (const token of latestTrades) {
   *   for (const trade of token.trades) console.log(trade);
   * }
   * ```
   *
   * @template TQuote - The type of the quote object, defaults to `DexTradeQuote`.
   * @template TTrade - The type of the trade object, defaults to `DexTrade<TQuote>`.
   * @template TSecurityScan - The type of the security scan object, defaults to `DexSecurityScan`.
   * @template TResponse - The type of the response object, defaults to `DexTradesResponse<TQuote, TTrade, TSecurityScan>`.
   *
   * @param {string | string[]} contract - The contract address or an array of contract addresses.
   * @param {DexNetwork} network - One CoinMarketCap cryptocurrency network id/slug.
   * @param {Convert} [convert] - The currency to convert the trades to.
   * @param {boolean} [reverseOrder=true] - Whether to reverse the order of the trades.
   * @param {boolean} [skipInvalid=false] - Whether to skip invalid trades.
   * @param {AuxiliaryDexQuotes} [aux] - Auxiliary fields for the DEX quotes to included in return.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the response containing the trades.
   */
  public async trades<
    TQuote extends object = DexTradeQuote,
    TTrade extends object = DexTrade<TQuote>,
    TSecurityScan extends object = DexSecurityScan,
    TResponse = DexTradesResponse<TQuote, TTrade, TSecurityScan>,
  >(
    contract: string | string[],
    network: DexNetwork,
    convert?: Convert,
    reverseOrder: boolean = true,
    skipInvalid: boolean = false,
    aux?: AuxiliaryDexQuotes,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.trades, {
      ...(network?.id && { network_id: network.id }),
      ...(network?.slug && { network_slug: network.slug }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      contract_address: contract,
      reverse_order: reverseOrder,
      skip_invalid: skipInvalid,
      aux: aux,
    });
  }

  /**
   * A paginated list of all active dex spot pairs with latest market data. \
   * *Use the `convert` option to return market values in multiple fiat and cryptocurrency conversions in the same call.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getSpotPairsLatest | DEX Pairs Listings Latest} \
   * {@link DexPairQuote} \
   * {@link DexSecurityScan} \
   * {@link DexPairsResponse} \
   * {@link DexPairs} \
   * {@link DexNetwork} \
   * {@link DexBaseAsset} \
   * {@link DexQuoteAsset} \
   * {@link DexPairsFilter} \
   * {@link DexPairsSort} \
   * {@link AuxiliaryDexPairs}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get list of all active dex spot pairs by network id
   * ```typescript
   * import type { DexPairQuote, DexSecurityScan } from "cmc-api";
   * const pairs = await cmc.dex.pairs<DexPairQuote, DexSecurityScan>({ id: 1 });  // networkId '1' == slug 'ethereum'
   * for (const pair of pairs) console.log(pair);
   * ```
   *
   * @example get list of all active dex spot pairs by network slug
   * ```typescript
   * import type { DexPairQuote, DexSecurityScan } from "cmc-api";
   * const pairs = await cmc.dex.pairs<DexPairQuote, DexSecurityScan>({ slug: "ethereum" });
   * for (const pair of pairs) console.log(pair);
   * ```
   *
   * @example get list of all active dex spot pairs by network id and dex id
   * ```typescript
   * import type { DexPairQuote, DexSecurityScan } from "cmc-api";
   * const pairs = await cmc.dex.pairs<DexPairQuote, DexSecurityScan>({ id: 1 }, { id: 1348 }); // networkId 1 = ethereum | dexId 1348 = "uniswap-v3"
   * for (const pair of pairs) console.log(pair);
   * ```
   *
   * @example get list of all active dex spot pairs by network slug and dex slug
   * ```typescript
   * import type { DexPairQuote, DexSecurityScan } from "cmc-api";
   * const pairs = await cmc.dex.pairs<DexPairQuote, DexSecurityScan>({ slug: "ethereum" }, { slug: "uniswap-v3" }); // ethereum | uniswap-v3
   * for (const pair of pairs) console.log(pair);
   * ```
   *
   * @template TQuote - The type for the quote object, defaults to `DexPairQuote`.
   * @template TSecurityScan - The type for the security scan object, defaults to `DexSecurityScan`.
   * @template TResponse - The type for the response, defaults to `DexPairsResponse<TQuote, TSecurityScan>`.
   *
   * @param {DexNetwork} network - The network ids/slugs.
   * @param {DexId} [id] - The DEX ids/slugs.
   * @param {DexBaseAsset} [baseAsset] - The base asset `id`, `ucid`, `symbol`, or `contract`.
   * @param {DexQuoteAsset} [quoteAsset] - The quote asset `id`, `ucid`, `symbol`, or `contract`.
   * @param {DexPairsFilter} [filters] - The filters to apply to the pairs data.
   * @param {DexPairsSort} [sort="volume_24h"] - The sorting criteria for the pairs data.
   * @param {SortDir} [sortDir="desc"] - The sorting direction, either `"asc"` or `"desc"`.
   * @param {AuxiliaryDexPairs} [aux] - Auxiliary data for the pairs request.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the pairs data response.
   */
  public async pairs<
    TQuote extends object = DexPairQuote,
    TSecurityScan extends object = DexSecurityScan,
    TResponse = DexPairsResponse<TQuote, TSecurityScan>,
  >(
    network: DexNetwork,
    id?: DexId,
    baseAsset?: DexBaseAsset,
    quoteAsset?: DexQuoteAsset,
    filters?: DexPairsFilter,
    sort: DexPairsSort = "volume_24h",
    sortDir: SortDir = "desc",
    aux?: AuxiliaryDexPairs,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.pairs, {
      ...(network?.id && { network_id: network.id }),
      ...(network?.slug && { network_slug: network.slug }),
      ...(id?.id && { dex_id: id.id }),
      ...(id?.slug && { dex_slug: id.slug }),
      ...(baseAsset?.id && { base_asset_id: baseAsset.id }),
      ...(baseAsset?.symbol && { base_asset_symbol: baseAsset.symbol }),
      ...(baseAsset?.ucid && { base_asset_ucid: baseAsset.ucid }),
      ...(baseAsset?.contract && { base_asset_contract_address: baseAsset.contract }),
      ...(quoteAsset?.id && { quote_asset_id: quoteAsset.id }),
      ...(quoteAsset?.symbol && { quote_asset_symbol: quoteAsset.symbol }),
      ...(quoteAsset?.ucid && { quote_asset_ucid: quoteAsset.ucid }),
      ...(quoteAsset?.contract && { quote_asset_contract_address: quoteAsset.contract }),
      limit: filters?.limit,
      scroll_id: filters?.scrollId,
      liquidity_min: filters?.liquidityMin,
      liquidity_max: filters?.liquidityMax,
      volume_24h_min: filters?.volume24hMin,
      volume_24h_max: filters?.volume24hMax,
      no_of_transactions_24h_min: filters?.noOfTransactions24hMin,
      no_of_transactions_24h_max: filters?.noOfTransactions24hMax,
      percent_change_24h_min: filters?.percentChange24hMin,
      percent_change_24h_max: filters?.percentChange24hMax,
      sort: sort,
      sort_dir: sortDir,
      aux: aux,
    });
  }

  /**
   * The latest OHLCV (Open, High, Low, Close, Volume) market values for one or more spot pairs for the current UTC day. \
   * *Since the current UTC day is still active these values are updated frequently.*
   * *You can find the final calculated OHLCV values for the last completed UTC day along with all historic days using {@link DexRepository.ohlcvHistory}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getPairsLatestOHLCV | DEX OHLCV Latest} \
   * {@link DexRepository.ohlcvHistory} \
   * {@link DexOhlcvQuote} \
   * {@link DexSecurityScan} \
   * {@link DexOhlcvResponse} \
   * {@link DexOhlcv} \
   * {@link DexNetwork} \
   * {@link Convert} \
   * {@link AuxiliaryDexOhlcv}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get the latest OHLCV data by contract address and network id
   * ```typescript
   * import type { DexOhlcvQuote, DexSecurityScan } from "cmc-api";
   * const ohlcvs = await cmc.dex.ohlcv<DexOhlcvQuote, DexSecurityScan>("0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b", { id: 1 }); // "WETH/USDT"
   * for (const ohlcv of ohlcvs) console.log(ohlcv);
   * ```
   * @example get the latest OHLCV data by contract address and network slug
   * ```typescript
   * import type { DexOhlcvQuote, DexSecurityScan } from "cmc-api";
   * const ohlcvs = await cmc.dex.ohlcv<DexOhlcvQuote, DexSecurityScan>("0x127452f3f9cdc0389b0bf59ce6131aa3bd763598", { slug: "ethereum" }); // "SOL/WETH"
   * for (const ohlcv of ohlcvs) console.log(ohlcv);
   * ```
   *
   * @template TQuote - The type for the quote object, defaults to `DexOhlcvQuote`.
   * @template TSecurityScan - The type for the security scan object, defaults to `DexSecurityScan`.
   * @template TResponse - The type for the response, defaults to `DexOhlcvResponse<TQuote, TSecurityScan>`.
   *
   * @param {string | string[]} contract - The contract address or addresses to get the OHLCV data for.
   * @param {DexNetwork} network - The network ids/slug on which the contract(s) reside.
   * @param {Convert} [convert] - The currency to convert the OHLCV data to.
   * @param {boolean} [reverseOrder=true] - Whether to reverse the order of the returned data.
   * @param {boolean} [skipInvalid=false] - Whether to skip invalid data points.
   * @param {AuxiliaryDexOhlcv} [aux] - Optional auxiliary data for the OHLCV request.
   *
   * @returns {Promise<TResponse>} - A promise that resolves to the OHLCV data response.
   */
  public async ohlcv<
    TQuote extends object = DexOhlcvQuote,
    TSecurityScan extends object = DexSecurityScan,
    TResponse = DexOhlcvResponse<TQuote, TSecurityScan>,
  >(
    contract: string | string[],
    network: DexNetwork,
    convert?: Convert,
    reverseOrder: boolean = true,
    skipInvalid: boolean = false,
    aux?: AuxiliaryDexOhlcv,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.ohlcv, {
      ...(network?.id && { network_id: network.id }),
      ...(network?.slug && { network_slug: network.slug }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      contract_address: contract,
      reverse_order: reverseOrder,
      skip_invalid: skipInvalid,
      aux: aux,
    });
  }

  /**
   * The historical OHLCV (Open, High, Low, Close, Volume) data along with market cap for any spot pairs using time interval parameters.
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getPairHistoricalOHLCV | DEX OHLCV Historical} \
   * {@link DexOhlcvHistorical} \
   * {@link DexOhlcvHistoricalResponse} \
   * {@link DexOhlcvHistoricalQuotes} \
   * {@link DexSecurityScan} \
   * {@link DexNetwork} \
   * {@link Convert} \
   * {@link DexOhlcvHistoricalTimePeriod} \
   * {@link DexOhlcvHistoricalInterval} \
   * {@link AuxiliaryDexOhlcvHistorical}
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get historical OHLCV data on daily interval and period by contract address and network id
   * ```typescript
   * import type { DexOhlcvHistoricalQuotes, DexSecurityScan } from "cmc-api";
   * const ohlcvsHistories = await cmc.dex.ohlcvHistory<DexOhlcvHistoricalQuotes, DexSecurityScan>("0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b", { id: 1 }); // USDT/WETH in uniswap-v3 DEX
   * for (const ohlcvHistory of ohlcvsHistories) console.log(ohlcvHistory);
   * ```
   *
   * @example get historical OHLCV data on daily interval and period by contract address and network slug
   * ```typescript
   * import type { DexOhlcvHistoricalQuotes, DexSecurityScan } from "cmc-api";
   * const ohlcvsHistories = await cmc.dex.ohlcvHistory<DexOhlcvHistoricalQuotes, DexSecurityScan>("0x127452f3f9cdc0389b0bf59ce6131aa3bd763598", { slug: "ethereum" }); // SOL/WETH in uniswap-v3 DEX
   * for (const ohlcvHistory of ohlcvsHistories) console.log(ohlcvHistory);
   * ```
   *
   * @template TQuotes - The type for the quotes object. Defaults to `DexOhlcvHistoricalQuotes`.
   * @template TSecurityScan - The type for the security scan object. Defaults to `DexSecurityScan`.
   * @template TResponse - The type for the response object. Defaults to `DexOhlcvHistoricalResponse<TQuotes, TSecurityScan>`.
   *
   * @param {string | string[]} contract - The contract address or an array of contract addresses.
   * @param {DexNetwork} network - The network ids/slug on which the contract resides.
   * @param {Date} [timeStart] - The start time for the historical data.
   * @param {Date} [timeEnd] - The end time for the historical data.
   * @param {DexOhlcvHistoricalTimePeriod} [timePeriod="daily"] - The time period for the historical data (e.g., `"daily"`, `"weekly"`).
   * @param {number} [count] - The number of data points to fetch. The default is `10 items`. The current query limit is `500 items`
   * @param {DexOhlcvHistoricalInterval} [interval="daily"] - The interval for the historical data (e.g., `"daily"`, `"hourly"`).
   * @param {Convert} [convert] - The currency to convert the data to.
   * @param {boolean} [reverseOrder=true] - Whether to reverse the order of the data points.
   * @param {boolean} [skipInvalid=false] - Whether to skip invalid data points.
   * @param {AuxiliaryDexOhlcvHistorical} [aux] - Auxiliary data for the historical request.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the historical OHLCV data.
   */
  public async ohlcvHistory<
    TQuotes extends object = DexOhlcvHistoricalQuotes,
    TSecurityScan extends object = DexSecurityScan,
    TResponse = DexOhlcvHistoricalResponse<TQuotes, TSecurityScan>,
  >(
    contract: string | string[],
    network: DexNetwork,
    timeStart?: Date,
    timeEnd?: Date,
    timePeriod: DexOhlcvHistoricalTimePeriod = "daily",
    count?: number,
    interval: DexOhlcvHistoricalInterval = "daily",
    convert?: Convert,
    reverseOrder: boolean = true,
    skipInvalid: boolean = false,
    aux?: AuxiliaryDexOhlcvHistorical,
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.ohlcvHistorical, {
      ...(network?.id && { network_id: network.id }),
      ...(network?.slug && { network_slug: network.slug }),
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      contract_address: contract,
      time_start: dateToUnix(timeStart),
      time_end: dateToUnix(timeEnd),
      time_period: timePeriod,
      count: count,
      interval: interval,
      reverse_order: reverseOrder,
      skip_invalid: skipInvalid,
      aux: aux,
    });
  }
}
