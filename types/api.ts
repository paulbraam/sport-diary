type ApiRequestWithOrWithoutBody<B> = B extends object ? Record<'body', B> : NonNullable<unknown>;

type ApiRequestWithOrWithoutQuery<Q> = Q extends object ? Record<'query', Q> : NonNullable<unknown>;

export type ApiRequest<B = void, Q = void> = ApiRequestWithOrWithoutBody<B> &
  ApiRequestWithOrWithoutQuery<Q>;
