<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="onClose">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Select exercises</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="onUpdateUserExercisesClick">Done</ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-toolbar>
      <ion-searchbar :debounce="200" @ion-input="onContainsInputChange($event)"></ion-searchbar>
      <ion-button id="filters" slot="end" fill="clear" @click="openFiltersModal">
        <ion-badge color="primary" class="absolute right-[-10px]">{{
          appliedFiltersCount
        }}</ion-badge>
        <ion-icon slot="icon-only" aria-hidden="true" :icon="ioniconsFilter" color="dark">
        </ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
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
  <ion-loading :is-open="isLoading" message="Updating your exercises..."></ion-loading>
  <ion-toast
    :is-open="!!error"
    :message="error?.message"
    :duration="5000"
    color="danger"
    position="top"
  ></ion-toast>
</template>

<script setup lang="ts">
import {
  IonList,
  IonContent,
  IonItem,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonSearchbar,
  modalController,
  type SearchbarCustomEvent,
  type CheckboxCustomEvent
} from '@ionic/vue';
import { onBeforeMount } from 'vue';
import { ExercisesFiltersModal } from '../ExercisesFiltersModal';
import { exerciseFiltersInitialValues } from '../../model/const';
import { useCatalogExercisesStore, userExerciseFiltersState } from '~/entities/exercise';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';
import { useUserSettingsStore } from '~/entities/user';
import { RequestStatus } from '~/shared/lib/const';

const catalogExercisesStore = useCatalogExercisesStore();
const userSettingsStore = useUserSettingsStore();

const error = computed(() => userSettingsStore.requests.updateUserExercises.error as Error);
const isLoading = computed(
  () => userSettingsStore.requests.updateUserExercises.status === RequestStatus.PENDING
);

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
const contains = ref<string>('');

const appliedFiltersCount = computed(() =>
  Object.values(userExerciseFiltersState.value).reduce((acc, value) => {
    return value ? acc + 1 : acc;
  }, 0)
);

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

const onUpdateUserExercisesClick = async () => {
  await userSettingsStore.actions.updateUserExercises(userExerciseIds.value);
  await modalController.dismiss(null, undefined);
};

const openFiltersModal = async () => {
  const modal = await modalController.create({
    component: ExercisesFiltersModal
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss<GetCatalogExercisesQueryParams>();

  if (role === 'apply' && data) {
    userExerciseFiltersState.value = data;
  }
};

const onClose = () => {
  modalController.dismiss(null, undefined);
};

watch([() => userExerciseFiltersState.value, () => contains.value], ([filters, contains]) => {
  const allFilters = {
    ...exerciseFiltersInitialValues,
    ...(filters || {}),
    contains
  };
  catalogExercisesStore.actions.getCatalogExercises(allFilters);
});

onBeforeMount(() => {
  catalogExercisesStore.actions.getCatalogExercises({
    ...exerciseFiltersInitialValues,
    contains: contains.value
  });
});
</script>
