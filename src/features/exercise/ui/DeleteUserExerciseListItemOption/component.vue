<template>
  <ion-item-option color="danger" :expandable="true">
    <ion-icon slot="icon-only" :icon="ioniconsTrash" @click="onExerciseDeleteButtonClick">
    </ion-icon>
  </ion-item-option>
</template>

<script setup lang="ts">
import { IonItemOption, alertController } from '@ionic/vue';
import type { DeleteUserExerciseListItemOptionProps } from './types';
import { useUserSettingsStore } from '~/entities/user';

const props = defineProps<DeleteUserExerciseListItemOptionProps>();

const { actions } = useUserSettingsStore();

const onExerciseDeleteButtonClick = async () => {
  const alert = await alertController.create({
    header: 'Удаление',
    message: 'Вы действительно хотите удалить упражнение?',
    buttons: [
      'Отмена',
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          actions.deleteUserExercise(props.exerciseId);
        }
      }
    ]
  });

  await alert.present();
};
</script>
