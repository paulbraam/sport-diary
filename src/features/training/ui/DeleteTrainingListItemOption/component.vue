<template>
  <ion-item-option color="danger" :expandable="true">
    <ion-icon
      slot="icon-only"
      :icon="ioniconsTrash"
      @click="onDeleteTrainingButtonClick"
    ></ion-icon>
  </ion-item-option>
</template>

<script setup lang="ts">
import { IonItemOption, IonIcon, alertController } from '@ionic/vue';
import type { DeleteTrainingListItemOptionProps } from './types';
import { useTrainingStore } from '~/entities/training';

const props = defineProps<DeleteTrainingListItemOptionProps>();

const { actions } = useTrainingStore();

const onDeleteTrainingButtonClick = async () => {
  const alert = await alertController.create({
    header: 'Удаление',
    message: 'Вы действительно хотите удалить тренировку?',
    buttons: [
      'Отмена',
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const deletedTraining = await actions.deleteTrainingById(props.trainingId);

          if (deletedTraining) {
            actions.removeTrainingFromState(deletedTraining.id);
          }
        }
      }
    ]
  });

  await alert.present();
};
</script>
