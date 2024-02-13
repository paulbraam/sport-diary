import { createTrainingSet } from './queries';
import { CreateTrainingSetRequest, CreateTrainingSetResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<CreateTrainingSetRequest>(
  async (event): Promise<CreateTrainingSetResponse> => {
    protectRoute(event);
    const payload = await readBody(event);

    return createTrainingSet(payload);
  }
);
