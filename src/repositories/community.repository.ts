import endpoints from "@core/endpoints";
import { Repository } from "@core/repository";
import { Enumerable } from "@util/decorators.util";
import type { CommunityContentLang, CommunityContentType, CommunityNewsType } from "@option/community.option";
import type { CryptoIdOnly, CryptoIdSingleOnly } from "@option/crypto.option";
import type {
  CommunityCommentsResponse,
  CommunityLatestPostResponse,
  CommunityNewsAsset,
  CommunityNewsLatestResponse,
  CommunityPost,
  CommunityTopPostResponse,
  CommunityTrendingTokenResponse,
  CommunityTrendingTopicsResponse,
} from "@response/community.response";

export class CommunityRepository extends Repository {
  /**
   * Endpoints are used to interact with CoinMarketCap Community posts, trendings, and news APIs
   * @internal @private
   */
  @Enumerable(false)
  private endpoints = endpoints.community;

  /**
   * A paginated list of content pulled from CMC News/Headlines and Alexandria articles.
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *5 minutes.* \
   * **Plan credit use**: *0 credit.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ContentLatest | CoinMarketCap Content Latest}. \
   * {@link CommunityContentLang}. \
   * {@link CommunityContentType}. \
   * {@link CommunityNewsType}. \
   * {@link CommunityNewsLatestResponse}. \
   * {@link CommunityNewsAsset}. \
   * {@link CommunityNews}. \
   * {@link CryptoIdOnly}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get list of latest community news
   * ```typescript
   * import type { CommunityNews, CommunityNewsAsset } from "cmc-api";
   * const news = await cmc.community.news<CommunityNews<CommunityNewsAsset>[]>();
   * for (const content of news) console.log(content);
   * ```
   *
   * @template TAsset - The type of the community news asset. default `CommunityNewsAsset`.
   * @template TResponse - The type of the response. default `CommunityNewsLatestResponse<CommunityNewsAsset>`.
   *
   * @param {number} [limit=100] - The maximum number of news items to fetch.
   * @param {number} [offset=1] - The offset for pagination.
   * @param {CommunityNewsType} [type="all"] - The type of community news to fetch.
   * @param {CommunityContentType} [contentType="all"] - The content type of the news.
   * @param {CryptoIdOnly} [cryptoId] - The crypto ID to filter news by.
   * @param {string | string[]} [category] - The category or categories to filter news by.
   * @param {CommunityContentLang} [lang="en"] - The language of the news content.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the latest community news response.
   */
  public async news<TAsset extends object = CommunityNewsAsset, TResponse = CommunityNewsLatestResponse<TAsset>>(
    limit: number = 100,
    offset: number = 1,
    type: CommunityNewsType = "all",
    contentType: CommunityContentType = "all",
    cryptoId?: CryptoIdOnly,
    category?: string | string[],
    lang: CommunityContentLang = "en",
  ): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.news, {
      ...(cryptoId?.symbol && { symbol: cryptoId.symbol }),
      ...(cryptoId?.slug && { slug: cryptoId.slug }),
      ...(cryptoId?.id && { id: cryptoId.id }),
      limit: limit,
      start: offset,
      news_type: type,
      content_type: contentType,
      category: category,
      language: lang,
    });
  }

  /**
   * The latest crypto-related posts from the CoinMarketCap Community.
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *5 minutes.* \
   * **Plan credit use**: *0 credit.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ContentPostsLatest | CoinMarketCap Content Latest Posts}. \
   * {@link CommunityLatestPostResponse}. \
   * {@link CommunityContentOwner}. \
   * {@link CommunityPostCurrency}. \
   * {@link CommunityPost}. \
   * {@link CryptoIdSingleOnly}. \
   * {@link CommunityContentLang}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get latest posts by crypto id
   * ```typescript
   * const posts = await cmc.community.posts<"1">({ id: 1 });
   * for (const post of posts[1].list) console.log(post);
   * ```
   *
   * @example get latest posts by crypto symbol
   * ```typescript
   * const posts = await cmc.community.posts<"BTC">({ symbol: "BTC" });
   * for (const post of posts.BTC.list) console.log(post);
   * ```
   *
   * @example get latest posts by crypto slug
   * ```typescript
   * const posts = await cmc.community.posts<"bitcoin">({ slug: "bitcoin" });
   * for (const post of posts.bitcoin.list) console.log(post);
   * ```
   *
   * @template TKey - The type of the key used in the response. default `string`.
   * @template TPost - The type of the post object. default `CommunityPost`.
   * @template TResponse - The type of the response object. default `CommunityLatestPostResponse<TKey, TPost>`.
   *
   * @param {CryptoIdSingleOnly} [cryptoId] - The identifier for the cryptocurrency, which can be a symbol, slug, or id.
   * @param {number} [lastScore] - The score of the last post to be used for pagination.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the latest community posts response.
   */
  public async posts<
    TKey extends string = string,
    TPost extends object = CommunityPost,
    TResponse = CommunityLatestPostResponse<TKey, TPost>,
  >(cryptoId?: CryptoIdSingleOnly, lastScore?: number): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.latest, {
      ...(cryptoId?.symbol && { symbol: cryptoId.symbol }),
      ...(cryptoId?.slug && { slug: cryptoId.slug }),
      ...(cryptoId?.id && { id: cryptoId.id }),
      last_score: lastScore,
    });
  }

  /**
   * The top crypto-related posts from the CMC Community.
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *5 minutes.* \
   * **Plan credit use**: *0 credit.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ContentPostsTop | CoinMarketCap Content Top Posts}. \
   * {@link CommunityTopPostResponse}. \
   * {@link CommunityContentOwner}. \
   * {@link CommunityPostCurrency}. \
   * {@link CommunityPostList}. \
   * {@link CommunityPost}. \
   * {@link CryptoIdSingleOnly}. \
   * {@link CommunityContentLang}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get top posts by crypto id
   * ```typescript
   * const posts = await cmc.community.topPosts<"1">({ id: 1 });
   * for (const post of posts[1].list) console.log(post);
   * ```
   *
   * @example get top posts by crypto symbol
   * ```typescript
   * const posts = await cmc.community.topPosts<"BTC">({ symbol: "BTC" });
   * for (const post of posts.BTC.list) console.log(post);
   * ```
   *
   * @example get top posts by crypto slug
   * ```typescript
   * const posts = await cmc.community.topPosts<"bitcoin">({ slug: "bitcoin" });
   * for (const post of posts.bitcoin.list) console.log(post);
   * ```
   *
   * @template TKey - The type of the key used in the response. Defaults to `string`, e.g: `EUR` | `USD`.
   * @template TPost - The type of the post object. Defaults to `CommunityPost`.
   * @template TResponse - The type of the response object. Defaults to `CommunityTopPostResponse<TKey, TPost>`.
   *
   * @param {CryptoIdSingleOnly} [cryptoId] - The identifier for the cryptocurrency. Can be a symbol, slug, or id.
   * @param {number} [lastScore] - The score of the last post to use as a reference for pagination.
   *
   * @returns {Promise<TResponse>} A promise that resolves to the top posts response.
   */
  public async topPosts<
    TKey extends string = string,
    TPost extends object = CommunityPost,
    TResponse = CommunityTopPostResponse<TKey, TPost>,
  >(cryptoId?: CryptoIdSingleOnly, lastScore?: number): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.top, {
      ...(cryptoId?.symbol && { symbol: cryptoId.symbol }),
      ...(cryptoId?.slug && { slug: cryptoId.slug }),
      ...(cryptoId?.id && { id: cryptoId.id }),
      last_score: lastScore,
    });
  }

  /**
   * An comments of the CoinMarketCap Community post.
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *5 minutes.* \
   * **Plan credit use**: *0 credit.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1ContentPostsComments | CoinMarketCap Content Post Comments}. \
   * {@link CommunityCommentsResponse}. \
   * {@link CommunityComment}. \
   * {@link CommunityPost}. \
   * {@link CryptoIdSingleOnly}. \
   * {@link CommunityContentLang}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get comments for a post
   * ```typescript
   * import type { CommunityComment } from "cmc-api";
   * const comments = await cmc.community.comments<CommunityComment[]>(325670123);
   * for (const comment of comments) console.log(comment.text_content);
   * ```
   *
   * @template TResponse - The expected response type. Defaults to `CommunityCommentsResponse`.
   * @param {number} postId - The ID of the post to fetch comments for.
   * @returns {Promise<TResponse>} A promise that resolves to the comments response.
   */
  public async comments<TResponse = CommunityCommentsResponse>(postId: number): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.comments, { post_id: postId });
  }

  /**
   * The latest trending topics from the CoinMarketCap Community.
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *1 minute.* \
   * **Plan credit use**: *0 credit.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CommunityTrendingTopic | CoinMarketCap Community Trending Topics}. \
   * {@link CommunityTrendingTopicsResponse}. \
   * {@link CommunityTrendingTopic}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get the latest trending topics
   * ```typescript
   * import type { CommunityTrendingTopic } from "cmc-api";
   * const trendingTopics = await cmc.community.trendingTopic<CommunityTrendingTopic[]>(5);
   * for (const trendingTopic of trendingTopics) console.log(trendingTopic);
   * ```
   *
   * @template TResponse - The expected response type. Defaults to `CommunityTrendingTopicsResponse`.
   * @param {number} [limit=5] - The maximum number of trending topics to retrieve. Default is `5`.
   * @returns {Promise<TResponse>} A promise that resolves to the trending topics response.
   */
  public async trendingTopic<TResponse = CommunityTrendingTopicsResponse>(limit: number = 5): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.trendingTopic, { limit: limit });
  }

  /**
   * The latest trending tokens from the CoinMarketCap Community.
   *
   * **Available api plans**: `Standard`, `Professional`, `Enterprise`. \
   * **Cache frequency**: *1 minute.* \
   * **Plan credit use**: *0 credit.*
   *
   * @see
   * {@link https://pro.coinmarketcap.com/api/v1#operation/getV1CommunityTrendingToken | CoinMarketCap Community Trending Tokens}. \
   * {@link CommunityTrendingTokenResponse}. \
   * {@link CommunityTrendingToken}.
   *
   * @example import the CoinMarketCapApi class and create a new instance
   * ```typescript
   * import { CoinMarketCapApi } from "cmc-api";
   * const cmc = new CoinMarketCapApi("YOUR_COINMARKETCAP_APIKEY");
   * ```
   *
   * @example get the latest trending tokens
   * ```typescript
   * import type { CommunityTrendingToken } from "cmc-api";
   * const trendingTokens = await cmc.community.trendingToken<CommunityTrendingToken[]>(5);
   * for (const trendingToken of trendingTokens) console.log(trendingToken);
   * ```
   *
   * @template TResponse - The expected response type. Defaults to `CommunityTrendingTokenResponse`.
   * @param {number} [limit=5] - The number of trending tokens to fetch. Defaults to `5`.
   * @returns {Promise<TResponse>} - A promise that resolves to the response containing the trending tokens.
   */
  public async trendingToken<TResponse = CommunityTrendingTokenResponse>(limit: number = 5): Promise<TResponse> {
    return await this.cmc.client.req<TResponse>(this.endpoints.trendingToken, { limit: limit });
  }
}
