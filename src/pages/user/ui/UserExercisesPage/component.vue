<template>
  <ion-page id="training-list">
    <ion-content color="light">
      <ion-list v-if="userExercises.length" inset>
        <user-exercise-list-item
          v-for="exercise in userExercises"
          :key="exercise.id"
          :exercise="exercise"
        >
          <template #options>
            <delete-user-exercise-list-item-option :exercise-id="exercise.id">
            </delete-user-exercise-list-item-option>
          </template>
        </user-exercise-list-item>
      </ion-list>
      <div v-else class="flex h-full">
        <div class="my-auto w-full flex justify-center">Нет упражнений</div>
      </div>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <open-user-exercises-floating-action-button></open-user-exercises-floating-action-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonList, IonPage, IonContent } from '@ionic/vue';
import { UserExerciseListItem } from '~/entities/exercise';
import { useUserSettingsStore } from '~/entities/user';
import {
  DeleteUserExerciseListItemOption,
  OpenUserExercisesFloatingActionButton
} from '~/features/exercise';

const { actions, state } = useUserSettingsStore();

const userExercises = computed(() => state.settings?.exercises ?? []);

onBeforeMount(() => {
  actions.getUserSettings();
});
</script>
