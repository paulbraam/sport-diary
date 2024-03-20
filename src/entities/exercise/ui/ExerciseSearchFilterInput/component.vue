<template>
  <ion-input :debounce="200" placeholder="Поиск" @ion-input="onContainsInputChange($event)">
    <ion-icon slot="start" :icon="ioniconsSearch" aria-hidden="true"></ion-icon>
  </ion-input>
</template>

<script setup lang="ts">
import { IonInput, type InputCustomEvent } from '@ionic/vue';
import { useUserExerciseFiltersStore } from '../../model';

const { state: exerciseFilters } = useUserExerciseFiltersStore();

const onContainsInputChange = (event: InputCustomEvent) => {
  const value = event.target.value;
  if (typeof value === 'string') {
    exerciseFilters.value.contains = value || '';
  }
};
</script>
