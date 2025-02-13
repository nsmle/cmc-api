export const isNumeric = (value: unknown): boolean => {
  if (Array.isArray(value)) return value.every((val): boolean => Number.isInteger(val));
  return Number.isInteger(value);
};
