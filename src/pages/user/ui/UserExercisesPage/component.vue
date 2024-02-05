<template>
  <ion-page id="training-list">
    <ion-content color="light">
      <ion-list v-if="userExercises.length" inset>
        <user-exercise-list-item
          v-for="exercise in userExercises"
          :key="exercise.id"
          :exercise="exercise"
        >
        </user-exercise-list-item>
      </ion-list>
      <div v-else class="flex h-full">
        <div class="my-auto w-full flex justify-center">No exercises so far</div>
      </div>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="openUserExercisesModal">
          <ion-icon :icon="ioniconsAdd"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonList, IonPage, IonContent, modalController } from '@ionic/vue';
import {
  UserExerciseListItem,
  useUserExerciseFiltersStore
} from '~/entities/exercise';
import { useUserSettingsStore } from '~/entities/user';
import { UserExercisesModal } from '~/widgets/exercise';

const { actions, state } = useUserSettingsStore();
const { reset: resetUserExerciseFilters } = useUserExerciseFiltersStore();

const userExercises = computed(() => state.settings?.exercises ?? []);

const openUserExercisesModal = async () => {
  const modal = await modalController.create({
    component: UserExercisesModal
  });

  modal.present();

  await modal.onWillDismiss();

  resetUserExerciseFilters();
};

onBeforeMount(() => {
  actions.getUserSettings();
});
</script>
