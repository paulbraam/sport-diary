<template>
  <ion-button
    fill="clear"
    color="danger"
    class="delete-button"
    @click="onDeleteTrainingExerciseCardButtonClick"
  >
    <app-icon name="Trash2" class="m-1"></app-icon>
  </ion-button>
</template>

<script lang="ts" setup>
import { IonButton, alertController } from '@ionic/vue';
import type { DeleteTrainingExerciseCardButtonProps } from './types';
import { useTrainingStore } from '~/entities/training';
import { AppIcon } from '~/shared/ui';

const { actions } = useTrainingStore();

const { trainingExerciseId } = defineProps<DeleteTrainingExerciseCardButtonProps>();

const onDeleteTrainingExerciseCardButtonClick = async () => {
  const alert = await alertController.create({
    header: 'Удаление',
    message: 'Вы действительно хотите удалить упражнение?',
    buttons: [
      'Отмена',
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const deletedTrainingExercise =
            await actions.deleteTrainingExerciseById(trainingExerciseId);

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