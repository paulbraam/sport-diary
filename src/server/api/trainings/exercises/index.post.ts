import { createTrainingExercise } from './queries';
import { CreateTrainingExerciseRequest, CreateTrainingExerciseResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler<CreateTrainingExerciseRequest>(
  async (event): Promise<CreateTrainingExerciseResponse> => {
    protectRoute(event);
    const { exerciseId, trainingId } = await readBody(event);

    return createTrainingExercise({
      exerciseId,
      trainingId
    });
  }
);
