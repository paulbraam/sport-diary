import { createTrainingByUserId } from './queries';
import {
  type CreateUserTrainingResponse,
  type CreateUserTrainingRequest
} from './types';
import { getAuthCookie, protectRoute } from '~/server/utils';

export default defineEventHandler<CreateUserTrainingRequest>(
  async (event): Promise<CreateUserTrainingResponse> => {
    protectRoute(event);

    const { userId } = getAuthCookie(event);

    const payload = await readBody(event);

    return createTrainingByUserId(payload, userId);
  }
);
