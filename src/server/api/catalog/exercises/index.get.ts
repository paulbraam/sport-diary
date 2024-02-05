import { getCatalogExercises } from './queries';
import { GetCatalogExercisesRequest, GetCatalogExercisesResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<GetCatalogExercisesRequest>(
  async (event): Promise<GetCatalogExercisesResponse> => {
    protectRoute(event);

    const params = getQuery(event);
    return await getCatalogExercises(params);
  }
);
