export type ValidatorMethod<T> = (input: T) => boolean;
export type ValidatorNumberMethod = ValidatorMethod<number>;

export const isGreaterThan =
  (boundary: number): ValidatorNumberMethod =>
  (input: number) =>
    input > boundary;

export const isLessThan =
  (boundary: number): ValidatorNumberMethod =>
  (input: number) =>
    input < boundary;

export const isInteger = (value: string): boolean =>
  value != '' && Number.isInteger(Number(value));
