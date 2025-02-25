/**
 * Various CoinMarketCap cryptocurrency endpoints.
 * @see {@link https://pro.coinmarketcap.com/api/v1#tag/cryptocurrency | CoinMarketCap Cryptocurrency API Endpoints}
 */
const crypto = {
  /** The CoinMarketCap cryptocurrency ID map endpoint. */
  map: "/v1/cryptocurrency/map",

  /** The cryptocurrency metadata endpoint. */
  metadata: "/v2/cryptocurrency/info",

  /** The latest cryptocurrency listings endpoint. */
  listings: "/v1/cryptocurrency/listings/latest",

  /** The new cryptocurrency listings endpoint. */
  listingsNew: "/v1/cryptocurrency/listings/new",

  /** The historical cryptocurrency listings endpoint. */
  listingsHistorical: "/v1/cryptocurrency/listings/historical",

  /** The latest cryptocurrency quotes endpoint. */
  quotes: "/v2/cryptocurrency/quotes/latest",

  /** The historical cryptocurrency quotes endpoint. */
  quotesHistorical: "/v2/cryptocurrency/quotes/historical",

  /** The historical cryptocurrency quotes (version 3) endpoint. */
  quotesHistoricalV3: "/v3/cryptocurrency/quotes/historical",

  /** The latest cryptocurrency market pairs endpoint. */
  marketPairs: "/v2/cryptocurrency/market-pairs/latest",

  /** The latest cryptocurrency OHLCV endpoint. */
  ohlcv: "/v2/cryptocurrency/ohlcv/latest",

  /** The historical cryptocurrency OHLCV endpoint. */
  ohlcvHistorical: "/v2/cryptocurrency/ohlcv/historical",

  /** The latest cryptocurrency price performance statistics endpoint. */
  performance: "/v2/cryptocurrency/price-performance-stats/latest",

  /** The cryptocurrency categories endpoint. */
  categories: "/v1/cryptocurrency/categories",

  /** The cryptocurrency category endpoint. */
  category: "/v1/cryptocurrency/category",

  /** The cryptocurrency airdrops endpoint. */
  airdrops: "/v1/cryptocurrency/airdrops",

  /** The cryptocurrency airdrop endpoint. */
  airdrop: "/v1/cryptocurrency/airdrop",

  /** The latest cryptocurrencies trending endpoint. */
  trending: "/v1/cryptocurrency/trending/latest",

  /** The most visited trending cryptocurrencies endpoint. */
  mostVisited: "/v1/cryptocurrency/trending/most-visited",

  /** The trending gainers and losers of cryptocurrencies endpoint. */
  gainersLosers: "/v1/cryptocurrency/trending/gainers-losers",
};

/**
 * Various decentralized exchange (DEX) endpoints.
 * @see {@link https://pro.coinmarketcap.com/api/v1#tag/DexScan | CoinMarketCap DexScan API Endpoints}
 */
const dex = {
  /** The all networks of DEXes endpoint. */
  map: "/v4/dex/networks/list",

  /** The latest listings of DEXes endpoint. */
  listings: "/v4/dex/listings/quotes",

  /** The metadata of DEXes endpoint. */
  metadata: "/v4/dex/listings/info",

  /** The latest listings of trading pairs DEXes endpoint. */
  pairs: "/v4/dex/spot-pairs/latest",

  /** The latest quotes of trading pairs DEXes endpoint. */
  quotes: "/v4/dex/pairs/quotes/latest",

  /** The latest DEXes OHLCV quotes endpoint. */
  ohlcv: "/v4/dex/pairs/ohlcv/latest",

  /** The historical DEXes OHLCV quotes endpoint. */
  ohlcvHistorical: "/v4/dex/pairs/ohlcv/historical",

  /** The latest 100 DEXes trades endpoint. */
  trades: "/v4/dex/pairs/trade/latest",
};

/**
 * Various CoinMarketCap exchange endpoints.
 * @see {@link https://pro.coinmarketcap.com/api/v1#tag/exchange | CoinMarketCap exchange API Endpoints}
 */
