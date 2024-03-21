<template>
  <ion-item-option color="danger" :expandable="true">
    <ion-icon slot="icon-only" :icon="ioniconsTrash" @click="onDeleteTrainingSetButtonClick">
    </ion-icon>
  </ion-item-option>
</template>

<script setup lang="ts">
import { IonItemOption, alertController } from '@ionic/vue';
import type { DeleteTrainingSetListItemOptionProps } from './types';
import { useTrainingStore } from '~/entities/training';

const { actions } = useTrainingStore();

const props = defineProps<DeleteTrainingSetListItemOptionProps>();

const onDeleteTrainingSetButtonClick = async () => {
  const alert = await alertController.create({
    header: 'Удаление',
    message: 'Вы действительно хотите удалить подход?',
    buttons: [
      'Отмена',
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const deletedSet = await actions.deleteTrainingSetById(props.setId);
          const trainingExerciseId = deletedSet?.trainingExerciseId;

          if (trainingExerciseId) {
            const currentTrainingExercise =
              await actions.getTrainingExerciseById(trainingExerciseId);

            if (currentTrainingExercise) {
              actions.addTrainingExerciseToState(currentTrainingExercise);
            }
          }
        }
      }
    ]
  });

  await alert.present();
};
</script>
