import { getTrainingById } from './queries';
import { GetUserTrainingByIdRequest, GetUserTrainingByIdResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<GetUserTrainingByIdRequest>(
  async (event): Promise<GetUserTrainingByIdResponse> => {
    protectRoute(event);

    const trainingId = event.context.params?.id;

    if (!trainingId) {
      throw createError({ statusCode: 404, statusText: 'Training id not found' });
    }

    return await getTrainingById(trainingId);
  }
);
