<template>
  <ion-page id="training">
    <ion-content>
      <training-card v-if="training" :training="training"></training-card>
      <ion-title>Training sets</ion-title>
      <div v-if="trainingSets">
        <training-set-card
          v-for="trainingSet in trainingSets"
          :key="trainingSet.id"
          :training-set="trainingSet"
        >
        </training-set-card>
      </div>
      <add-training-set-button :training-id="trainingId"></add-training-set-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { TrainingCard, TrainingSetCard, useTrainingStore } from '~/entities/training';
import { AddTrainingSetButton } from '~/features/training';

const route = useRoute();
const trainingId = route.params.id as string;

const { state, actions } = useTrainingStore();

const training = computed(() => state.currentTrainings[trainingId]);

const trainingSets = computed(() => state.currentTrainingSets[trainingId]);

onIonViewWillEnter(() => {
  actions.getTrainingById(trainingId);
  actions.getTrainingSets({ trainingId });
});
</script>
