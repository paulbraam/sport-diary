<template>
  <ion-item-sliding>
    <ion-item button detail @click="openUserExerciseInfoAlert">
      <ion-label>{{ exercise.name }}</ion-label>
    </ion-item>
    <ion-item-options slot="end" @ion-swipe="onUserExerciseDelete(exercise.id)">
      <ion-item-option color="danger" :expandable="true">
        <ion-icon
          slot="icon-only"
          :icon="ioniconsTrash"
          @click="onUserExerciseDelete(exercise.id)"
        ></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import {
  IonLabel,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  alertController
} from '@ionic/vue';
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

const onUserExerciseDelete = async (exerciseId: string) => {
  const alert = await alertController.create({
    header: 'Do you really want to remove your exercise?',
    message: 'This action is potentially distructive',
    buttons: [
      'Cancel',
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
