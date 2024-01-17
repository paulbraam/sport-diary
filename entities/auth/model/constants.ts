import type { AuthState } from './types';
import type { NullableObjectValues } from '~/shared/lib/types';

export enum AuthProvider {
  GOOGLE = 'google'
}

export const INITIAL_AUTH_STATE: NullableObjectValues<AuthState> = {
  account: null,
  user: null
};

export const AUTH_STORE_NAME = 'auth';
