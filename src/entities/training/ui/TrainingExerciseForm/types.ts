export type TrainingExerciseForm = { exerciseId: string };

export interface TrainingExerciseFormEmits {
  (eventName: 'onSubmit', data: TrainingExerciseForm): void;
}
