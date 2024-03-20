<template>
  <app-modal>
    <template #startActions>
      <close-exercise-filters-modal-button></close-exercise-filters-modal-button>
    </template>
    <template #endActions>
      <apply-exercise-filters-modal-submit-button></apply-exercise-filters-modal-submit-button>
    </template>
    <template #default>
      <exercise-filters-form @on-submit="onExerciseFiltersFormSubmit"></exercise-filters-form>
    </template>
  </app-modal>
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';
import {
  EXERCISE_FILTERS_MODAL_ID,
  ExerciseFiltersForm,
  ExerciseFiltersModalRoles
} from '~/entities/exercise';
import {
  ApplyExerciseFiltersModalSubmitButton,
  CloseExerciseFiltersModalButton
} from '~/features/exercise';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';
import { AppModal } from '~/shared/ui';

const onExerciseFiltersFormSubmit = (data: Omit<GetCatalogExercisesQueryParams, 'contains'>) => {
  modalController.dismiss(data, ExerciseFiltersModalRoles.APPLY, EXERCISE_FILTERS_MODAL_ID);
};
</script>
