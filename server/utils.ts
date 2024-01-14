import { jwtDecode } from 'jwt-decode';
import { User } from '@prisma/client';
import { type RequestEvent } from './types';
import { getUserByProviderAccountId } from './queries';

export const getUser = async (event: RequestEvent): Promise<User | null> => {
  const authToken = getHeader(event, 'Authorization');

  if (!authToken) {
    return null;
  }

  const [, idToken] = authToken.split(' ');

  const { sub: providerAccountId } = jwtDecode(idToken);

  if (!providerAccountId) {
    return null;
  }

  return await getUserByProviderAccountId(providerAccountId);
};

export const protectRoute = (event: RequestEvent) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusText: 'Unauthorized'
    });
  }
};
