<template>
  <app-card :subtitle="trainingExercise.exercise.name">
    <template v-if="isStarted" #actions>
      <slot name="actions"></slot>
    </template>
    <template #content>
      <div class="flex flex-col gap-4 pt-2">
        <app-border-list v-if="trainingExercise.sets.length">
          <template v-for="set in trainingExercise.sets" :key="set.id">
            <training-set-list-item :swipable="isStarted" :training-set="set">
              <template #options>
                <delete-training-set-list-item-option :set-id="set.id">
                </delete-training-set-list-item-option>
              </template>
            </training-set-list-item>
          </template>
        </app-border-list>
        <add-training-set-button v-if="isStarted" :training-exercise-id="trainingExercise.id">
        </add-training-set-button>
      </div>
    </template>
  </app-card>
</template>

<script setup lang="ts">
import { useTrainingStore } from '../../model';
import { TrainingSetListItem } from '../TrainingSetListItem';
import type { TrainingExerciseCardProps } from './types';
import { AddTrainingSetButton, DeleteTrainingSetListItemOption } from '~/features/training';
import { AppCard, AppBorderList } from '~/shared/ui';

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
</script>../TrainingSetListItem