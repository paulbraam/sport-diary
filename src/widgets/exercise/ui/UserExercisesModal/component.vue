<template>
  <app-modal>
    <template #startActions>
      <close-user-exercises-modal-button></close-user-exercises-modal-button>
    </template>
    <template #endActions>
      <apply-user-exercises-modal-button :exercise-ids="userExerciseIds">
      </apply-user-exercises-modal-button>
    </template>
    <template #default>
      <ion-toolbar class="flex flex-row gap-1 items-center px-4">
        <exercise-search-filter-input></exercise-search-filter-input>
        <exercise-filter-button></exercise-filter-button>
      </ion-toolbar>
      <ion-list id="modal-list" :inset="true">
        <ion-item v-for="item in catalogExercises" :key="item.id">
          <ion-checkbox
            :value="item.id"
            :checked="isAdded(item.id)"
            @ion-change="onExerciseCheckboxChange($event)"
          >
            <span class="text-wrap">{{ item.name }}</span>
          </ion-checkbox>
        </ion-item>
      </ion-list>
    </template>
  </app-modal>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonToolbar, type CheckboxCustomEvent } from '@ionic/vue';
import type { CatalogExercise } from '@prisma/client';
import {
  ExerciseSearchFilterInput,
  useCatalogExercisesStore,
  useUserExerciseFiltersStore
} from '~/entities/exercise';
import { useUserSettingsStore } from '~/entities/user';
import {
  ExerciseFilterButton,
  ApplyUserExercisesModalButton,
  CloseUserExercisesModalButton
} from '~/features/exercise';
import { AppModal } from '~/shared/ui';

const catalogExercisesStore = useCatalogExercisesStore();
const userSettingsStore = useUserSettingsStore();
const { state: exerciseFilters } = useUserExerciseFiltersStore();

const catalogExercises = computed(() => catalogExercisesStore.state.exercises ?? []);
const userExerciseIds = ref(userSettingsStore.state.settings.exercises.map((item) => item.id));

const isAdded = (id: CatalogExercise['id']) => userExerciseIds.value.includes(id);

const onExerciseCheckboxChange = (event: CheckboxCustomEvent) => {
  const exerciseId = event.target.value;
  const isChecked = event.detail.checked;

  if (isChecked) {
    userExerciseIds.value.push(exerciseId);
    return;
  }

  const exerciseIdIndex = userExerciseIds.value.indexOf(exerciseId);
  userExerciseIds.value.splice(exerciseIdIndex, 1);
};

watch(
  () => exerciseFilters.value,
  (filters) => {
    catalogExercisesStore.actions.getCatalogExercises(filters);
  }
);

onBeforeMount(() => {
  catalogExercisesStore.actions.getCatalogExercises(exerciseFilters.value);
});
</script>
