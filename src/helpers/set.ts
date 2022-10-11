import { merge } from './merge';

export type Indexed<T = any> = {
  [key in string]: T;
};

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const result = path.split('.').reduceRight<Indexed>(
    (accumulator, key) => ({
      [key]: accumulator,
    }),
    value as any,
  );
  return merge(object as Indexed, result);
}
