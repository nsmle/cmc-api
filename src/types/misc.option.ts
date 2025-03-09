/**
 * Fiat short options
 */
export type MiscFiatSort = "id" | "name";

/**
 * A base currency to a specific quote currency.
 */
export type MiscPriceBase = { id: number; symbol?: never } | { id?: never; symbol: string };

/**
 * A destination for converting a base currency to a specific quote currency.
 */
export type MiscPriceConvert = number | string | number[] | string[];
