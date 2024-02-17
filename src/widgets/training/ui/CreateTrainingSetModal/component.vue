<template>
  <app-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button shape="round" @click="closeModal">Закрыть</ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <create-training-set-submit-button></create-training-set-submit-button>
      </ion-buttons>
    </ion-toolbar>
  </app-header>
  <ion-content class="ion-padding">
    <training-set-form @submit="onSubmit"></training-set-form>
  </ion-content>
</template>

<script setup lang="ts">
import { IonContent, IonToolbar, IonButtons, IonButton, modalController } from '@ionic/vue';
import type { CreateTrainingSetModalProps } from './types';
import { TrainingSetForm, useTrainingStore } from '~/entities/training';
import type { TrainingSetPayload } from '~/server/api/trainings/sets/types';
import { CreateTrainingSetSubmitButton } from '~/features/training';
import { AppHeader } from '~/shared/ui';

const { trainingExerciseId } = defineProps<CreateTrainingSetModalProps>();

const { actions } = useTrainingStore();

const closeModal = () => {
  modalController.dismiss(null, 'close');
};

const onSubmit = async (data: TrainingSetPayload) => {
  const trainingSet = await actions.createTrainingSet({
    trainingExerciseId,
    data
  });

  if (trainingSet) {
    const trainingExercise = await actions.getTrainingExerciseById(trainingExerciseId);
    if (trainingExercise) actions.addTrainingExerciseToState(trainingExercise);

    await modalController.dismiss(null, 'apply');
  }
};
</script>
