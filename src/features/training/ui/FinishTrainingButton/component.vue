<template>
  <ion-button expand="block" @click="onFinishTrainingButtonClick">Finish</ion-button>
</template>

<script lang="ts" setup>
import { IonButton } from '@ionic/vue';
import type { FinishTrainingButtonProps } from './types';
import { useTrainingStore } from '~/entities/training';

const { trainingId } = defineProps<FinishTrainingButtonProps>();

const { actions } = useTrainingStore();

const onFinishTrainingButtonClick = async () => {
  const changedTraining = await actions.updateTrainingStatus({
    trainingId,
    status: 'FINISHED'
  });

  if (changedTraining) {
    actions.addTrainingToState(changedTraining);
  }
};
</script>