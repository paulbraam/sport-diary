<template>
  <ion-button shape="round" expand="block" @click="onRestartTrainingButtonClick">
    Возобновить
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton } from '@ionic/vue';
import type { FinishTrainingButtonProps } from './types';
import { useTrainingStore } from '~/entities/training';

const { trainingId } = defineProps<FinishTrainingButtonProps>();

const { actions } = useTrainingStore();

const onRestartTrainingButtonClick = async () => {
  const changedTraining = await actions.updateTrainingStatus({
    trainingId,
    status: 'STARTED'
  });

  if (changedTraining) {
    actions.addTrainingToState(changedTraining);
  }
};
</script>