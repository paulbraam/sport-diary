import { getTrainingById } from './queries';
import { GetUserTrainingByIdRequest, GetUserTrainingByIdResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<GetUserTrainingByIdRequest>(
  async (event): Promise<GetUserTrainingByIdResponse> => {
    protectRoute(event);

    const { id } = getQuery(event);

    return await getTrainingById(id);
  }
);
