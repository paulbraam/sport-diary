import { defineStore } from 'pinia';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthProvider, INITIAL_AUTH_STATE } from './constants';
import { mapGoogleUserToAccount, mapGoogleUserToUser } from './utils';
import type { AuthState } from './types';
import type { SignInResponse } from '~/server/api/auth/signin/types';
import type { Nullable } from '~/types/common';
import type { RefreshResponse } from '~/server/api/auth/refresh/types';
import { createRequestState } from '~/types/store';
import { RequestStatus } from '~/constants/api';

export const useAuthStore = defineStore('auth', () => {
  const runtimeConfig = useRuntimeConfig();
  // eslint-disable-next-line prefer-destructuring
  const apiUrl = runtimeConfig.public.apiUrl;
  const signInRequest = createRequestState();
  const refreshRequest = createRequestState();
  const signOutRequest = createRequestState();
  const state = reactive<Nullable<AuthState>>({ ...INITIAL_AUTH_STATE });

  const signIn = async (provider: `${AuthProvider}`): Promise<Nullable<SignInResponse>> => {
    signInRequest.status = RequestStatus.PENDING;
    signInRequest.error = null;

    try {
      switch (provider) {
        case AuthProvider.GOOGLE: {
          const googleUser = await GoogleAuth.signIn();

          const response: SignInResponse = await $fetch(`${apiUrl}/api/auth/signin`, {
            method: 'POST',
            body: {
              account: mapGoogleUserToAccount(googleUser),
              user: mapGoogleUserToUser(googleUser)
            }
          });

          Object.assign(state, response);
          signInRequest.status = RequestStatus.SUCCESS;

          const authCookie = useAuthCookie();
          authCookie.value = JSON.stringify({ userId: response.user.id });

          return response;
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

  const refresh = async (provider: `${AuthProvider}`): Promise<Nullable<RefreshResponse>> => {
    refreshRequest.status = RequestStatus.PENDING;
    refreshRequest.error = null;

    try {
      switch (provider) {
        case AuthProvider.GOOGLE: {
          const authorization = await GoogleAuth.refresh();

          const response: RefreshResponse = await $fetch(`${apiUrl}/api/auth/refresh`, {
            method: 'POST',
            body: authorization
          });

          Object.assign(state, response);
          refreshRequest.status = RequestStatus.SUCCESS;

          return response;
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

          const authCookie = useAuthCookie();
          authCookie.value = null;

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

  const initialize = (provider: `${AuthProvider}`) => {
    switch (provider) {
      case AuthProvider.GOOGLE: {
        GoogleAuth.initialize();
        break;
      }
      default:
    }
  };

  return {
    state,
    requests: computed(() => ({
      signIn: signInRequest,
      refresh: refreshRequest,
      signOut: signOutRequest
    })),
    actions: {
      signIn,
      refresh,
      signOut,
      initialize
    }
  };
});
