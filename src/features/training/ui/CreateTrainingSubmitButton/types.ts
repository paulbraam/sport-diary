import type { CreateUserTrainingRequestBody } from '~/server/api/trainings/types';

type SubmitEventHandler = (data: CreateUserTrainingRequestBody) => void;

export interface CreateTrainingSubmitButtonEmits {
  (eventName: 'onSubmitRegister', submitEventHandler: SubmitEventHandler): void;
}
