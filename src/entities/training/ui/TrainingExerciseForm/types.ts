export type TrainingExerciseForm = { exerciseId: string };

export type TrainingExerciseFormValidationSchema = TrainingExerciseForm;

export type TrainingExerciseFormEmits = {
  (eventName: 'submit', value: TrainingExerciseForm): void;
};
