import { type Account, type User, type Prisma } from '@prisma/client';
import { type ApiRequest } from '~/shared/lib/types';

export interface SignInRequestBody {
  user: Prisma.UserCreateInput;
  account: Prisma.AccountCreateWithoutUserInput;
}

export type SignInRequest = ApiRequest<SignInRequestBody>;

export interface SignInResponse {
  account: Account;
  user: User;
}

export type CreateOrRegisterUserAndAccountParams = SignInRequestBody;

export interface CreateOrRegisterUserAndAccountReturnType {
  account: Account;
  user: User;
}
