<template>
  <ion-button expand="block" fill="clear" @click="onAddTrainingSetButtonClick">
    <ion-icon slot="start" :icon="ioniconsAdd"></ion-icon>
    Add set
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton, IonIcon, modalController } from '@ionic/vue';
import type { AddTrainingSetButtonProps } from './types';
import { CreateTrainingSetModal } from '~/widgets/training';

const { trainingId } = defineProps<AddTrainingSetButtonProps>();

const onAddTrainingSetButtonClick = async () => {
  const modal = await modalController.create({
    component: CreateTrainingSetModal,
    componentProps: { trainingId }
  });

  modal.present();

  await modal.onWillDismiss();
};
</script>