<template>
  <app-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="onClose">Cancel</ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <update-user-exercises-button :exercise-ids="userExerciseIds">
        </update-user-exercises-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-toolbar>
      <ion-searchbar :debounce="200" @ion-input="onContainsInputChange($event)"></ion-searchbar>
      <exercise-filter-button></exercise-filter-button>
    </ion-toolbar>
  </app-header>
  <ion-content class="ion-padding">
    <ion-list id="modal-list" :inset="true">
      <ion-item v-for="item in catalogExercises" :key="item.id">
        <ion-checkbox
          :value="item.id"
          :checked="item.isAdded"
          @ion-change="onExerciseCheckboxChange($event)"
        >
          <span class="text-wrap">{{ item.name }}</span>
        </ion-checkbox>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonList,
  IonContent,
  IonItem,
  IonToolbar,
  IonButtons,
  IonSearchbar,
  modalController,
  type SearchbarCustomEvent,
  type CheckboxCustomEvent
} from '@ionic/vue';
import { useCatalogExercisesStore, useUserExerciseFiltersStore } from '~/entities/exercise';
import { useUserSettingsStore } from '~/entities/user';
import { ExerciseFilterButton, UpdateUserExercisesButton } from '~/features/exercise';
import { AppHeader } from '~/shared/ui';

const catalogExercisesStore = useCatalogExercisesStore();
const userSettingsStore = useUserSettingsStore();

const userExerciseIds = ref(userSettingsStore.state.settings.exercises.map((item) => item.id));
const catalogExercises = computed(() => {
  return (catalogExercisesStore.state.exercises ?? []).map((catalogExercise) => {
    const isAdded = userExerciseIds.value.includes(catalogExercise.id);
    return {
      ...catalogExercise,
      isAdded
    };
  });
});
const { state: userExerciseFilters } = useUserExerciseFiltersStore();
const contains = ref<string>('');

const onExerciseCheckboxChange = (event: CheckboxCustomEvent) => {
  const exerciseId = event.target.value;
  const isChecked = event.detail.checked;
  userExerciseIds.value = isChecked
    ? [...userExerciseIds.value, exerciseId]
    : userExerciseIds.value.filter((id) => id !== exerciseId);
};

const onContainsInputChange = (event: SearchbarCustomEvent) => {
  const value = event.target.value;
  contains.value = value || '';
};

const onClose = () => {
  modalController.dismiss(null, undefined);
};

watch([() => userExerciseFilters.value, () => contains.value], ([filters, contains]) => {
  const allFilters = {
    ...filters,
    contains
  };
  catalogExercisesStore.actions.getCatalogExercises(allFilters);
});

onBeforeMount(() => {
  catalogExercisesStore.actions.getCatalogExercises({
    ...userExerciseFilters.value,
    contains: contains.value
  });
});
</script>
