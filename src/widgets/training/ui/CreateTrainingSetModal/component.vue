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
import type { TrainingSetPayload } from '~/server/api/trainings/sets/types';
import { CreateTrainingSetSubmitButton } from '~/features/training';

const { trainingExerciseId } = defineProps<CreateTrainingSetModalProps>();

const { actions } = useTrainingStore();

const closeModal = () => {
  modalController.dismiss(null, 'close');
};

const onSubmit = async (data: TrainingSetPayload) => {
  const response = await actions.createTrainingSet({
    trainingExerciseId,
    data
  });

  if (response) {
    await actions.getTrainingExerciseById(trainingExerciseId);
    await modalController.dismiss(null, 'apply');
  }
};
</script>
