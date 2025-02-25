/**
 * Various endpoints for accessing CoinMarketCap cryptocurrency data.
 *
 * @property {string} map - Endpoint for CoinMarketCap cryptocurrency ID map.
 * @property {string} metadata - Endpoint for cryptocurrency metadata.
 * @property {string} listings - Endpoint for latest cryptocurrency listings.
 * @property {string} listingsNew - Endpoint for new cryptocurrency listings.
 * @property {string} listingsHistorical - Endpoint for historical cryptocurrency listings.
 * @property {string} quotes - Endpoint for latest cryptocurrency quotes.
 * @property {string} quotesHistorical - Endpoint for historical cryptocurrency quotes.
 * @property {string} quotesHistoricalV3 - Endpoint for historical cryptocurrency quotes (version 3).
 * @property {string} marketPairs - Endpoint for latest cryptocurrency market pairs.
 * @property {string} ohlcv - Endpoint for latest OHLCV (Open, High, Low, Close, Volume) data.
 * @property {string} ohlcvHistorical - Endpoint for historical OHLCV data.
 * @property {string} performance - Endpoint for latest cryptocurrency price performance statistics.
 * @property {string} categories - Endpoint for cryptocurrency categories.
 * @property {string} category - Endpoint for a specific cryptocurrency category.
 * @property {string} airdrops - Endpoint for cryptocurrency airdrops.
 * @property {string} airdrop - Endpoint for a specific cryptocurrency airdrop.
 * @property {string} trending - Endpoint for latest trending cryptocurrencies.
 * @property {string} mostVisited - Endpoint for most visited trending cryptocurrencies.
 * @property {string} gainersLosers - Endpoint for trending gainers and losers in cryptocurrencies.
 */
const crypto = {
  map: "/v1/cryptocurrency/map",
  metadata: "/v2/cryptocurrency/info",
  listings: "/v1/cryptocurrency/listings/latest",
  listingsNew: "/v1/cryptocurrency/listings/new",
  listingsHistorical: "/v1/cryptocurrency/listings/historical",
  quotes: "/v2/cryptocurrency/quotes/latest",
  quotesHistorical: "/v2/cryptocurrency/quotes/historical",
  quotesHistoricalV3: "/v3/cryptocurrency/quotes/historical",
  marketPairs: "/v2/cryptocurrency/market-pairs/latest",
  ohlcv: "/v2/cryptocurrency/ohlcv/latest",
  ohlcvHistorical: "/v2/cryptocurrency/ohlcv/historical",
  performance: "/v2/cryptocurrency/price-performance-stats/latest",
  categories: "/v1/cryptocurrency/categories",
  category: "/v1/cryptocurrency/category",
  airdrops: "/v1/cryptocurrency/airdrops",
  airdrop: "/v1/cryptocurrency/airdrop",
  trending: "/v1/cryptocurrency/trending/latest",
  mostVisited: "/v1/cryptocurrency/trending/most-visited",
  gainersLosers: "/v1/cryptocurrency/trending/gainers-losers",
};

/**
 * Various endpoints for decentralized exchange (DEX) data.
 *
 * @property {string} map - Endpoint for retrieving all networks on CoinMarketCap (CMC).
 * @property {string} listings - Endpoint for the latest listings of DEXes.
 * @property {string} metadata - Endpoint for metadata of DEXes.
 * @property {string} pairs - Endpoint for the latest listings of trading pairs.
 * @property {string} quotes - Endpoint for the latest quotes of trading pairs.
 * @property {string} ohlcv - Endpoint for the latest OHLCV (Open, High, Low, Close, Volume) quotes.
 * @property {string} ohlcvHistorical - Endpoint for historical OHLCV quotes.
 * @property {string} trades - Endpoint for the latest 100 trades.
 */
const dex = {
  map: "/v4/dex/networks/list",
  listings: "/v4/dex/listings/quotes",
  metadata: "/v4/dex/listings/info",
  pairs: "/v4/dex/spot-pairs/latest",
  quotes: "/v4/dex/pairs/quotes/latest",
  ohlcv: "/v4/dex/pairs/ohlcv/latest",
  ohlcvHistorical: "/v4/dex/pairs/ohlcv/historical",
  trades: "/v4/dex/pairs/trade/latest",
};

