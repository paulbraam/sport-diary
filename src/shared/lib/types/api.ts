import type { HttpOptions, HttpResponse } from '@capacitor/core';

type ApiRequestWithOrWithoutBody<B> = B extends object ? Record<'body', B> : unknown;

type ApiRequestWithOrWithoutQuery<Q> = Q extends object ? Record<'query', Q> : unknown;

export type ApiRequest<B = void, Q = void> = ApiRequestWithOrWithoutBody<B> &
  ApiRequestWithOrWithoutQuery<Q>;

export type ClientApiResponse<T> = Omit<HttpResponse, 'data'> & {
  data: T;
};

export type ClientApiRequestOptions<T = void> = Omit<HttpOptions, 'url' | 'data'> & {
  data?: T;
};
