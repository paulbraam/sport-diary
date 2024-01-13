import { jwtDecode } from 'jwt-decode';
import type { User as GoogleUser } from '@codetrix-studio/capacitor-google-auth';
import type { Prisma } from '@prisma/client';
import { AuthProvider } from './constants';
import type { GoogleAuthJwtToken } from './types';

export const mapGoogleUserToAccount = (data: GoogleUser): Prisma.AccountCreateWithoutUserInput => {
  const parsedToken = jwtDecode<GoogleAuthJwtToken>(data.authentication.idToken);

  return {
    type: 'oauth',
    provider: `${AuthProvider.GOOGLE}`,
    providerAccountId: data.id,
    email: data.email,
    refresh_token: data.authentication.refreshToken,
    access_token: data.authentication.accessToken,
    expires_at: parsedToken.exp,
    id_token: data.authentication.idToken
  };
};

export const mapGoogleUserToUser = (data: GoogleUser): Prisma.UserCreateInput => {
  return {
    name: data.name,
    email: data.email,
    image: data.imageUrl
  };
};
