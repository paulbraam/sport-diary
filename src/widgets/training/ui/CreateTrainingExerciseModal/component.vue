<template>
  <app-modal>
    <template #startActions>
      <close-create-training-exercise-modal-button></close-create-training-exercise-modal-button>
    </template>
    <template #endActions>
      <create-training-exercise-modal-submit-button @on-submit-register="onSubmitRegister">
      </create-training-exercise-modal-submit-button>
    </template>
    <template #default>
      <training-exercise-form @on-submit="onSubmit"></training-exercise-form>
    </template>
  </app-modal>
</template>

<script setup lang="ts">
import type { SubmitEventHandler, CreateTrainingExerciseModalProps } from './types';
import { TrainingExerciseForm } from '~/entities/training';
import {
  CloseCreateTrainingExerciseModalButton,
  CreateTrainingExerciseModalSubmitButton
} from '~/features/training';
import type { CreateTrainingExerciseRequestBody } from '~/server/api/trainings/exercises/types';
import { AppModal } from '~/shared/ui';

const { trainingId } = defineProps<CreateTrainingExerciseModalProps>();

const onSubmitted = ref<SubmitEventHandler>(() => {});

const onSubmit = (values: Pick<CreateTrainingExerciseRequestBody, 'exerciseId'>) => {
  onSubmitted.value({ ...values, trainingId });
};

const onSubmitRegister = (submitEventHandler: SubmitEventHandler) => {
  onSubmitted.value = submitEventHandler;
};
</script>
