import { getTrainingsByUserId } from './queries';
import { type GetUserTrainingsResponse } from './types';
import { getAuthCookie, protectRoute } from '~/server/utils';

export default defineEventHandler((event): Promise<GetUserTrainingsResponse> => {
  protectRoute(event);

  const { userId } = getAuthCookie(event);

  return getTrainingsByUserId(userId);
});
