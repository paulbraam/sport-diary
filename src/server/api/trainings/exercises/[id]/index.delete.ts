import { deleteTrainingExerciseById } from './queries';
import { DeleteTrainingExerciseResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler(async (event): Promise<DeleteTrainingExerciseResponse> => {
  protectRoute(event);

  const trainingExerciseId = event.context.params?.id;

  if (!trainingExerciseId) {
    throw createError({ statusCode: 404, statusText: 'Training exercise id not found' });
  }

  return await deleteTrainingExerciseById(trainingExerciseId);
});
