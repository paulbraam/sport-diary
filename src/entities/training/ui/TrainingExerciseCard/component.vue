<template>
  <card :title="trainingExercise.exercise.name">
    <template v-if="isStarted" #actions>
      <delete-training-exercise-button :training-exercise-id="trainingExercise.id">
      </delete-training-exercise-button>
    </template>
    <template #content>
      <ion-list v-if="trainingExercise.sets.length" class="m-0">
        <div v-for="set in trainingExercise.sets" :key="set.id">
          <training-set-action-list-item v-if="isStarted" :training-set="set">
          </training-set-action-list-item>
          <training-set-view-list-item v-else :training-set="set"></training-set-view-list-item>
        </div>
      </ion-list>
      <add-training-set-button v-if="isStarted" :training-exercise-id="trainingExercise.id">
      </add-training-set-button>
    </template>
  </card>
</template>

<script setup lang="ts">
import { useTrainingStore } from '../../model';
import { TrainingSetActionListItem } from '../TrainingSetActionListItem';
import { TrainingSetViewListItem } from '../TrainingSetViewListItem';
import type { TrainingExerciseCardProps } from './types';
import { AddTrainingSetButton, DeleteTrainingExerciseButton } from '~/features/training';
import { Card } from '~/shared/ui';

const { trainingExercise } = defineProps<TrainingExerciseCardProps>();

const { state } = useTrainingStore();

const training = computed(() => {
  const trainingId = trainingExercise.trainingId;

  if (trainingId) {
    return state.trainings.get(trainingId);
  }

  return null;
});

const isStarted = computed(() => training.value?.status === 'STARTED');
</script>