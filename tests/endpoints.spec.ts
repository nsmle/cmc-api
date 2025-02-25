import { beforeAll, describe, expect, test } from "@jest/globals";
import endpoints from "@core/endpoints";

interface PostmanItem {
  name?: string;
  request?: { url?: { path?: string[] } };
  item?: PostmanItem[];
}

const getEndpoint = (postmanItems: PostmanItem[], name: string, key: string): string => {
  function search(items: PostmanItem[]): string {
    for (const item of items) {
      if (item.name === name && item.request?.url?.path?.includes(key))
        return [""].concat(item.request.url.path ?? [])?.join("/");
      if (item.item) {
        const result = search(item.item);
        if (result) return result;
      }
    }
    return "";
  }

  return search(postmanItems);
};

describe("Endpoints", (): void => {
  let item: unknown[] = [];

  beforeAll(async (): Promise<void> => {
    const postman = await fetch("https://pro-api.coinmarketcap.com/v1/tools/postman").then(
      async (res): Promise<{ item: unknown[] }> => (await res.json()) as { item: unknown[] },
    );
    item = postman.item;
  });

  describe("Cryptocurrency", (): void => {
    const e = (name: string): string => getEndpoint(item, name, "cryptocurrency");
    test("List", (): void => expect(e("CoinMarketCap ID Map")).toBe(endpoints.crypto.map));
    test("Metadata", (): void => expect(e("Metadata v2")).toBe(endpoints.crypto.metadata));
    test("Listings Latest", (): void => expect(e("Listings Latest")).toBe(endpoints.crypto.listings));
    test("Listings New", (): void => expect(e("Listings New")).toBe(endpoints.crypto.listingsNew));
    test("Listings Historical", (): void => expect(e("Listings Historical")).toBe(endpoints.crypto.listingsHistorical));
    test("Quotes Latest", (): void => expect(e("Quotes Latest v2")).toBe(endpoints.crypto.quotes));
    test("Quotes Historical", (): void => expect(e("Quotes Historical v2")).toBe(endpoints.crypto.quotesHistorical));
    test("Quotes Historical v3", (): void =>
      expect(e("Quotes Historical v3")).toBe(endpoints.crypto.quotesHistoricalV3));
    test("Market Pairs Latest", (): void => expect(e("Market Pairs Latest v2")).toBe(endpoints.crypto.marketPairs));
    test("OHLCV Latest", (): void => expect(e("OHLCV Latest v2")).toBe(endpoints.crypto.ohlcv));
    test("OHLCV Historical", (): void => expect(e("OHLCV Historical v2")).toBe(endpoints.crypto.ohlcvHistorical));
    test("Price Performance Stats", (): void =>
      expect(e("Price Performance Stats v2")).toBe(endpoints.crypto.performance));
    test("Categories", (): void => expect(e("Categories")).toBe(endpoints.crypto.categories));
    test("Category", (): void => expect(e("Category")).toBe(endpoints.crypto.category));
    test("Airdrops", (): void => expect(e("Airdrops")).toBe(endpoints.crypto.airdrops));
    test("Airdrop", (): void => expect(e("Airdrop")).toBe(endpoints.crypto.airdrop));
    test("Trending Latest", (): void => expect(e("Trending Latest")).toBe(endpoints.crypto.trending));
    test("Trending Most Visited", (): void => expect(e("Trending Most Visited")).toBe(endpoints.crypto.mostVisited));
    test("Trending Gainers & Losers", (): void =>
      expect(e("Trending Gainers & Losers")).toBe(endpoints.crypto.gainersLosers));
  });

  describe("Dexes", (): void => {
    test("Listings", (): void => expect("/v4/dex/listings/quotes").toBe(endpoints.dex.listings));
    test("Metadata", (): void => expect("/v4/dex/listings/info").toBe(endpoints.dex.metadata));
    test("Networks", (): void => expect("/v4/dex/networks/list").toBe(endpoints.dex.map));
    test("Pairs", (): void => expect("/v4/dex/spot-pairs/latest").toBe(endpoints.dex.pairs));
    test("Quotes", (): void => expect("/v4/dex/pairs/quotes/latest").toBe(endpoints.dex.quotes));
    test("OHLCV Latest", (): void => expect("/v4/dex/pairs/ohlcv/latest").toBe(endpoints.dex.ohlcv));
    test("OHLCV Historical", (): void => expect("/v4/dex/pairs/ohlcv/historical").toBe(endpoints.dex.ohlcvHistorical));
    test("Trade", (): void => expect("/v4/dex/pairs/trade/latest").toBe(endpoints.dex.trades));
  });

  describe("Exchange", (): void => {
    const e = (name: string): string => getEndpoint(item, name, "exchange");
    test("List", (): void => expect(e("CoinMarketCap ID Map")).toBe(endpoints.cex.map));
    test("Metadata", (): void => expect(e("Metadata")).toBe(endpoints.cex.metadata));
    test("Listings", (): void => expect(e("Listings Latest")).toBe(endpoints.cex.listings));
    test("Quotes Latest", (): void => expect(e("Quotes Latest")).toBe(endpoints.cex.quotes));
    test("Quotes Historical", (): void => expect(e("Quotes Historical")).toBe(endpoints.cex.quotesHistorical));
    test("Market Pairs", (): void => expect(e("Market Pairs Latest")).toBe(endpoints.cex.pairs));
    test("Assets", (): void => expect(e("Exchange Assets")).toBe(endpoints.cex.assets));
  });

  describe("Metrics", (): void => {
    const m = (name: string): string => getEndpoint(item, name, "global-metrics");
    const f = (name: string): string => getEndpoint(item, name, "fear-and-greed");

    test("Quotes Latest", (): void => expect(m("Quotes Latest")).toBe(endpoints.metric.quotes));
    test("Quotes Historical", (): void => expect(m("Quotes Historical")).toBe(endpoints.metric.quotesHistorical));
    test("CMC100 Latest", (): void => expect("/v3/index/cmc100-latest").toBe(endpoints.metric.index));
    test("CMC100 Historical", (): void => expect("/v3/index/cmc100-historical").toBe(endpoints.metric.indexHistorical));
    test("Fear and Greed Latest", (): void =>
      expect(f("CMC Crypto Fear and Greed Latest")).toBe(endpoints.metric.fearAndGreed));
    test("Fear and Greed Historical", (): void =>
      expect(f("CMC Crypto Fear and Greed Historical")).toBe(endpoints.metric.fearAndGreedHistorical));
  });

  describe("Community", (): void => {
    const c = (name: string): string => getEndpoint(item, name, "community");
    const p = (name: string): string => getEndpoint(item, name, "content");
    test("Content Latest", (): void => expect(p("Content Latest")).toBe(endpoints.community.news));
    test("Content Top Posts", (): void => expect(p("Content Top Posts")).toBe(endpoints.community.top));
    test("Content Latest Posts", (): void => expect(p("Content Latest Posts")).toBe(endpoints.community.latest));
    test("Content Post Comments", (): void => expect(p("Content Post Comments")).toBe(endpoints.community.comments));
    test("Community Trending Topics", (): void =>
      expect(c("Community Trending Topics")).toBe(endpoints.community.trendingTopic));
    test("Community Trending Tokens", (): void =>
      expect(c("Community Trending Tokens")).toBe(endpoints.community.trendingToken));
  });

  describe("Tools", (): void => {
    test("Fiat Currencies", (): void =>
      expect(getEndpoint(item, "CoinMarketCap ID Map", "fiat")).toBe(endpoints.misc.fiat));
    test("Price Conversion", (): void =>
      expect(getEndpoint(item, "Price Conversion v2", "tools")).toBe(endpoints.misc.priceConversion));
    test("ApiKey Usage Stats", (): void =>
      expect(getEndpoint(item, "Key Info", "key")).toBe(endpoints.misc.usageStats));
  });
});
