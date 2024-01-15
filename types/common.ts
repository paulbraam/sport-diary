export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

export type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];

export type PickRequiredKeys<T> = Pick<T, RequiredKeys<T>>;

export type PickOptionalKeys<T> = Pick<T, OptionalKeys<T>>;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type PickWithOptional<T, K extends keyof T> = Pick<T, Extract<RequiredKeys<T>, K>> &
  Partial<Pick<T, Extract<OptionalKeys<T>, K>>>;
