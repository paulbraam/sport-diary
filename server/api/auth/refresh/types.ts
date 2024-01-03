import { type Account, type User } from '@prisma/client';
import { type ApiRequest } from '~/types/api';

export interface RefreshRequestBody {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
}

export type RefreshRequest = ApiRequest<RefreshRequestBody>;

export interface RefreshResponse {
  account: Account;
  user: User;
}
