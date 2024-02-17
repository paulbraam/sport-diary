

<template>
  <ion-button shape="round" color="primary" type="submit" :form="TRAINING_EXERCISE_FORM_ID"
    >Создать</ion-button
  >
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
import { IonButton } from '@ionic/vue';
import { TRAINING_EXERCISE_FORM_ID, useTrainingStore } from '~/entities/training';
import { RequestStatus } from '~/shared/lib/const';

const { requests } = useTrainingStore();

const isLoading = computed(() => requests.createTrainingExercise.status === RequestStatus.PENDING);

const error = computed(() => requests.createTrainingExercise.error as Error);
</script>
