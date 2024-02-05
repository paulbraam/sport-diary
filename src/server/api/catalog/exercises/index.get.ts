import { getCatalogExercises } from './queries';
import { GetCatalogExercisesRequest, GetCatalogExercisesResponse } from './types';

export default defineEventHandler<GetCatalogExercisesRequest>(
  async (event): Promise<GetCatalogExercisesResponse> => {
    const params = getQuery(event);
    return await getCatalogExercises(params);
  }
);
