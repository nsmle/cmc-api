import type { Pair, Timestamp } from "@option/common.type";

export interface Urls {
  website: string[];
  twitter: string[];
  message_board: [string];
  chat: string[];
  facebook: string[];
  explorer: string[];
  reddit: string[];
  technical_doc: string[];
  source_code: string[];
  announcement: string[];
}

export interface ContractAddressCoin {
  id: string;
  name: string;
  symbol: string;
  slug: string;
}

export interface ContractAddressPlatform {
  name: string;
  coin: ContractAddressCoin;
}

export interface ContractAddress {
  contract_address: string;
  platform: ContractAddressPlatform;
}

export type Platform = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
} | null;

export type Quote = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  volume_24h_reported: number;
  volume_7d: number;
  volume_7d_reported: number;
  volume_30d: number;
  volume_30d_reported: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: number | null;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  last_updated: Timestamp;
  price_quote: number;
};

export type QuoteMap<TKey extends string = string, TValue = Quote> = Pair<TKey, TValue>;

export interface Tags {
  slug: string;
  name: string;
  category: string;
}
