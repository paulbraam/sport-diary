import { createTrainingByUserId } from './queries';
import { type CreateUserTrainingResponse, type CreateUserTrainingRequest } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<CreateUserTrainingRequest>(
  protectRoute(async (event): Promise<CreateUserTrainingResponse> => {
    const payload = await readBody(event);

    return createTrainingByUserId(payload, event.context.user.id);
  })
);
