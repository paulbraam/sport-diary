<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Training</ion-card-title>
      <ion-card-subtitle class="flex flex-col">
        <div>Start: {{ startedAt }}</div>
        <div v-if="endedAt">End: {{ endedAt }}</div>
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content v-if="comment">Comment: {{ comment }}</ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/vue';
import dayjs from 'dayjs';
import type { TrainingCardProps } from './types';

const { training } = defineProps<TrainingCardProps>();

const startedAt = computed(() => {
  const date = training.startedAt;
  return date ? dayjs(date).format('YYYY/MM/DD HH:mm') : null;
});
const endedAt = computed(() => {
  const date = training.endedAt;
  return date ? dayjs(date).format('YYYY/MM/DD HH:mm') : null;
});
const comment = computed(() => training.comment);
</script>
