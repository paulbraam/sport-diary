import { EventHandler, type ParsedAuthCookie, type RequestEvent } from './types';
import { AUTH_COOKIE_NAME } from '~/constants/cookies';

export const getAuthCookie = (event: RequestEvent) => {
  const authCookie = getCookie(event, AUTH_COOKIE_NAME);
  const parsedAuthCookie: ParsedAuthCookie | null = authCookie ? JSON.parse(authCookie) : null;

  return parsedAuthCookie;
};

export const getAuthContext = (event: RequestEvent): ParsedAuthCookie => {
  const { auth } = event.context;

  if (!auth) {
    throw createError({
      statusCode: 401,
      statusText: 'Unauthorized'
    });
  }

  return auth;
};

export const protectRoute = (eventHandler: EventHandler): EventHandler => {
  return function (...args: Parameters<EventHandler>) {
    const [event] = args;
    const { auth } = event.context;

    console.log({
      protected: event.context
    });

    if (!auth) {
      throw createError({
        statusCode: 401,
        statusText: 'Unauthorized'
      });
    }

    return eventHandler(...args);
  };
};
