<template>
  <ion-page>
    <ion-content color="light">
      <training-form />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import TrainingForm from './components/TrainingForm/TrainingForm.vue';

definePageMeta({
  middleware: 'auth'
});
</script>
