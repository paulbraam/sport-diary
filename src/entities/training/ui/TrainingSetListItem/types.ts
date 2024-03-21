import type { TrainingSet } from '@prisma/client';

export interface TrainingSetListItemProps {
  trainingSet: TrainingSet;
  swipable?: boolean;
}
