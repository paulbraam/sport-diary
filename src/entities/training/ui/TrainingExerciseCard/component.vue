<template>
  <ion-card>
    <ion-card-header class="flex flex-row items-center px-4 py-2">
      <ion-card-title class="flex-grow">{{ trainingExercise.exercise.name }}</ion-card-title>
      <delete-training-exercise-button
        :training-exercise-id="trainingExercise.id"
      ></delete-training-exercise-button>
    </ion-card-header>
    <ion-card-content>
      <ion-list inset>
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
import { AddTrainingSetButton, DeleteTrainingExerciseButton } from '~/features/training';

const { trainingExercise } = defineProps<TrainingExerciseCardProps>();
</script>
