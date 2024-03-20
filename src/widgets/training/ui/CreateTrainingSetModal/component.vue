<template>
  <app-modal>
    <template #startActions>
      <close-create-training-set-modal-button></close-create-training-set-modal-button>
    </template>
    <template #endActions>
      <apply-create-training-set-modal-submit-button
        :training-exercise-id="trainingExerciseId"
        @on-submit-register="onSubmitRegister"
      >
      </apply-create-training-set-modal-submit-button>
    </template>
    <template #default>
      <training-set-form @on-submit="onSubmit"></training-set-form>
    </template>
  </app-modal>
</template>

<script setup lang="ts">
import type { CreateTrainingSetModalProps, SubmitEventHandler } from './types';
import { TrainingSetForm } from '~/entities/training';
import {
  ApplyCreateTrainingSetModalSubmitButton,
  CloseCreateTrainingSetModalButton
} from '~/features/training';
import { AppModal } from '~/shared/ui';

const { trainingExerciseId } = defineProps<CreateTrainingSetModalProps>();

const onSubmitted = ref<SubmitEventHandler>(() => {});

const onSubmitRegister = (submitEventHandler: SubmitEventHandler) => {
  onSubmitted.value = submitEventHandler;
};

const onSubmit: SubmitEventHandler = (data) => {
  onSubmitted.value(data);
};
</script>
