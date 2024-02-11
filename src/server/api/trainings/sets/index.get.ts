import { getTrainingSetsByTrainingId } from './queries';
import { GetTrainingSetsRequest, GetTrainingSetsResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<GetTrainingSetsRequest>(
  async (event): Promise<GetTrainingSetsResponse> => {
    protectRoute(event);

    const { trainingId } = getQuery(event);

    if (!trainingId) {
      throw createError({ statusCode: 404, statusText: 'Training id not found' });
    }

    return await getTrainingSetsByTrainingId(trainingId);
  }
);
