import { defineStore } from 'pinia';
import { GoogleAuth, type Authentication } from '@codetrix-studio/capacitor-google-auth';
import { mapGoogleUserToAccount, mapGoogleUserToUser } from '../lib';
import { AUTH_STORE_NAME, AuthProvider, INITIAL_AUTH_STATE } from './constants';
import type { AuthState } from './types';
import type { SignInRequestBody, SignInResponse } from '~/server/api/auth/signin/types';
import type { NullableObjectValues } from '~/shared/lib/types/common';
import type { RefreshResponse } from '~/server/api/auth/refresh/types';
import { RequestStatus } from '~/shared/lib/const';
import { createRequestState } from '~/shared/lib/utils';
import { request } from '~/shared/api';
import { AuthStorage } from '~/shared/lib/storage';

export const useAuthStore = defineStore(AUTH_STORE_NAME, () => {
  const signInRequest = createRequestState();
  const refreshRequest = createRequestState();
  const signOutRequest = createRequestState();
  const initializeRequest = createRequestState();
  const state = reactive<NullableObjectValues<AuthState>>({ ...INITIAL_AUTH_STATE });

  const signIn = async (
    provider: `${AuthProvider}`
  ): Promise<NullableObjectValues<SignInResponse>> => {
    signInRequest.status = RequestStatus.PENDING;
    signInRequest.error = null;

    try {
      switch (provider) {
        case AuthProvider.GOOGLE: {
          const googleUser = await GoogleAuth.signIn();

          const { data } = await request<SignInResponse, SignInRequestBody>('/api/auth/signin', {
            method: 'POST',
            data: {
              account: mapGoogleUserToAccount(googleUser),
              user: mapGoogleUserToUser(googleUser)
            }
          });

          await AuthStorage.setAuth(googleUser.authentication);

          Object.assign(state, data);
          signInRequest.status = RequestStatus.SUCCESS;

          return data;
        }
        default:
          throw new Error('No auth provider provided');
      }
    } catch (error) {
      signInRequest.error = error;
      signInRequest.status = RequestStatus.FAILED;

      return {
        user: null,
        account: null
      };
    }
  };

  const refresh = async (
    provider: `${AuthProvider}`
  ): Promise<NullableObjectValues<RefreshResponse>> => {
    refreshRequest.status = RequestStatus.PENDING;
    refreshRequest.error = null;

    try {
      switch (provider) {
        case AuthProvider.GOOGLE: {
          const authentication = await GoogleAuth.refresh();

          const { data } = await request<RefreshResponse, Authentication>('/api/auth/refresh', {
            method: 'POST',
            data: authentication
          });

          await AuthStorage.setAuth(authentication);

          Object.assign(state, data);
          refreshRequest.status = RequestStatus.SUCCESS;

          return data;
        }
        default:
          throw new Error('No auth provider provided');
      }
    } catch (error) {
      refreshRequest.error = error;
      refreshRequest.status = RequestStatus.FAILED;

      return {
        user: null,
        account: null
      };
    }
  };

  const signOut = async (provider: `${AuthProvider}`) => {
    signOutRequest.status = RequestStatus.PENDING;
    signOutRequest.error = null;

    try {
      switch (provider) {
        case AuthProvider.GOOGLE: {
          await GoogleAuth.signOut();

          await AuthStorage.clearAuth();

          Object.assign(state, { ...INITIAL_AUTH_STATE });
          signOutRequest.status = RequestStatus.SUCCESS;
          break;
        }
        default:
          throw new Error('No auth provider provided');
      }
    } catch (error) {
      signOutRequest.error = error;
      signOutRequest.status = RequestStatus.FAILED;
    }
  };

  const initialize = async (provider: `${AuthProvider}`) => {
    initializeRequest.status = RequestStatus.PENDING;
    initializeRequest.error = null;

    try {
      switch (provider) {
        case AuthProvider.GOOGLE: {
          await GoogleAuth.initialize();
          initializeRequest.status = RequestStatus.SUCCESS;
          break;
        }
        default:
      }
    } catch (error) {
      initializeRequest.error = error;
      initializeRequest.status = RequestStatus.FAILED;
    }
  };

  return {
    state,
    requests: computed(() => ({
      signIn: signInRequest,
      refresh: refreshRequest,
      signOut: signOutRequest,
      initialize: initializeRequest
    })),
    actions: {
      signIn,
      refresh,
      signOut,
      initialize
    }
  };
});
