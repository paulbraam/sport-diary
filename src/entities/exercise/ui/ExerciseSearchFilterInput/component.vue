<template>
  <ion-input :debounce="200" placeholder="Поиск" @ion-input="onContainsInputChange($event)">
    <app-icon slot="start" name="Search" aria-hidden="true"></app-icon>
  </ion-input>
</template>

<script setup lang="ts">
import { IonInput, type InputCustomEvent } from '@ionic/vue';
import { useUserExerciseFiltersStore } from '../../model';
import { AppIcon } from '~/shared/ui';

const { state: exerciseFilters } = useUserExerciseFiltersStore();

const onContainsInputChange = (event: InputCustomEvent) => {
  const value = event.target.value;
  if (typeof value === 'string') {
    exerciseFilters.value = {
      ...exerciseFilters.value,
      contains: value || ''
    };
  }
};
</script>