const cex = {
  /** The CoinMarketCap exchange ID map endpoint. */
  map: "/v1/exchange/map",

  /** The exchange metadata endpoint. */
  metadata: "/v1/exchange/info",

  /** The latest exchange listings endpoint. */
  listings: "/v1/exchange/listings/latest",

  /** The latest exchange quotes endpoint. */
  quotes: "/v1/exchange/quotes/latest",

  /** The historical exchange quotes endpoint. */
  quotesHistorical: "/v1/exchange/quotes/historical",

  /** The latest market pairs on exchanges endpoint. */
  pairs: "/v1/exchange/market-pairs/latest",

  /** The exchange assets endpoint. */
  assets: "/v1/exchange/assets",
};

/**
 * Various global metrics and indices endpoints.
 *
 * @see
 * {@link https://pro.coinmarketcap.com/api/v1#tag/global-metrics | CoinMarketCap Global Metrics API Endpoints}. \
 * {@link https://pro.coinmarketcap.com/api/v1#tag/CMC100-Index | CoinMarketCap CMC100-Index API Endpoints}. \
 * {@link https://pro.coinmarketcap.com/api/v1#tag/fear-and-greed | CoinMarketCap Fear-And-Greed API Endpoints}. \
 * {@link https://pro.coinmarketcap.com/api/v1#tag/blockchain | CoinMarketCap Blockchain API Endpoints}.
 */
const metric = {
  /** The latest global metrics quotes endpoint. */
  quotes: "/v1/global-metrics/quotes/latest",

  /** The historical global metrics quotes endpoint. */
  quotesHistorical: "/v1/global-metrics/quotes/historical",

  /** The latest CoinMarketCap 100 Index endpoint. */
  index: "/v3/index/cmc100-latest",

  /** The historical CoinMarketCap 100 Index endpoint. */
  indexHistorical: "/v3/index/cmc100-historical",

  /** The latest CoinMarketCap Fear and Greed Index endpoint. */
  fearAndGreed: "/v3/fear-and-greed/latest",

  /** The historical CoinMarketCap Fear and Greed Index endpoint. */
  fearAndGreedHistorical: "/v3/fear-and-greed/historical",

  /** The latest Blockchain Statistics endpoint. */
  blockchainStats: "/v1/blockchain/statistics/latest",
};

/**
 * Various community content and trends endpoints
 *
 * @see
 * {@link https://pro.coinmarketcap.com/api/v1#tag/content | CoinMarketCap Content API Endpoints}. \
 * {@link https://pro.coinmarketcap.com/api/v1#tag/community | CoinMarketCap Community API Endpoints}.
 */
const community = {
  /** The latest content endpoint. */
  news: "/v1/content/latest",

  /** The top posts endpoint. */
  top: "/v1/content/posts/top",

  /** The latest posts endpoint. */
  latest: "/v1/content/posts/latest",

  /** The comments on posts endpoint. */
  comments: "/v1/content/posts/comments",

  /** The trending community topics endpoint. */
  trendingTopic: "/v1/community/trending/topic",

  /** The trending community tokens endpoint. */
  trendingToken: "/v1/community/trending/token",
};

/**
 * Various tools & other CoinMarketCap API endpoints.
 *
 * @see
 * {@link https://pro.coinmarketcap.com/api/v1#tag/tools | CoinMarketCap Tools API Endpoints}. \
 * {@link https://pro.coinmarketcap.com/api/v1#tag/fiat | CoinMarketCap Fiat API Endpoints}. \
 * {@link https://pro.coinmarketcap.com/api/v1#tag/key | CoinMarketCap Key API Endpoints}.
 */
const misc = {
  /** The list of fiat currencies endpoint. */
  fiat: "/v1/fiat/map",

  /** The price conversion tool endpoint. */
  priceConversion: "/v2/tools/price-conversion",

  /** The usage statistics of the API key endpoint. */
  usageStats: "/v1/key/info",
};

/**
 * Various of endpoint the CoinMarketCap API.
 */
export const endpoints = {
  /** Various CoinMarketCap cryptocurrency endpoints. */
  crypto,

  /** Various decentralized exchange (DEX) endpoints. */
  dex,

  /** Various CoinMarketCap exchange endpoints. */
  cex,

  /** Various global metrics and indices endpoints. */
  metric,

  /** Various community content and trends endpoints. */
  community,

  /** Various tools & other CoinMarketCap API endpoints. */
  misc,
};

export default endpoints;
