export const Enumerable = (value: boolean): PropertyDecorator => {
  return <T extends object>(target: T, key: string | symbol): void => {
    Object.defineProperty(target, key, {
      get(): undefined {
        return undefined;
      },
      set(this: T, val: unknown): void {
        Object.defineProperty(this, key, {
          value: val,
          writable: true,
          enumerable: value,
          configurable: true,
        });
      },
      enumerable: false,
      configurable: true,
    });
  };
};
