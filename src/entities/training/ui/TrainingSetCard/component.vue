<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ trainingSet.exercise.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>Some content</ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardTitle, IonCardContent, IonCardHeader } from '@ionic/vue';

import type { TrainingSetCardProps } from './types';

const { trainingSet } = defineProps<TrainingSetCardProps>();
</script>
