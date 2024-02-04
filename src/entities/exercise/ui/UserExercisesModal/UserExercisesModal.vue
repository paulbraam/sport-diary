<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="cancelChanges()">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Select exercises</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirmChanges()">Done</ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-toolbar>
      <ion-searchbar :debounce="500" @ion-input="handleContainsInputChange($event)"></ion-searchbar>
      <ion-button id="filters" slot="end" fill="clear" @click="openFiltersModal">
        <ion-icon
          slot="icon-only"
          aria-hidden="true"
          :icon="ioniconsFilter"
          color="dark"
        ></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list id="modal-list" :inset="true">
      <ion-item v-for="item in state.exercises" :key="item.id">
        <ion-checkbox :value="item.id" :checked="true" @ion-change="checkboxChange($event)">{{
          item.name
        }}</ion-checkbox>
      </ion-item>
    </ion-list>
  </ion-content>
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
  type SearchbarCustomEvent
} from '@ionic/vue';
import { onBeforeMount } from 'vue';
import { ExercisesFiltersModal } from '../ExercisesFiltersModal';
import { exerciseFiltersInitialValues } from '../../model/const';
import { useCatalogExercisesStore } from '~/entities/exercise';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';

const filters = ref<GetCatalogExercisesQueryParams>();
const contains = ref<string>('');

const handleContainsInputChange = (event: SearchbarCustomEvent) => {
  const value = event.target.value;
  contains.value = value || '';
};

const openFiltersModal = async () => {
  const modal = await modalController.create({
    component: ExercisesFiltersModal
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss<GetCatalogExercisesQueryParams>();

  if (role === 'apply') {
    filters.value = data;
  }
};

const { state, actions } = useCatalogExercisesStore();

watch([() => filters.value, () => contains.value], ([filters, contains]) => {
  const allFilters = {
    ...exerciseFiltersInitialValues,
    ...(filters || {}),
    contains
  };
  actions.getCatalogExercises(allFilters);
});

onBeforeMount(() => {
  actions.getCatalogExercises({ ...exerciseFiltersInitialValues, contains: contains.value });
});
</script>
