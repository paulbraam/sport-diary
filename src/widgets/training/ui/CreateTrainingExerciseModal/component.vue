<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">Close</ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <create-training-exercise-submit-button></create-training-exercise-submit-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <training-exercise-form @submit="onSubmit"></training-exercise-form>
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
import type { CreateTrainingExerciseModalProps } from './types';
import { TrainingExerciseForm, useTrainingStore } from '~/entities/training';
import { CreateTrainingExerciseSubmitButton } from '~/features/training';
import type { CreateTrainingExerciseRequestBody } from '~/server/api/trainings/exercises/types';

const { trainingId } = defineProps<CreateTrainingExerciseModalProps>();

const { actions } = useTrainingStore();

const closeModal = () => {
  modalController.dismiss(null, 'close');
};

const onSubmit = async ({ exerciseId }: Pick<CreateTrainingExerciseRequestBody, 'exerciseId'>) => {
  const response = await actions.createTrainingExercise({
    trainingId,
    exerciseId
  });

  if (response) modalController.dismiss(null, 'apply');
};
</script>
