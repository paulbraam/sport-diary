import { createTrainingByUserId } from './queries';
import { type CreateUserTrainingResponse, type CreateUserTrainingRequest } from './types';
import { getAuthContext } from '~/server/utils';

export default defineEventHandler<CreateUserTrainingRequest>(
  async (event): Promise<CreateUserTrainingResponse> => {
    const { userId } = getAuthContext(event);

    const payload = await readBody(event);

    return createTrainingByUserId(payload, userId);
  }
);
