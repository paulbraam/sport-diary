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
import type { TrainingCardProps } from './types';
import { formatDate } from '~/shared/lib/utils';

const { training } = defineProps<TrainingCardProps>();

const startedAt = computed(() => formatDate(training.startedAt));
const endedAt = computed(() => formatDate(training.endedAt));
const comment = computed(() => training.comment);
</script>
