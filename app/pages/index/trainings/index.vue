<template>
  <training-list-page></training-list-page>
</template>

<script setup lang="ts">
import { TrainingListPage } from '~/pages/training';
import { useTrainingStore } from '~/entities/training';

const { actions } = useTrainingStore();

onIonViewWillEnter(() => {
  actions.getTrainings();
});
</script>