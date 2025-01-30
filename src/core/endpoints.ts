/**
 * Endpoints that return data around cryptocurrencies such as ordered cryptocurrency lists or price and volume data.
 */
const crypto = {
  // CoinMarketCap cryptocurrency ID map
  map: "/v1/cryptocurrency/map",
  // Metadata
  metadata: "/v2/cryptocurrency/info",
  // Latest listings
  listings: "/v1/cryptocurrency/listings/latest",
  // New listings
  listingsNew: "/v1/cryptocurrency/listings/new",
  //  Historical listings
  listingsHistorical: "/v1/cryptocurrency/listings/historical",
  // Latest quotes
  quotes: "/v2/cryptocurrency/quotes/latest",
  // Historical quotes
  quotesHistorical: "/v2/cryptocurrency/quotes/historical",
  quotesHistoricalV3: "/v3/cryptocurrency/quotes/historical",
  // Latest market pairs
  marketPairs: "/v2/cryptocurrency/market-pairs/latest",
  // Latest OHLCV
  ohlcv: "/v2/cryptocurrency/ohlcv/latest",
  // Historical OHLCV
  ohlcvHistorical: "/v2/cryptocurrency/ohlcv/historical",
  // Price performance Stats
  performance: "/v2/cryptocurrency/price-performance-stats/latest",
  // Categories
  categories: "/v1/cryptocurrency/categories",
  // Category
  category: "/v1/cryptocurrency/category",
  // Airdrops
  airdrops: "/v1/cryptocurrency/airdrops",
  // Airdrop
  airdrop: "/v1/cryptocurrency/airdrop",
  // Trending Latest
  trending: "/v1/cryptocurrency/trending/latest",
  // Trending Most Visited
  mostVisited: "/v1/cryptocurrency/trending/most-visited",
  // Trending Gainers & Losers
  gainersLosers: "/v1/cryptocurrency/trending/gainers-losers",
};

const dex = {
  // Latest listings of dexes
  listings: "/v4/dex/listings/quotes",
  // Metadata of dexes
  metadata: "/v4/dex/listings/info",
  // Returns all networks on CMC
  networks: "/v4/dex/networks/list",
  // Latest listings of pairs
  pairs: "/v4/dex/spot-pairs/latest",
  // Latest quotes
  quotes: "/v4/dex/pairs/quotes/latest",
  // Latest OHLCV quotes
  ohlcv: "/v4/dex/pairs/ohlcv/latest",
  // Historical OHLCV quotes
  ohlcvHistorical: "/v4/dex/pairs/ohlcv/historical",
  // Latest 100 trades
  trades: "/v4/dex/pairs/trade/latest",
};

/**
 * Endpoints that return data around cryptocurrency exchanges such as ordered exchange lists and market pair data.
 */
const cex = {
  // CoinMarketCap exchange ID map
  map: "/v1/exchange/map",
  // Metadata
  metadata: "/v1/exchange/info",
  // Latest listings
  listings: "/v1/exchange/listings/latest",
  // Latest quotes
  quotes: "/v1/exchange/quotes/latest",
  // Historical quotes
  quotesHistorical: "/v1/exchange/quotes/historical",
  // Latest market pairs
  pairs: "/v1/exchange/market-pairs/latest",
  // Exchange Assets
  assets: "/v1/exchange/assets",
};

/**
 * Endpoints that return aggregate market data such as global market cap and BTC dominance.
 */
const metric = {
  // Latest global metrics
  quotes: "/v1/global-metrics/quotes/latest",
  // Historical global metrics
  quotesHistorical: "/v1/global-metrics/quotes/historical",

  // Latest CoinMarketCap 100 Index
  index: "/v3/index/cmc100-latest",
  // Historical CoinMarketCap 100 Index
  indexHistorical: "/v3/index/cmc100-historical",

  // Latest CMC Crypto Fear and Greed Index
  fearAndGreed: "/v3/fear-and-greed/latest",
  // Historical CMC Crypto Fear and Greed Index
  fearAndGreedHistorical: "/v3/fear-and-greed/historical",
};

const community = {
  // Content latest
  news: "/v1/content/latest",
  // Content top posts
  top: "/v1/content/posts/top",
  // Content latest posts
  latest: "/v1/content/posts/latest",
  // Content post comments
  comments: "/v1/content/posts/comments",

  // Community Trending Topics
  trendingTopic: "/v1/community/trending/topic",
  // Community Trending Tokens
  trendingToken: "/v1/community/trending/token",
};

const misc = {
  // CoinMarketCap fiat list
  fiat: "/v1/fiat/map",

  // Price conversion tool
  priceConversion: "/v2/tools/price-conversion",
};

const endpoints = { crypto, dex, cex, metric, community, misc };
export default endpoints;
