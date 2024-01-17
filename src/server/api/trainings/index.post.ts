import { createTrainingByUserId } from './queries';
import { type CreateUserTrainingResponse, type CreateUserTrainingRequest } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<CreateUserTrainingRequest>(
  async (event): Promise<CreateUserTrainingResponse> => {
    protectRoute(event);
    const payload = await readBody(event);

    return createTrainingByUserId(payload, event.context.user.id);
  }
);
