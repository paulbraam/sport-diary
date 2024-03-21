<template>
  <ion-button shape="round" color="primary" type="submit" :form="TRAINING_EXERCISE_FORM_ID">
    Создать
  </ion-button>
  <ion-loading :is-open="isLoading" message="Создаем упражнение..."> </ion-loading>
  <ion-toast
    :is-open="!!error"
    :message="error?.message"
    :duration="5000"
    color="danger"
    position="top"
  ></ion-toast>
</template>

<script setup lang="ts">
import { IonButton, modalController } from '@ionic/vue';
import type { ApplyCreateTrainingExerciseModalSubmitButtonEmits, SubmitPayload } from './types';
import {
  CREATE_TRAINING_EXERCISE_MODAL_ID,
  CreateTrainingExerciseModalRoles,
  TRAINING_EXERCISE_FORM_ID,
  useTrainingStore
} from '~/entities/training';
import { RequestStatus } from '~/shared/lib/const';

const emit = defineEmits<ApplyCreateTrainingExerciseModalSubmitButtonEmits>();

const { actions } = useTrainingStore();

const onSubmitted = async (data: SubmitPayload) => {
  const trainingExercise = await actions.createTrainingExercise(data);

  if (trainingExercise) {
    actions.addTrainingExerciseToState(trainingExercise);
    modalController.dismiss(
      null,
      CreateTrainingExerciseModalRoles.APPLY,
      CREATE_TRAINING_EXERCISE_MODAL_ID
    );
  }
};

emit('onSubmitRegister', onSubmitted);

const { requests } = useTrainingStore();

const isLoading = computed(() => requests.createTrainingExercise.status === RequestStatus.PENDING);

const error = computed(() => requests.createTrainingExercise.error as Error);
</script>
