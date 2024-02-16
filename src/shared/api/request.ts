import { CapacitorHttp, type HttpOptions } from '@capacitor/core';
import { AuthStorage } from '~/shared/lib/storage';
import type { ClientApiRequestOptions, ClientApiResponse } from '~/shared/lib/types';
import { DEFAULT_REQUEST_HEADERS } from '~/shared/lib/const';

export const request = async <T, B = void>(
  path: string,
  options: ClientApiRequestOptions<B>
): Promise<ClientApiResponse<T>> => {
  const runtimeConfig = useRuntimeConfig();

  const apiUrl = runtimeConfig.public.apiUrl;

  const authorization = await AuthStorage.getAuth();

  const idToken = authorization?.idToken;

  const headers: HttpOptions['headers'] = { ...DEFAULT_REQUEST_HEADERS };

  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`;
  }

  return CapacitorHttp.request({
    headers,
    ...options,
    url: apiUrl + path
  });
};
