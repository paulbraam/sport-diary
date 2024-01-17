import { RequestStatus } from '~/constants/api';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;

  const isLoginPage = to.path.includes('login');

  if (isLoginPage) return;

  const { actions, requests, state } = useAuthStore();

  const isRefreshRequestFetched = requests.refresh.status !== RequestStatus.IDLE;

  const { user } = isRefreshRequestFetched ? state : await actions.refresh('google');

  if (!user) {
    return navigateTo('/login');
  }
});
