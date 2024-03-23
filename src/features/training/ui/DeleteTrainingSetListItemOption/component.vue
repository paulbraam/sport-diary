<template>
  <ion-item-option color="danger" :expandable="true">
    <app-icon
      slot="icon-only"
      name="Trash2"
      class="m-1"
      @click="onDeleteTrainingSetButtonClick"
    ></app-icon>
  </ion-item-option>
</template>

<script setup lang="ts">
import { IonItemOption, alertController } from '@ionic/vue';
import type { DeleteTrainingSetListItemOptionProps } from './types';
import { useTrainingStore } from '~/entities/training';
import { AppIcon } from '~/shared/ui';

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
