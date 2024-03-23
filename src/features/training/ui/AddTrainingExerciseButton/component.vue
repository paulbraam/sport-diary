<template>
  <ion-button shape="round" expand="block" fill="clear" @click="onAddTrainingExerciseButtonClick">
    <app-icon slot="start" name="Plus" class="m-2"></app-icon>
    Добавить упражнение
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton, modalController } from '@ionic/vue';
import type { AddTrainingExerciseButtonProps } from './types';
import { CreateTrainingExerciseModal } from '~/widgets/training';
import { CREATE_TRAINING_EXERCISE_MODAL_ID } from '~/entities/training';
import { AppIcon } from '~/shared/ui';

const { trainingId } = defineProps<AddTrainingExerciseButtonProps>();

const onAddTrainingExerciseButtonClick = async () => {
  const modal = await modalController.create({
    id: CREATE_TRAINING_EXERCISE_MODAL_ID,
    component: CreateTrainingExerciseModal,
    componentProps: { trainingId }
  });

  modal.present();

  await modal.onWillDismiss();
};
</script>