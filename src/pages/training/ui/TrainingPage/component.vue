<template>
  <ion-page id="training">
    <ion-content>
      <training-card v-if="training" :training="training"></training-card>
      <ion-title>Training exercises</ion-title>
      <div v-if="trainingExercises.length">
        <training-exercise-card
          v-for="trainingExercise in trainingExercises"
          :key="trainingExercise.id"
          :training-exercise="trainingExercise"
        >
        </training-exercise-card>
      </div>
      <add-training-exercise-button :training-id="trainingId"></add-training-exercise-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { TrainingCard, TrainingExerciseCard, useTrainingStore } from '~/entities/training';
import { AddTrainingExerciseButton } from '~/features/training';

const route = useRoute();
const trainingId = route.params.id as string;

const { state, actions } = useTrainingStore();

const training = computed(() => state.currentTrainings[trainingId]);

const trainingExercises = computed(() => state.currentTrainingExercises[trainingId] || []);

onIonViewWillEnter(() => {
  actions.getTrainingById(trainingId);
  actions.getTrainingExercises({ trainingId });
});
</script>
