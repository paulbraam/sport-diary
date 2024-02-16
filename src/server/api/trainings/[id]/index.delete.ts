import { deleteTrainingById } from './queries';
import { DeleteUserTrainingByIdResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler(async (event): Promise<DeleteUserTrainingByIdResponse> => {
  protectRoute(event);

  const trainingId = event.context.params?.id;

  if (!trainingId) {
    throw createError({ statusCode: 404, statusText: 'Training id not found' });
  }

  return await deleteTrainingById(trainingId);
});
