<template>
  <ion-button shape="round" color="primary" type="submit" :form="TRAINING_SET_FORM_ID">
    Создать
  </ion-button>
  <ion-loading :is-open="isLoading" message="Создаем подход..."> </ion-loading>
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
import type {
  ApplyCreateTrainingSetModalSubmitButtonEmits,
  ApplyCreateTrainingSetModalSubmitButtonProps,
  SubmitEventHandler
} from './types';
import {
  CREATE_TRAINING_SET_MODAL_ID,
  CreateTrainingSetModalRoles,
  TRAINING_SET_FORM_ID,
  useTrainingStore
} from '~/entities/training';
import { RequestStatus } from '~/shared/lib/const';

const { trainingExerciseId } = defineProps<ApplyCreateTrainingSetModalSubmitButtonProps>();
const emit = defineEmits<ApplyCreateTrainingSetModalSubmitButtonEmits>();

const { actions } = useTrainingStore();

const onSubmitted: SubmitEventHandler = async (data) => {
  const trainingSet = await actions.createTrainingSet({
    trainingExerciseId,
    data
  });

  if (trainingSet) {
    const trainingExercise = await actions.getTrainingExerciseById(trainingExerciseId);
    if (trainingExercise) actions.addTrainingExerciseToState(trainingExercise);

    await modalController.dismiss(
      null,
      CreateTrainingSetModalRoles.APPLY,
      CREATE_TRAINING_SET_MODAL_ID
    );
  }
};

emit('onSubmitRegister', onSubmitted);

const { requests } = useTrainingStore();

const isLoading = computed(() => requests.createTrainingSet.status === RequestStatus.PENDING);

const error = computed(() => requests.createTrainingSet.error as Error);
</script>
