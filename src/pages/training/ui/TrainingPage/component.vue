<template>
  <ion-page id="training">
    <ion-content>
      <training-card v-if="training" :training="training">
        <template #actions>
          <finish-training-button v-if="isStarted" class="pt-2" :training-id="training.id">
          </finish-training-button>
          <restart-training-button v-else class="pt-2" :training-id="training.id">
          </restart-training-button>
        </template>
      </training-card>
      <div v-if="trainingExercises.length">
        <training-exercise-card
          v-for="trainingExercise in trainingExercises"
          :key="trainingExercise.id"
          :training-exercise="trainingExercise"
        >
        </training-exercise-card>
      </div>
      <add-training-exercise-button v-if="isStarted" :training-id="trainingId">
      </add-training-exercise-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { TrainingCard, TrainingExerciseCard, useTrainingStore } from '~/entities/training';
import {
  AddTrainingExerciseButton,
  FinishTrainingButton,
  RestartTrainingButton
} from '~/features/training';

const route = useRoute();
const trainingId = route.params.id as string;

const { state, actions } = useTrainingStore();

const training = computed(() => state.trainings.get(trainingId));

const trainingExercises = computed(() => {
  return [...state.trainingExercises.values()].filter((item) => item.trainingId === trainingId);
});

const isStarted = computed(() => training.value?.status === 'STARTED');

onIonViewWillEnter(async () => {
  const training = await actions.getTrainingById(trainingId);
  if (training) actions.addTrainingToState(training);

  const trainingExercises = await actions.getTrainingExercises({ trainingId });
  if (trainingExercises) actions.setTrainingExercisesState(trainingExercises);
});
</script>
