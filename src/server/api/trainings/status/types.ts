import { Training, TrainingStatus } from '@prisma/client';
import { ApiRequest } from '~/shared/lib/types';

export type UpdateTrainingStatusRequestBody = { status: TrainingStatus; trainingId: string };

export type UpdateTrainingStatusRequest = ApiRequest<UpdateTrainingStatusRequestBody>;

export type UpdateTrainingStatusResponse = Training;
