import { getTrainingsByUserId } from './queries';
import { type GetUserTrainingsResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler((event): Promise<GetUserTrainingsResponse> => {
  protectRoute(event);
  return getTrainingsByUserId(event.context.user.id);
});
