import type { Training } from '@prisma/client';

export interface RestartTrainingCardButtonProps {
  trainingId: Training['id'];
}
