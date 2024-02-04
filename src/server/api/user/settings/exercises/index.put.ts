import { updateUserExercises } from './queries';
import { UpdateUserExercisesRequest, UpdateUserExercisesResponse } from './types';

export default defineEventHandler<UpdateUserExercisesRequest>(
  async (event): Promise<UpdateUserExercisesResponse> => {
    const { exerciseIds } = await readBody(event);
    return await updateUserExercises(event.context.user.id, exerciseIds);
  }
);
