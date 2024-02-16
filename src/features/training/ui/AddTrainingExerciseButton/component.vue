<template>
  <ion-button expand="block" fill="clear" @click="onAddTrainingExerciseButtonClick">
    <ion-icon slot="start" :icon="ioniconsAdd"></ion-icon>
    Add an exercise
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton, IonIcon, modalController } from '@ionic/vue';
import type { AddTrainingExerciseButtonProps } from './types';
import { CreateTrainingExerciseModal } from '~/widgets/training';

const { trainingId } = defineProps<AddTrainingExerciseButtonProps>();

const onAddTrainingExerciseButtonClick = async () => {
  const modal = await modalController.create({
    component: CreateTrainingExerciseModal,
    componentProps: { trainingId }
  });

  modal.present();

  await modal.onWillDismiss();
};
</script>