import { useAuthStore } from '~/entities/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  // client-only
  if (process.server) return;

  const { actions, state } = useAuthStore();

  // initialize gapi
  if (!('gapi' in window)) {
    await actions.initialize('google');
  }

  // get current user
  const { user } = state.user ? state : await actions.refresh('google');

  // handle login page logic
  const isLoginPage = to.path.includes('login');

  if (isLoginPage) {
    if (user) {
      return navigateTo('/');
    }
    return;
  }

  // handle unauthorized logic
  if (!user) {
    return navigateTo('/login');
  }
});
