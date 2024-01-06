import { type ParsedAuthCookie, type RequestEvent } from './types';
import { AUTH_COOKIE_NAME } from '~/constants/cookies';

export const getAuthCookie = (event: RequestEvent) => {
  const authCookie = getCookie(event, AUTH_COOKIE_NAME);
  const parsedAuthCookie: ParsedAuthCookie | null = authCookie ? JSON.parse(authCookie) : null;

  if (!parsedAuthCookie) {
    throw createError({
      statusCode: 401,
      statusText: 'Auth cookie not found'
    });
  }

  return parsedAuthCookie;
};

export const protectRoute = (event: RequestEvent) => {
  const authCookie = getAuthCookie(event);

  if (!authCookie) {
    throw createError({
      statusCode: 401,
      statusText: 'Unauthorized'
    });
  }
};
