/* eslint-disable @typescript-eslint/ban-types */

type Methods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type MethodsAndProperties<T> = {
  [P in keyof T]: T[P];
};

type ValueObjectValue<T> = {
  [P in keyof T]: T[P] extends { value: unknown }
    ? Pick<T[P], 'value'>['value']
    : T[P] extends Array<{ value: unknown }>
      ? Pick<T[P][number], 'value'>['value'][]
      : T[P] extends Array<Object>
        ? Primitives<T[P][number]>[]
        : T[P] extends Object
          ? Primitives<T[P]>
          : T[P];
};

type SnakeToCamelCase<T extends string> =
  T extends `${infer FirstPart}_${infer FirstLetter}${infer LastPart}`
    ? `${FirstPart}${Uppercase<FirstLetter>}${SnakeToCamelCase<LastPart>}`
    : T;

type CamelToSnakeCase<
  T extends string,
  P extends string = '',
> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
    ? CamelToSnakeCase<
        R,
        `${P}${C0 extends Lowercase<C0> ? '' : '_'}${Lowercase<C0>}`
      >
    : P;

export type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

export type Primitives<T> = ValueObjectValue<Properties<T>>;

export type SnakeToCamel<T> =
  T extends Array<infer U>
    ? Array<SnakeToCamel<U>>
    : T extends object
      ? {
          [P in keyof T as SnakeToCamelCase<string & P>]: T[P] extends Array<
            infer U
          >
            ? Array<SnakeToCamel<U>>
            : T[P] extends object
              ? SnakeToCamel<T[P]>
              : T[P];
        }
      : T;

export type CamelToSnake<T> =
  T extends Array<infer U>
    ? Array<CamelToSnake<U>>
    : T extends object
      ? {
          [P in keyof T as CamelToSnakeCase<string & P>]: T[P] extends Array<
            infer U
          >
            ? Array<CamelToSnake<U>>
            : CamelToSnake<T[P]>;
        }
      : T;

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export type ReadonlyRecursive<T> = {
  readonly [P in keyof T]: ReadonlyRecursive<T[P]>;
};

export type Partial<T, K = keyof T> = MethodsAndProperties<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;

export type DateToISOString<T> = T extends Date
  ? string
  : T extends Function
    ? T
    : T extends Array<infer U>
      ? DateToISOString<U>[]
      : T extends object
        ? { [K in keyof T as Uncapitalize<string & K>]: DateToISOString<T[K]> }
        : T;
