<template>
  <ion-button shape="round" expand="block" fill="clear" @click="onAddTrainingSetButtonClick">
    <ion-icon slot="start" :icon="ioniconsAdd"></ion-icon>
    Добавить подход
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton, IonIcon, modalController } from '@ionic/vue';
import type { AddTrainingSetButtonProps } from './types';
import { CreateTrainingSetModal } from '~/widgets/training';
import { CREATE_TRAINING_SET_MODAL_ID } from '~/entities/training';

const { trainingExerciseId } = defineProps<AddTrainingSetButtonProps>();

const onAddTrainingSetButtonClick = async () => {
  const modal = await modalController.create({
    id: CREATE_TRAINING_SET_MODAL_ID,
    component: CreateTrainingSetModal,
    componentProps: { trainingExerciseId }
  });

  modal.present();

  await modal.onWillDismiss();
};
</script>