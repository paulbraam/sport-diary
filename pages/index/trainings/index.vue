<template>
  <training-list-layout></training-list-layout>
</template>

<script setup lang="ts">
import { TrainingListLayout } from '~/layouts/training';
import { useTrainingStore } from '~/entities/training';

const { actions } = useTrainingStore();

onIonViewWillEnter(() => {
  actions.getTrainings();
});

definePageMeta({
  middleware: 'auth'
});
</script>