import { createTrainingSet } from './queries';
import { CreateTrainingSetRequest, CreateTrainingSetResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<CreateTrainingSetRequest>(
  async (event): Promise<CreateTrainingSetResponse> => {
    protectRoute(event);
    const { exerciseId, trainingId } = await readBody(event);

    return createTrainingSet({
      exerciseId,
      trainingId
    });
  }
);
