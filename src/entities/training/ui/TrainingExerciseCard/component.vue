<template>
  <card :title="trainingExercise.exercise.name">
    <template #actions>
      <delete-training-exercise-button :training-exercise-id="trainingExercise.id">
      </delete-training-exercise-button>
    </template>
    <template #content>
      <ion-list v-if="trainingExercise.sets.length" class="m-0">
        <training-set-list-item
          v-for="set in trainingExercise.sets"
          :key="set.id"
          :training-set="set"
        >
        </training-set-list-item>
      </ion-list>
      <add-training-set-button :training-exercise-id="trainingExercise.id">
      </add-training-set-button>
    </template>
  </card>
</template>

<script setup lang="ts">
import { TrainingSetListItem } from '../TrainingSetListItem';
import type { TrainingExerciseCardProps } from './types';
import { AddTrainingSetButton, DeleteTrainingExerciseButton } from '~/features/training';
import { Card } from '~/shared/ui';

const { trainingExercise } = defineProps<TrainingExerciseCardProps>();
</script>