<template>
  <ion-button shape="round" expand="block" @click="onRestartTrainingCardButtonClick">
    Возобновить
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton } from '@ionic/vue';
import type { RestartTrainingCardButtonProps } from './types';
import { useTrainingStore } from '~/entities/training';

const { trainingId } = defineProps<RestartTrainingCardButtonProps>();

const { actions } = useTrainingStore();

const onRestartTrainingCardButtonClick = async () => {
  const changedTraining = await actions.updateTrainingStatus({
    trainingId,
    status: 'STARTED'
  });

  if (changedTraining) {
    actions.addTrainingToState(changedTraining);
  }
};
</script>