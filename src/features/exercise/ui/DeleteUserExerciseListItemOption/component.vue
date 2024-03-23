<template>
  <ion-item-option color="danger" :expandable="true">
    <app-icon
      slot="icon-only"
      name="Trash2"
      class="m-1"
      @click="onExerciseDeleteButtonClick"
    ></app-icon>
  </ion-item-option>
</template>

<script setup lang="ts">
import { IonItemOption, alertController } from '@ionic/vue';
import type { DeleteUserExerciseListItemOptionProps } from './types';
import { useUserSettingsStore } from '~/entities/user';
import { AppIcon } from '~/shared/ui';

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
