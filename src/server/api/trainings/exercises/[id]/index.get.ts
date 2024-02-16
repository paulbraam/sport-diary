import { getTrainingExerciseById } from './queries';
import { GetTrainingExerciseResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler(async (event): Promise<GetTrainingExerciseResponse> => {
  protectRoute(event);

  const trainingExerciseId = event.context.params?.id;

  if (!trainingExerciseId) {
    throw createError({ statusCode: 404, statusText: 'Training exercise id not found' });
  }

  return await getTrainingExerciseById(trainingExerciseId);
});
