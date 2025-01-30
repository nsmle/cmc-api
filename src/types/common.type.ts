/**
 * Represents a key-value pair where the key is of type `TKey` and the value is of type `TVal`.
 *
 * @template {string} TKey - The type of the key. Defaults to `string`.
 * @template {string} TVal - The type of the value. Defaults to `string`.
 */
export type Pair<TKey extends string = string, TVal = string> = {
  [key in TKey]: TVal;
};
