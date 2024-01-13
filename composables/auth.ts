import { AUTH_COOKIE_NAME } from '~/constants/cookies';

export const useAuthCookie = () =>
  useCookie(AUTH_COOKIE_NAME, {
    sameSite: 'none',
    secure: false
  });
