import { deleteTrainingSetById } from './queries';
import { DeleteTrainingSetResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler(async (event): Promise<DeleteTrainingSetResponse> => {
  protectRoute(event);

  const trainingSetId = event.context.params?.id;

  if (!trainingSetId) {
    throw createError({ statusCode: 404, statusText: 'Training exercise id not found' });
  }

  return await deleteTrainingSetById(trainingSetId);
});
