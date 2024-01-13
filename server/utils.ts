import { jwtDecode } from 'jwt-decode';
import { User } from '@prisma/client';
import { EventHandler, type RequestEvent } from './types';
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

export const protectRoute = (eventHandler: EventHandler): EventHandler => {
  return function (...args: Parameters<EventHandler>) {
    const [event] = args;

    if (!event.context.user) {
      throw createError({
        statusCode: 401,
        statusText: 'Unauthorized'
      });
    }

    return eventHandler(...args);
  };
};
