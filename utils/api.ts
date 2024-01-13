import { CapacitorHttp, type HttpOptions } from '@capacitor/core';
import { AuthStorage } from './auth';
import type { ClientApiRequestOptions, ClientApiResponse } from '~/types/api';
import { DEFAULT_REQUEST_HEADERS } from '~/constants/api';

export const request = async <T>(
  path: string,
  options: ClientApiRequestOptions
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
