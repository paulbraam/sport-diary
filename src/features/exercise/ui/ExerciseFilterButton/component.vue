<template>
  <ion-button id="filters" slot="end" shape="round" fill="clear" @click="openFiltersModal">
    <ion-badge color="primary" class="absolute right-[-10px]">{{ appliedFiltersCount }}</ion-badge>
    <ion-icon slot="icon-only" aria-hidden="true" :icon="ioniconsFilter" color="dark"> </ion-icon>
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonBadge, IonIcon, modalController } from '@ionic/vue';
import { useUserExerciseFiltersStore } from '~/entities/exercise';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';
import { ExerciseFiltersModal } from '~/widgets/exercise';

const { state: userExerciseFilters } = useUserExerciseFiltersStore();

const appliedFiltersCount = computed(() =>
  Object.values(userExerciseFilters.value).reduce((acc, value) => {
    return value ? acc + 1 : acc;
  }, 0)
);

const openFiltersModal = async () => {
  const modal = await modalController.create({
    component: ExerciseFiltersModal
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss<GetCatalogExercisesQueryParams>();

  if (role === 'apply' && data) {
    userExerciseFilters.value = data;
  }
};
</script>
