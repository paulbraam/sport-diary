<template>
  <ion-button
    fill="clear"
    color="danger"
    class="delete-button"
    @click="onTrainingExerciseDeleteButtonClick(trainingExerciseId)"
  >
    <ion-icon slot="icon-only" color="danger" :icon="ioniconsTrash"></ion-icon>
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton, IonIcon, alertController } from '@ionic/vue';
import type { DeleteTrainingExerciseButtonProps } from './types';
import { useTrainingStore } from '~/entities/training';

const { actions } = useTrainingStore();

const { trainingExerciseId } = defineProps<DeleteTrainingExerciseButtonProps>();

const onTrainingExerciseDeleteButtonClick = async (exerciseId: string) => {
  const alert = await alertController.create({
    header: 'Do you really want to remove your exercise?',
    message: 'This action is potentially distructive',
    buttons: [
      'Cancel',
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const deletedTrainingExercise = await actions.deleteTrainingExerciseById(exerciseId);

          if (deletedTrainingExercise) {
            actions.removeTrainingExerciseFromState(deletedTrainingExercise.id);
          }
        }
      }
    ]
  });

  await alert.present();
};
</script>

<style scoped>
.delete-button {
  --padding-bottom: 0;
  --padding-end: 0;
  --padding-start: 0;
  --padding-top: 0;
}
</style>