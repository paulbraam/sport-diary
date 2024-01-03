import type { Nullable } from '~/types/common';
import type { AuthState } from './types';

export enum AuthProvider {
  GOOGLE = 'google'
}

export const INITIAL_AUTH_STATE: Nullable<AuthState> = {
  account: null,
  user: null
};
