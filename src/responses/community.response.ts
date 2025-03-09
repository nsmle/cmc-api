import type { Timestamp } from "@option/common.option";
import type { CommunityContentLang } from "@option/community.option";

/**
 * The related community content asset.
 */
export interface CommunityNewsAsset {
  /**
   * The unique CoinMarketCap ID for this cryptocurrency.
   */
  id: number;

  /**
   * The name of this cryptocurrency.
   */
  name: string;

  /**
   * The ticker symbol for this cryptocurrency.
   */
  symbol: string;

  /**
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;
}

/**
 * The content pulled from CMC News/Headlines and Alexandria articles.
 * @template TAsset - The type of community news asset.
 * @see {@link CommunityNewsAsset}
 */
export interface CommunityNews<TAsset extends object = CommunityNewsAsset> {
  /**
   * The cover image URL of this content.
   */
  cover: string;

  /**
   * The title of this content.
   */
  title: string;

  /**
   * The subtitle of this content.
   */
  subtitle: string;

  /**
   * The name of source this content.
   */
  source_name: string;

  /**
   * The url of source this content.
   */
  source_url: string;

  /**
   * The content/news type.
   */
  type: "news" | "community" | "alexandria";

  /**
   * Assets related to this content.
   */
  assets: TAsset[];

  /**
   * Timestamp (ISO 8601) of the time this was created.
   */
  created_at: Timestamp;

  /**
   * Timestamp (ISO 8601) of the time this was released.
   */
  released_at: Timestamp;
}

/**
 * A response of paginated list of content pulled from CMC News/Headlines and Alexandria articles.
 * @template TAsset - The type of community news asset.
 * @see {@link CommunityNews}
 * @see {@link CommunityNewsAsset}
 */
export type CommunityNewsLatestResponse<TAsset extends object = CommunityNewsAsset> = CommunityNews<TAsset>[];

/**
 * The related community content currency.
 */
export interface CommunityPostCurrency {
  /**
   * The unique CoinMarketCap ID for this cryptocurrency.
   */
  id: number;

  /**
   * The name of this cryptocurrency.
   */
  symbol: string;

  /**
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;
}

/**
 * The community post/comment owner.
 */
export interface CommunityContentOwner {
  /**
   * The nickname of the owner.
   */
  nickname: string;

  /**
   * The avatar URL of the owner.
   */
  avatar_url: string;
}

/**
 * The community post content.
 * @see {@link CommunityContentOwner}
 * @see {@link CommunityPostCurrency}
 * @see {@link CommunityContentLang}
 */
export interface CommunityPost {
  /**
   * The unique identifier of the post.
   */
  post_id: string;

  /**
   * The owner detail of the post/comment.
   */
  owner: CommunityContentOwner;

  /**
   * The post/comment content text.
   */
  text_content: string;

  /**
   * The list of photos in the post/comment.
   */
  photos: string[];

  /**
   * The number of comments the post/comment has.
   */
  comment_count: string;

  /**
   * The number of likes the post/comment has.
   */
  like_count: string;

  /**
   * The timestamp of the post/comment creation.
   */
  post_time: Timestamp;

  /**
   * The list of currencies mentioned in the post.
   */
  currencies: CommunityPostCurrency[];

  /**
   * The language code of the current post/comment.
   */
  language_code: CommunityContentLang;

  /**
   * The comments URL of the current post/comment.
   */
  comments_url: string;
}

/**
 * An object related to pagging of community posts.
 * @template TPost - The type of community post.
 * @see {@link CommunityPost}
 */
export interface CommunityPostList<TPost extends object = CommunityPost> {
  /**
   * The list of community posts.
   */
  list: TPost[];

  /**
   * The score for finding next batch posts.
   */
  last_score: number;
}

/**
 * A response mapping of the latest community posts.
 * @template TKey - The type of the keys in the record. Defaults to `string`, e.g: `EUR` | `USD`.
 * @template TPost - The type of the posts in the record. Defaults to `CommunityPost`.
 * @see {@link CommunityPost}
 * @see {@link CommunityPostList}
 */
export type CommunityLatestPostResponse<TKey extends string = string, TPost extends object = CommunityPost> = Record<
  TKey,
  CommunityPostList<TPost>
>;

/**
 * A response mapping of the top community posts.
 * @template TKey - The type of the keys in the record. Defaults to `string`, e.g: `EUR` | `USD`.
 * @template TPost - The type of the posts in the record. Defaults to `CommunityPost`.
 * @see {@link CommunityPost}
 * @see {@link CommunityPostList}
 */
export type CommunityTopPostResponse<TKey extends string = string, TPost extends object = CommunityPost> = Record<
  TKey,
  CommunityPostList<TPost>
>;

/**
 * An content object of community comment.
 * @see {@link CommunityPost}
 */
export type CommunityComment = Omit<CommunityPost, "currencies">;

/**
 * A response of list of comments for a post.
 * @see {@link CommunityComment}
 */
export type CommunityCommentsResponse = CommunityComment[];

/**
 * The trending topic in the community.
 */
export interface CommunityTrendingTopic {
  /**
   * The community rank of the topic
   */
  rank: number;

  /**
   * The trending topic name
   */
  topic: string;
}

/**
 * A response of list of trending topics in the community.
 * @see {@link CommunityTrendingTopic}
 */
export type CommunityTrendingTopicsResponse = CommunityTrendingTopic[];

/**
 * A content of trending token in the community.
 */
export interface CommunityTrendingToken {
  /**
   * The unique CoinMarketCap ID for this cryptocurrency.
   */
  id: number;

  /**
   * The name of this cryptocurrency.
   */
  name: string;

  /**
   * The ticker symbol for this cryptocurrency.
   */
  symbol: string;

  /**
   * The web URL friendly shorthand version of this cryptocurrency name.
   */
  slug: string;

  /**
   * The cryptocurrency's CoinMarketCap rank by market cap.
   */
  cmc_rank: number;

  /**
   * The community rank of the coin.
   */
  rank: number;
}

/**
 * A response of list of trending tokens in the community.
 * @see {@link CommunityTrendingToken}
 */
export type CommunityTrendingTokenResponse = CommunityTrendingToken[];
