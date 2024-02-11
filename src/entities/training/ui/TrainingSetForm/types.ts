export type TrainingSetForm = { exerciseId: string };

export type TrainingSetFormValidationSchema = TrainingSetForm;

export type TrainingSetFormEmits = {
  (eventName: 'submit', value: TrainingSetForm): void;
};
