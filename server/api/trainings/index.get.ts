import { getTrainingsByUserId } from './queries';
import { getAuthCookie, protectRoute } from '~/server/utils';

export default defineEventHandler((event) => {
  protectRoute(event);

  const { userId } = getAuthCookie(event);

  return getTrainingsByUserId(userId);
});
