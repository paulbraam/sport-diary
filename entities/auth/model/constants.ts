import type { AuthState } from './types';
import type { Nullable } from '~/shared/lib/types';

export enum AuthProvider {
  GOOGLE = 'google'
}

export const INITIAL_AUTH_STATE: Nullable<AuthState> = {
  account: null,
  user: null
};

export const AUTH_STORE_NAME = 'auth';
