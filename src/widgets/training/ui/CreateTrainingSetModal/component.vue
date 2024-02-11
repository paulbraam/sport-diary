<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">Close</ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <create-training-set-submit-button></create-training-set-submit-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <training-set-form @submit="onSubmit"></training-set-form>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController
} from '@ionic/vue';
import type { CreateTrainingSetModalProps } from './types';
import { TrainingSetForm, useTrainingStore } from '~/entities/training';
import { CreateTrainingSetSubmitButton } from '~/features/training';
import type { CreateTrainingSetRequestBody } from '~/server/api/trainings/[id]/sets/types';

const { trainingId } = defineProps<CreateTrainingSetModalProps>();

const { actions } = useTrainingStore();

const closeModal = () => {
  modalController.dismiss(null, 'close');
};

const onSubmit = async ({ exerciseId }: CreateTrainingSetRequestBody) => {
  const response = await actions.createTrainingSet({
    trainingId,
    exerciseId
  });

  if (response) modalController.dismiss(null, 'apply');
};
</script>
