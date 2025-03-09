import endpoints from "@core/endpoints";
import { Repository } from "@core/repository";
import { dateToUnix } from "@util/date.util";
import { Enumerable } from "@util/decorators.util";
import { isNumeric } from "@util/type.util";
import type { MiscFiatSort, MiscPriceBase, MiscPriceConvert } from "@option/misc.option";
import type {
  MiscFiatsResponse,
  MiscKeyInfoResponse,
  MiscPriceConversionQuote,
  MiscPriceConversionResponse,
} from "@response/misc.response";

export class MiscRepository extends Repository {
  /**
   * Endpoints are used to interact with CoinMarketCap tools and other miscellaneous APIs.
   * @internal @private
   */
  @Enumerable(false)
  private endpoints = endpoints.misc;

  /**
   * The API key details and usage stats. \
   * *This endpoint can be used to programmatically monitor your key usage compared to the rate limit and daily/monthly credit limits available to your API plan.* \
   * *You may use the Developer Portal's account dashboard as an alternative to this endpoint.*
   *
   * **Available api plans**: `Basic`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *No cache.* \
   * **Plan credit use**: *No API credit cost.* \
   * **CMC equivalent pages**: *CMC Developer Portal dashboard for your API Key at {@link https://pro.coinmarketcap.com/account/ | pro.coinmarketcap.com/account}.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1KeyInfo | CoinMarketCap Key Info}. \
   * {@link MiscKeyInfoResponse}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get the usage statistics of your API key.
   * ```typescript
   * import type { MiscKeyInfo } from "cmc-api";
   *
   * const apikeyStats = await cmc.misc.usage<MiscKeyInfo>();
   * console.log(apikeyStats.plan);
   * console.log(apikeyStats.usage);
   * ```
   *
   * @template TResponse - The expected response type, defaults to `MiscKeyInfoResponse`.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the usage statistics.
   */
  public async usage<TResponse = MiscKeyInfoResponse>(): Promise<TResponse> {
    return await this.cmc.client.req(this.endpoints.usageStats);
  }

  /**
   * A mapping of all supported fiat currencies to unique CoinMarketCap ids.
   *
   * **Available api plans**: `Basic`, `Hobbyist`, `Startup`, `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *Mapping data is updated only as needed, every `30 seconds`.* \
   * **Plan credit use**: *1 API call credit per request no matter query size.* \
   * **CMC equivalent pages**: *No equivalent, this data is only available via API.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1FiatMap | CoinMarketCap Fiat ID Map}. \
   * {@link MiscFiatsResponse}. \
   * {@link MiscFiatSort}. \
   * {@link MiscFiat}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get a list of all supported fiat currencies.
   * ```typescript
   * import type { MiscFiat } from "cmc-api";
   *
   * const fiats = await cmc.misc.fiats<MiscFiat[]>(4000, 1, "id", true);
   * for (const fiat of fiats) console.log(fiat.name);
   * ```
   *
   * @template TResponse - The expected response type. Defaults to `MiscFiatsResponse`.
   *
   * @param {number} [limit] - The maximum number of results to return.
   * @param {number} [offset=1] - The start of pagination size.
   * @param {MiscFiatSort} [sort="id"] - The sorting criteria for the results.
   * @param {boolean} [includeMetals=false] - Whether to include metals in the results.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the response of type TResponse.
   */
  public async fiats<TResponse = MiscFiatsResponse>(
    limit?: number,
    offset: number = 1,
    sort: MiscFiatSort = "id",
    includeMetals: boolean = false,
  ): Promise<TResponse> {
    return await this.cmc.client.req(this.endpoints.fiat, {
      limit: limit,
      start: offset,
      sort: sort,
      include_metals: includeMetals,
    });
  }

