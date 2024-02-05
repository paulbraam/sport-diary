<template>
  <ion-page id="training-list">
    <ion-content color="light">
      <ion-list v-if="userExercises.length" inset>
        <ion-item-sliding v-for="exercise in userExercises" :key="exercise.id">
          <ion-item button detail>
            <ion-label>{{ exercise.name }}</ion-label>
          </ion-item>
          <ion-item-options slot="end" @ion-swipe="actions.deleteUserExercise(exercise.id)">
            <ion-item-option color="danger" :expandable="true">
              <ion-icon slot="icon-only" :icon="ioniconsTrash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
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
import {
  IonList,
  IonLabel,
  IonPage,
  IonContent,
  IonItem,
  modalController,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/vue';
import { UserExercisesModal, useUserExerciseFiltersStore } from '~/entities/exercise';
import { useUserSettingsStore } from '~/entities/user';

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
