# CoinMarketCap NodeJS Api wrapper

The **cmc-api** is an generic api wrapper for [CoinMarketCap](https://coinmarketcap.com).
Supports endpoints cryptocurrency, exchanges (CEX), decentralized exchange (DEX), global metrics, community content and trends, tools and others.

> [!IMPORTANT]  
> This library is based on the [Official RestFul Json Api of CoinMarketCap](https://pro.coinmarketcap.com/api/v1).
> Response data may change at any time, currently the sandbox and production responses may differ.
> If you are using [TypeScript](https://www.typescriptlang.org/), consider using your own [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) type implementation in case there are any differences in response.
>
> **CoinMarketCap Note**:
> _Making HTTP requests on the client side with Javascript is currently prohibited through CORS configuration. This is to protect your [API Key](https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide) which should not be visible to users of your application so your API Key is not stolen. Secure your API Key by routing calls through your own backend service._

## Installation

#### Installing with [npm](https://www.npmjs.org/):
```shell
npm install cmc-api
```

#### Installing with [Yarn](https://yarnpkg.com/):
```shell
yarn add cmc-api
```
#### Installing with [pnpm](https://pnpm.io/):
```shell
pnpm add cmc-api
```


## Usage
### Importing & Instantiating

#### Importing CoinMarketCapApi
###### ES6/TypeScript/Webpack:
```typescript
import CoinMarketCapApi from 'cmc-api';
// or
import { CoinMarketCapApi } from 'cmc-api';

```
###### Node.js:
```typescript
const CoinMarketCapApi = require('cmc-api');
// or 
const { CoinMarketCapApi } = require('cmc-api');
```

#### Create an instance
###### Using Sandbox
```typescript
import CoinMarketCapApi from 'cmc-api';
const cmc = CoinMarketCapApi.sandbox();
```

###### Using production CMC ApiKey
```typescript
import CoinMarketCapApi from 'cmc-api';
const CMC_APIKEY = 'YOUR_COINMARKETCAP_APIKEY'; // process.env.COINMARKETCAP_APIKEY
const cmc = new CoinMarketCapApi(CMC_APIKEY);
```


### Cryptocurrency

#### CoinMarketCap ID map
```typescript
const crypto = await cmc.crypto.list('active', 'id', 10, 1, ['BTC', 'ETH']);
const btc = crypto.find((crypto): boolean => crypto.symbol === 'BTC');
const eth = crypto.find((crypto): boolean => crypto.symbol === 'ETH');
```

#### Metadata
###### get cryptocurrency metadata by symbol
```typescript
const crypto = await cmc.crypto.metadata<'BTC' | 'ETH'>({ symbol: ['BTC', 'ETH'] });
console.log({ btc: crypto.BTC.at(0), eth: crypto.ETH.at(1) });
```
###### get cryptocurrency metadata by id
```typescript
const crypto = await cmc.crypto.metadata<'1' | '1027'>({ id: [1, 1027] });
console.log({ btc: crypto[1], eth: crypto[1027] });
```
###### get cryptocurrency metadata by slug
```typescript
const crypto = await cmc.crypto.metadata<'1' | '1027'>({ slug: ['bitcoin', 'ethereum'] });
console.log({ btc: crypto[1], eth: crypto[1027] });
```
###### get cryptocurrency metadata by contract address
```typescript
const crypto = await cmc.crypto.metadata<'1027'>({ contract: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' });
console.log(crypto[1027]); // Ethereum
```

#### Latest Listings
###### get cryptocurrency latest listings
```typescript
const crypto = await cmc.crypto.listing<'USD' | 'EUR'>(10, 1, 'all', 'market_cap', 'desc', 'all', undefined, ['USD', 'EUR']);
console.log(crypto.at(0), crypto.at(0).quote.USD, crypto.at(0).quote.EUR);
```

#### New Listings
###### get cryptocurrency new listings and convert to BTC and ETH
```typescript
const crypto = await cmc.crypto.listingNew<'BTC' | 'ETH'>(10, 1, 'desc', ['BTC', 'ETH']);
console.log(crypto, crypto.at(0).quote.BTC, crypto.at(0).quote.ETH);
```

#### Historical Listings
###### get cryptocurrency historical listings
```typescript
const date = new Date()
const crypto = await cmc.crypto.listingHistory<'BTC' | 'ETH' | 'USD'>(date, 10, 1, 'cmc_rank', 'desc', 'all', ['BTC', 'ETH', 'USD']);
console.log(crypto, crypto.at(0).quote.BTC, crypto.at(0).quote.ETH,  crypto.at(0).quote.USD);
```

#### Latest Quotes
###### get cryptocurrency latest quotes by slug coin/token
```typescript
const quotes = await cmc.crypto.quotes<'bitcoin' | 'ethereum', 'USD' | 'EUR'>({ slug: ['bitcoin', 'ethereum'] }, ['USD', 'EUR']);
console.log({ btc: quotes.bitcoin, eth: quotes.ethereum, btcUsd: quotes.bitcoin.quote.USD, ethEur: quotes.ethereum.quote.EUR });
```

#### Historical Quotes
###### get btc and eth historical quotes in range '2024-12-01' - '2025-01-01'
```typescript
const start = new Date('2024-12-01T00:00:00Z');
const end = new Date('2025-01-01T00:00:00Z');
const quotesHistory = await cmc.crypto.quotesHistory<'1' | '1027', 'USD' | 'EUR'>({ id: [1, 1027] }, start, end);
const btc = quotesHistory['1'];
const eth = quotesHistory['1027'];
console.log({ btcQuotes: btc.quotes, ethQuotes: eth.quotes });
console.log({ btcQuoteFirst: btc.quotes?.at(0)?.quote, ethQuoteFirst: eth.quotes?.at(0)?.quote });
```

#### Latest Market Pairs
###### get ethereum market pairs
```typescript
const ethereum = await cmc.crypto.marketPairs<'USD' | 'BTC'>({ slug: 'ethereum' }, { symbol: ['USD', 'BTC'] });
console.log({ ethMarketPairs: ethereum.market_pairs });
```

#### Latest OHLCV 
###### get latest btc and eth ohlcv and convert to usd and eur
```typescript
const ohlcv = await cmc.crypto.ohlcv<'1' | '1027', 'USD' | 'EUR'>({ id: [1, 1027] }, ['USD', 'EUR']);
const btcOhlcv = ohlcv['1'];
const ethOhlcv = ohlcv['1027'];

console.log({ btcOhlcv, ethOhlcv });
console.log({ btcOhlcvUsd: btcOhlcv.quote.USD, ethOhlcvEur: ethOhlcv.quote.EUR });
```

#### Historical OHLCV 
###### get ohclv history of btc and eth in range date '2024-12-01' - '2025-01-01'
```typescript
const start = new Date('2024-12-01T00:00:00Z');
const end = new Date('2025-01-01T00:00:00Z');

const ohlcv = await cmc.crypto.ohlcvHistory<'1' | '1027', 'USD'>({ id: [1, 1027] }, start, end, 'daily');
const btcOhlcv = ohlcv['1'];
const ethOhlcv = ohlcv['1027'];

console.log({ btcOhlcv, ethOhlcv });
console.log({ btcOhlcvHistory: btcOhlcv.quotes, ethOhlcvHistory: ethOhlcv.quotes });
```

#### Price Performance Stats
###### get performance of btc and eth in 24 hours and convert to the price into eur and usd
```typescript
const performance = await cmc.crypto.performance<'bitcoin' | 'ethereum', 'EUR' | 'USD'>({ slug: ['bitcoin', 'ethereum'] }, '24h', ['EUR', 'USD']);
console.log({ btcPerformance: performance.bitcoin, ethPerformance: performance.ethereum });
console.log({ btcPerformanceQuote: performance.bitcoin.quote.USD, ethPerformanceQuote: performance.ethereum.quote.EUR });
```

#### Categories
###### get 10 categories on first pagination page
```typescript
import type { CryptoCategoryResponse } from 'cmc-api';

type Category = Pick<CryptoCategoryResponse, 'title'>;
const categories = await cmc.crypto.categories<Category[]>(10, 1);
for (const category of categories) console.log(category.title);
```

#### Category
###### get zkSync category and log the market cap and the USD quote for ethereum
```typescript
const categoryId = '644620a2b124ea0434395dd1';
const zkSyncCategory = await cmc.crypto.category<'USD' | 'EUR'>(categoryId, 10, 1, ['USD', 'EUR']);
console.log(zkSyncCategory.market_cap);

const eth = zkSyncCategory.coins.filter((coin): boolean => coin.slug === 'ethereum')?.at(0);
console.log(eth.quote.USD);
```

#### Airdrops
###### get all upcoming airdrops and log the project name
```typescript
import type { CryptoAirdropsResponse } from 'cmc-api';

type Airdrops = CryptoAirdropsResponse;
const airdrops = await cmc.crypto.airdrops<Airdrops>();
for (const airdrop of airdrops) console.log(airdrop.project_name);
```

#### Airdrop
###### get a specific airdrop information by cmc airdrop id
```typescript
const airdropId = 'bqdxotizdao';
const airdrop = await cmc.crypto.airdrop(airdropId);
console.log(airdrop);
console.log(airdrop.coin);
```

#### Trending Latest
###### get latest trending cryptocurrencies for the last 24 hours 
```typescript
import type { CryptoTrendingResponse } from 'cmc-api';

type QuoteKey = 'USD' | 'EUR';
type Trending = CryptoTrendingResponse<QuoteKey>;
const trendings = await cmc.crypto.trending<QuoteKey, Trending[]>('24h', 10, 1, ['EUR', 'USD']);

for (const trending of trendings) {
   console.log(trending.name, trending.symbol, trending.slug);
   console.log(trending.quote.EUR, trending.quote.USD);
}
```

#### Trending Most Visited
###### get most visited cryptocurrencies for the last 24 hours
```typescript
import type { CryptoTrendingResponse } from 'cmc-api';

type QuoteKey = 'USD' | 'EUR';
type Trending = CryptoTrendingResponse<QuoteKey>;
const trendings = await cmc.crypto.mostVisited<QuoteKey, Trending[]>('24h', 10, 1, ['EUR', 'USD']);

for (const trending of trendings) {
   console.log(trending.name, trending.symbol, trending.slug);
   console.log(trending.quote.EUR, trending.quote.USD);
}
```

#### Trending Gainers & Losers
###### get the top 10 gainers and losers for the last 24 hours and log the name, symbol, and quotes for EUR and USD
```typescript
import type { CryptoTrendingResponse } from 'cmc-api';

type QuoteKey = 'USD' | 'EUR';
type Trending = CryptoTrendingResponse<QuoteKey>;
const trendings = await cmc.crypto.gainersLosers<QuoteKey, Trending[]>('24h', 10, 1, ['EUR', 'USD']);

for (const trending of trendings) {
   console.log(trending.name, trending.symbol, trending.slug);
   console.log(trending.quote.EUR, trending.quote.USD);
}
```


### Exchanges _(CEX)_

#### ID Map
###### get a list of all active exchanges
```typescript
import type { CexIdMapResponses } from "cmc-api";
const exchanges = await cmc.cex.list<CexIdMapResponses>();
for (const exchange of exchanges) {
   console.log(exchange.id, exchange.name, exchange.is_active);
}
```
###### get binance exchange
```typescript
import type { CexIdMapResponse } from "cmc-api";
const exchanges = await cmc.cex.list<CexIdMapResponse<"binance">>("active", { cexSlug: "binance" });
console.log(exchanges.binance);
```

#### Metadata
###### get exchange metadata by ID
```typescript
const metadata = await cmc.cex.metadata<"3673">({ id: 3673 });
console.log(metadata["3673"]);
```
###### get multiple exchange metadata by slug
```typescript
const metadata = await cmc.cex.metadata<"binance" | "okx">({ slug: ["binance", "okx"] });
console.log(metadata.binance);
console.log(metadata.okx);
```

#### Assets
###### get exchange assets by ID
```typescript
const assets = await cmc.cex.assets<"3673">(3673);
for (const asset of assets["3673"]) {
  console.log(asset.balance, asset.wallet_address);
}
```

#### Listings
###### get the 10 latest exchange listings with and convert to EUR and USD
```typescript
const listings = await cmc.cex.listing<"EUR" | "USD">(10, 1, "all", "all", "exchange_score", "desc", ["EUR", "USD"]);
for (const listing of listings) {
  console.log(listing.id, listing.name, listing.quote.EUR.volume_24h, listing.quote.USD.volume_24h);
}
```

#### Market Pairs
###### get binance market pairs by ID
```typescript
const marketPairs = await cmc.cex.marketPairs<"3673">({ id: 3673 });
console.log(marketPairs["3673"]);
```
###### get binance market pairs by slug
```typescript
const marketPairs = await cmc.cex.marketPairs<"binance">({ slug: "binance" });
console.log(marketPairs.binance);
```

#### Latest Quotes
###### get latest binance quotes by id for BTC and ETH
```typescript
const quotes = await cmc.cex.quotes<"3673", "BTC" | "ETH">({ id: 3673 }, ["BTC", "ETH"]);
console.log(quotes["3673"].quote.BTC.volume_24h, quotes["3673"].quote.ETH.volume_24h);
```
###### get latest binance quotes by slug for BTC and ETH
```typescript
const quotes = await cmc.cex.quotes<"binance", "BTC" | "ETH">({ slug: "binance" }, ["BTC", "ETH"]);
console.log(quotes.binance.quote.BTC.volume_24h, quotes.binance.quote.ETH.volume_24h);
```

#### Historical Quotes
###### get binance historical quotes by exchange slug in interval 4h and convert to BTC and ETH
```typescript
const start = new Date("2024-12-01T00:00:00Z");
const end = new Date("2025-01-01T00:00:00Z");
const quotesHistorical = await cmc.cex.quotesHistory<"binance", "BTC" | "ETH">({ slug: "binance" }, start, end, 10, "4h", ["BTC", "ETH"]);

for (const binanceQuote of quotesHistorical.binance.quotes) {
  console.log(
    binanceQuote.timestamp,
    binanceQuote.num_market_pairs,
    binanceQuote.quote.BTC.volume_24h,
    binanceQuote.quote.ETH.volume_24h,
  );
}
```

### Decentralized Exchange _(DEX)_
**(_soon_)**

### Global Metrics
**(_soon_)**

### Community Content and Trends
**(_soon_)**

### Tools and Others
**(_soon_)**


## Changelog
See [Releases](https://github.com/nsmle/cmc-api/releases) for more information what has changed recently.

## Contributing
Contributions of any kind are welcome! See [here](https://github.com/nsmle/cmc-api/blob/main/.github/CONTRIBUTING.md)

## License
Licensed under the terms of the [MIT license](https://github.com/nsmle/cmc-api/?tab=MIT-1-ov-file).
