import endpoints from "@core/endpoints";
import { describe, expect, test } from "@jest/globals";

describe("endpoints", (): void => {
  test("crypto", (): void => {
    expect(endpoints.crypto.map).toBe("/v1/cryptocurrency/map");
    expect(endpoints.crypto.metadata).toBe("/v2/cryptocurrency/info");
    expect(endpoints.crypto.listings).toBe("/v1/cryptocurrency/listings/latest");
    expect(endpoints.crypto.listingsHistorical).toBe("/v1/cryptocurrency/listings/historical");
    expect(endpoints.crypto.quotes).toBe("/v2/cryptocurrency/quotes/latest");
    expect(endpoints.crypto.quotesHistorical).toBe("/v2/cryptocurrency/quotes/historical");
    expect(endpoints.crypto.marketPairs).toBe("/v2/cryptocurrency/market-pairs/latest");
    expect(endpoints.crypto.ohlc).toBe("/v2/cryptocurrency/ohlcv/latest");
    expect(endpoints.crypto.ohlcHistorical).toBe("/v2/cryptocurrency/ohlcv/historical");
    expect(endpoints.crypto.performance).toBe("/v2/cryptocurrency/price-performance-stats/latest");
    expect(endpoints.crypto.categories).toBe("/v1/cryptocurrency/categories");
    expect(endpoints.crypto.category).toBe("/v1/cryptocurrency/category");
    expect(endpoints.crypto.airdrops).toBe("/v1/cryptocurrency/airdrops");
    expect(endpoints.crypto.airdrop).toBe("/v1/cryptocurrency/airdrop");
    expect(endpoints.crypto.trending).toBe("/v1/cryptocurrency/trending/latest");
    expect(endpoints.crypto.mostVisited).toBe("/v1/cryptocurrency/trending/most-visited");
    expect(endpoints.crypto.gainersLosers).toBe("/v1/cryptocurrency/trending/gainers-losers");
  });

  test("dex", (): void => {
    expect(endpoints.dex.listings).toBe("/v4/dex/listings/quotes");
    expect(endpoints.dex.metadata).toBe("/v4/dex/listings/info");
    expect(endpoints.dex.networks).toBe("/v4/dex/networks/list");
    expect(endpoints.dex.pairs).toBe("/v4/dex/spot-pairs/latest");
    expect(endpoints.dex.quotes).toBe("/v4/dex/pairs/quotes/latest");
    expect(endpoints.dex.ohlcv).toBe("/v4/dex/pairs/ohlcv/latest");
    expect(endpoints.dex.ohlcvHistorical).toBe("/v4/dex/pairs/ohlcv/historical");
    expect(endpoints.dex.trades).toBe("/v4/dex/pairs/trade/latest");
  });

  test("cex", (): void => {
    expect(endpoints.cex.map).toBe("/v1/exchange/map");
    expect(endpoints.cex.metadata).toBe("/v1/exchange/info");
    expect(endpoints.cex.listings).toBe("/v1/exchange/listings/latest");
    expect(endpoints.cex.quotes).toBe("/v1/exchange/quotes/latest");
    expect(endpoints.cex.quotesHistorical).toBe("/v1/exchange/quotes/historical");
    expect(endpoints.cex.pairs).toBe("/v1/exchange/market-pairs/latest");
    expect(endpoints.cex.assets).toBe("/v1/exchange/assets");
  });

  test("metrics", (): void => {
    expect(endpoints.metric.quotes).toBe("/v1/global-metrics/quotes/latest");
    expect(endpoints.metric.quotesHistorical).toBe("/v1/global-metrics/quotes/historical");
    expect(endpoints.metric.index).toBe("/v3/index/cmc100-latest");
    expect(endpoints.metric.indexHistorical).toBe("/v3/index/cmc100-historical");
    expect(endpoints.metric.fearAndGreed).toBe("/v3/fear-and-greed/latest");
    expect(endpoints.metric.fearAndGreedHistorical).toBe("/v3/fear-and-greed/historical");
  });

  test("community", (): void => {
    expect(endpoints.community.news).toBe("/v1/content/latest");
    expect(endpoints.community.top).toBe("/v1/content/posts/top");
    expect(endpoints.community.latest).toBe("/v1/content/posts/latest");
    expect(endpoints.community.comments).toBe("/v1/content/posts/comments");
    expect(endpoints.community.trendingTopic).toBe("/v1/community/trending/topic");
    expect(endpoints.community.trendingToken).toBe("/v1/community/trending/token");
  });

  test("misc", (): void => {
    expect(endpoints.misc.fiat).toBe("/v1/fiat/map");
    expect(endpoints.misc.priceConversion).toBe("/v2/tools/price-conversion");
  });
});
