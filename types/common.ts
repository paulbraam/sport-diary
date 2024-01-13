export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

export type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];

export type PickRequiredKeys<T> = Pick<T, RequiredKeys<T>>;

export type PickOptionalKeys<T> = Pick<T, OptionalKeys<T>>;
