

<template>
  <ion-button color="primary" type="submit" :form="TRAINING_SET_FORM_ID">Create</ion-button>
  <ion-loading :is-open="isLoading" message="Creating your training exercise..."> </ion-loading>
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
import { TRAINING_SET_FORM_ID, useTrainingStore } from '~/entities/training';
import { RequestStatus } from '~/shared/lib/const';

const { requests } = useTrainingStore();

const isLoading = computed(() => requests.createTrainingSet.status === RequestStatus.PENDING);

const error = computed(() => requests.createTrainingSet.error as Error);
</script>
