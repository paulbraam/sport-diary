import { getTrainingsByUserId } from './queries';
import { type GetUserTrainingsResponse } from './types';
import { getAuthContext, protectRoute } from '~/server/utils';

export default defineEventHandler(
  protectRoute((event): Promise<GetUserTrainingsResponse> => {
    const { userId } = getAuthContext(event);

    return getTrainingsByUserId(userId);
  })
);
