<template>
  <ion-button
    id="filters"
    slot="end"
    class="filter-button"
    shape="round"
    fill="clear"
    @click="onExerciseFilterButtonClick"
  >
    <ion-badge color="primary" class="absolute right-[-10px]">{{ appliedFiltersCount }}</ion-badge>
    <ion-icon slot="icon-only" aria-hidden="true" :icon="ioniconsFilter" color="dark"> </ion-icon>
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonBadge, IonIcon, modalController } from '@ionic/vue';
import {
  EXERCISE_FILTERS_MODAL_ID,
  ExerciseFiltersModalRoles,
  useUserExerciseFiltersStore
} from '~/entities/exercise';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';
import { ExerciseFiltersModal } from '~/widgets/exercise';

const { state: userExerciseFilters } = useUserExerciseFiltersStore();

const appliedFiltersCount = computed(() =>
  Object.values(userExerciseFilters.value).reduce((acc, value) => {
    if (value) {
      const newAcc = acc + 1;
      return newAcc;
    }
    return acc;
  }, 0)
);

const onExerciseFilterButtonClick = async () => {
  const modal = await modalController.create({
    id: EXERCISE_FILTERS_MODAL_ID,
    component: ExerciseFiltersModal
  });

  modal.present();

  const { data, role } =
    await modal.onWillDismiss<Omit<GetCatalogExercisesQueryParams, 'contains'>>();

  if (role === ExerciseFiltersModalRoles.APPLY && data) {
    userExerciseFilters.value = {
      ...data,
      contains: userExerciseFilters.value.contains
    };
  }
};
</script>

<style scoped>
.filter-button {
  --padding-end: 15px;
  --padding-start: 15px;
}
</style>
