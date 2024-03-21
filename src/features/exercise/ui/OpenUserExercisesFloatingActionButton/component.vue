<template>
  <ion-fab-button @click="onOpenUserExercisesButtonClick">
    <ion-icon :icon="ioniconsAdd"></ion-icon>
  </ion-fab-button>
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';
import { USER_EXERCISES_MODAL_ID, useUserExerciseFiltersStore } from '~/entities/exercise';
import { UserExercisesModal } from '~/widgets/exercise';

const { reset: resetUserExerciseFilters } = useUserExerciseFiltersStore();

const onOpenUserExercisesButtonClick = async () => {
  const modal = await modalController.create({
    id: USER_EXERCISES_MODAL_ID,
    component: UserExercisesModal
  });

  modal.present();

  await modal.onWillDismiss();

  resetUserExerciseFilters();
};
</script>
