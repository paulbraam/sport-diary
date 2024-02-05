import { updateUserExercises } from './queries';
import { UpdateUserExercisesRequest, UpdateUserExercisesResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<UpdateUserExercisesRequest>(
  async (event): Promise<UpdateUserExercisesResponse> => {
    protectRoute(event);

    const { exerciseIds } = await readBody(event);

    return await updateUserExercises(event.context.user.id, exerciseIds);
  }
);