  /**
   * Convert an amount of one cryptocurrency or fiat currency into one or more different currencies utilizing the latest market rate for each currency. \
   * *You may optionally pass a historical timestamp as time to convert values based on historical rates (as your API plan supports).*
   *
   * **Available api plans**:
   * - `Basic` *(Latest market price conversions)*
   * - `Hobbyist` *(Latest market price conversions + 1 month historical)*
   * - `Startup` *(Latest market price conversions + 1 month historical)*
   * - `Standard` *(Latest market price conversions + 3 months historical)*
   * - `Professional` *(Latest market price conversions + 12 months historical)*.
   * - `Enterprise` *(Latest market price conversions + up to 6 years historical)*.
   *
   * **Cache frequency**: *Every `60 seconds` for the lastest cryptocurrency and fiat currency rates.* \
   * **Plan credit use**: *1 call credit per call and 1 call credit per `convert` option beyond the first.* \
   * **CMC equivalent pages**: *CMC cryptocurrency conversion page at {@link https://coinmarketcap.com/converter/ | coinmarketcap.com/converter/}*
   *
   * **Technical Notes**:
   * - Latest market rate conversions are accurate to 1 minute of specificity. \
   *   Historical conversions are accurate to 1 minute of specificity outside of non-USD fiat conversions which have 5 minute specificity.
   * - You may reference a current list of all supported cryptocurrencies via the {@link https://pro.coinmarketcap.com/api/v1/#section/Standards-and-Conventions | cryptocurrency/map} endpoint. \
   *   This endpoint also returns the supported date ranges for historical conversions via the `first_historical_data` and `last_historical_data` properties.
   * - Conversions are supported in 93 different fiat currencies and 4 precious metals {@link https://pro.coinmarketcap.com/api/v1/#section/Standards-and-Conventions | as outlined here}.
   *   Historical fiat conversions are supported as far back as 2013-04-28.
   * - A `last_updated` timestamp is included for both your source currency and each conversion currency. \
   *   This is the timestamp of the closest market rate record referenced for each currency during the conversion.
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV2ToolsPriceconversion | CoinMarketCap Price Conversion v2}. \
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ToolsPriceconversion | CoinMarketCap Price Conversion v1 *(deprecated)*}. \
   * {@link https://pro.coinmarketcap.com/api/v1/#section/Standards-and-Conventions | CoinMarketCap Standards and Conventions}. \
   * {@link MiscPriceConversionResponse}. \
   * {@link MiscPriceConversionQuote}. \
   * {@link MiscPriceConversion}. \
   * {@link MiscPriceConvert}. \
   * {@link MiscPriceBase}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example convert an amount of ethereum to fiat currency by id.
   * ```typescript
   * const converted = await cmc.misc.priceConvert<"EUR" | "USD">(1, { id: 1027 }, ["EUR", "USD"]);
   * console.log(converted.quote.EUR, converted.quote.USD);
   * ```
   *
   * @example convert an amount of ethereum to fiat currency by symbol.
   * ```typescript
   * const converted = await cmc.misc.priceConvert<"EUR" | "USD">(1, { symbol: "ETH" }, ["EUR", "USD"]);
   * console.log(converted.quote.EUR, converted.quote.USD);
   * ```
   *
   * @template TQuoteKey - The type of the quote key, defaults to `string`.
   * @template TQuoteValue - The type of the quote value, defaults to `MiscPriceConversionQuote`.
   * @template TResponse - The type of the response, defaults to `MiscPriceConversionResponse<TQuoteKey, TQuoteValue>`.
   *
   * @param {number} amount - The amount to be converted.
   * @param {MiscPriceBase} base - The base currency id/slug.
   * @param {MiscPriceConvert} [convert] - The target currency IDs/slugs.
   * @param {Date} [time] - The specific time for the conversion rate.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the conversion response.
   */
  public async priceConvert<
    TQuoteKey extends string = string,
    TQuoteValue extends object = MiscPriceConversionQuote,
    TResponse = MiscPriceConversionResponse<TQuoteKey, TQuoteValue>,
  >(amount: number, base: MiscPriceBase, convert?: MiscPriceConvert, time?: Date): Promise<TResponse> {
    return await this.cmc.client.req(this.endpoints.priceConversion, {
      ...(isNumeric(convert) ? { convert_id: convert } : { convert }),
      ...(base?.id && { id: base.id }),
      ...(base?.symbol && { symbol: base.symbol }),
      ...(time && { time: dateToUnix(time) }),
      amount: amount,
    });
  }
}
