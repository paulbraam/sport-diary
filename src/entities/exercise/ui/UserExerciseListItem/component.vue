<template>
  <ion-item-sliding>
    <ion-item button detail @click="openUserExerciseInfoAlert">
      <ion-label>{{ exercise.name }}</ion-label>
    </ion-item>
    <ion-item-options slot="end" @ion-swipe="onUserExerciseListItemSwipe(exercise.id)">
      <slot name="options"></slot>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import { IonLabel, IonItem, IonItemSliding, IonItemOptions, alertController } from '@ionic/vue';
import type { UserExerciseListItemProps } from './types';
import { useUserSettingsStore } from '~/entities/user';

const props = defineProps<UserExerciseListItemProps>();

const exercise = toRef(props, 'exercise');

const { actions } = useUserSettingsStore();

const openUserExerciseInfoAlert = async () => {
  const alert = await alertController.create({
    header: exercise.value.name,
    message: exercise.value.instructions.join(' '),
    buttons: ['OK']
  });

  await alert.present();
};

const onUserExerciseListItemSwipe = async (exerciseId: string) => {
  const alert = await alertController.create({
    header: 'Удаление',
    message: 'Вы действительно хотите удалить упражнение?',
    buttons: [
      'Отмена',
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          actions.deleteUserExercise(exerciseId);
        }
      }
    ]
  });

  await alert.present();
};
</script>
