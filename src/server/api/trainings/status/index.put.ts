import { updateTrainingStatus } from './query';
import { UpdateTrainingStatusRequest, UpdateTrainingStatusResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<UpdateTrainingStatusRequest>(
  async (event): Promise<UpdateTrainingStatusResponse> => {
    protectRoute(event);

    const { trainingId, status } = await readBody(event);

    return await updateTrainingStatus(trainingId, status);
  }
);
