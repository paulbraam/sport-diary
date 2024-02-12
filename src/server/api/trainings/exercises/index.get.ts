import { getTrainingExercisesByTrainingId } from './queries';
import { GetTrainingExercisesRequest, GetTrainingExercisesResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<GetTrainingExercisesRequest>(
  async (event): Promise<GetTrainingExercisesResponse> => {
    protectRoute(event);

    const { trainingId } = getQuery(event);

    if (!trainingId) {
      throw createError({ statusCode: 404, statusText: 'Training id not found' });
    }

    return await getTrainingExercisesByTrainingId(trainingId);
  }
);
