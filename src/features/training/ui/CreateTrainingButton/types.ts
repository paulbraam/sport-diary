import type { Training } from '@prisma/client';
import type { ITrainingForm } from '~/entities/training';

export interface CreateTrainingButtonProps {
  values: ITrainingForm | null;
}

export type CreateTrainingButtonEmits = { (eventName: 'success', value: Training): void };
