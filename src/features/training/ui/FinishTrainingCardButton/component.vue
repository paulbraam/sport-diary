<template>
  <ion-button shape="round" expand="block" @click="onFinishTrainingCardButtonClick">
    Завершить
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton } from '@ionic/vue';
import type { FinishTrainingCardButtonProps } from './types';
import { useTrainingStore } from '~/entities/training';

const { trainingId } = defineProps<FinishTrainingCardButtonProps>();

const { actions } = useTrainingStore();

const onFinishTrainingCardButtonClick = async () => {
  const changedTraining = await actions.updateTrainingStatus({
    trainingId,
    status: 'FINISHED'
  });

  if (changedTraining) {
    actions.addTrainingToState(changedTraining);
  }
};
</script>