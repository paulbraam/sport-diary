<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ trainingExercise.exercise.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <training-set-list-item
          v-for="set in trainingExercise.sets"
          :key="set.id"
          :training-set="set"
        >
        </training-set-list-item>
      </ion-list>
      <add-training-set-button
        :training-exercise-id="trainingExercise.id"
      ></add-training-set-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardTitle, IonCardContent, IonCardHeader } from '@ionic/vue';
import { TrainingSetListItem } from '../TrainingSetListItem';
import type { TrainingExerciseCardProps } from './types';
import { AddTrainingSetButton } from '~/features/training';

const { trainingExercise } = defineProps<TrainingExerciseCardProps>();
</script>
