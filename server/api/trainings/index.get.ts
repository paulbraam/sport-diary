import { getTrainingsByUserId } from './queries';
import { type GetUserTrainingsResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler(
  protectRoute((event): Promise<GetUserTrainingsResponse> => {
    return getTrainingsByUserId(event.context.user.id);
  })
);