/**
 * Endpoints for various CoinMarketCap exchange-related API calls.
 *
 * @property {string} map - Endpoint for retrieving the CoinMarketCap exchange ID map.
 * @property {string} metadata - Endpoint for retrieving metadata about exchanges.
 * @property {string} listings - Endpoint for retrieving the latest exchange listings.
 * @property {string} quotes - Endpoint for retrieving the latest exchange quotes.
 * @property {string} quotesHistorical - Endpoint for retrieving historical exchange quotes.
 * @property {string} pairs - Endpoint for retrieving the latest market pairs on exchanges.
 * @property {string} assets - Endpoint for retrieving exchange assets.
 */
const cex = {
  map: "/v1/exchange/map",
  metadata: "/v1/exchange/info",
  listings: "/v1/exchange/listings/latest",
  quotes: "/v1/exchange/quotes/latest",
  quotesHistorical: "/v1/exchange/quotes/historical",
  pairs: "/v1/exchange/market-pairs/latest",
  assets: "/v1/exchange/assets",
};

/**
 * Endpoints for various global metrics and indices.
 *
 * @property {string} quotes - Endpoint for the latest global metrics quotes.
 * @property {string} quotesHistorical - Endpoint for historical global metrics quotes.
 * @property {string} index - Endpoint for the latest CoinMarketCap 100 Index.
 * @property {string} indexHistorical - Endpoint for historical CoinMarketCap 100 Index.
 * @property {string} fearAndGreed - Endpoint for the latest CMC Crypto Fear and Greed Index.
 * @property {string} fearAndGreedHistorical - Endpoint for historical CMC Crypto Fear and Greed Index.
 */
const metric = {
  quotes: "/v1/global-metrics/quotes/latest",
  quotesHistorical: "/v1/global-metrics/quotes/historical",
  index: "/v3/index/cmc100-latest",
  indexHistorical: "/v3/index/cmc100-historical",
  fearAndGreed: "/v3/fear-and-greed/latest",
  fearAndGreedHistorical: "/v3/fear-and-greed/historical",
};

/**
 * Endpoints related to community content and trends.
 *
 * @property {string} news - Endpoint for fetching the latest content.
 * @property {string} top - Endpoint for fetching the top posts.
 * @property {string} latest - Endpoint for fetching the latest posts.
 * @property {string} comments - Endpoint for fetching comments on posts.
 * @property {string} trendingTopic - Endpoint for fetching trending community topics.
 * @property {string} trendingToken - Endpoint for fetching trending community tokens.
 */
const community = {
  news: "/v1/content/latest",
  top: "/v1/content/posts/top",
  latest: "/v1/content/posts/latest",
  comments: "/v1/content/posts/comments",
  trendingTopic: "/v1/community/trending/topic",
  trendingToken: "/v1/community/trending/token",
};

/**
 * Various endpoints for tools/other CoinMarketCap API.
 *
 * @property {string} fiat - Endpoint for retrieving the list of fiat currencies.
 * @property {string} priceConversion - Endpoint for the price conversion tool.
 * @property {string} usageStats - Endpoint for the usage statistics of the API key.
 */
const misc = {
  fiat: "/v1/fiat/map",
  priceConversion: "/v2/tools/price-conversion",
  usageStats: "/v1/key/info",
};

/**
 * Various of endpoint the CoinMarketCap API.
 *
 * @property {object} crypto - Endpoints related to cryptocurrency data.
 * @property {object} dex - Endpoints related to decentralized exchanges.
 * @property {object} cex - Endpoints related to centralized exchanges.
 * @property {object} metric - Endpoints related to various metrics and statistics.
 * @property {object} community - Endpoints related to community data and interactions.
 * @property {object} misc - Miscellaneous endpoints that do not fit into other categories.
 */
const endpoints = { crypto, dex, cex, metric, community, misc };
export default endpoints;
