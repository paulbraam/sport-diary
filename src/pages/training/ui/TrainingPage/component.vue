<template>
  <ion-page id="training">
    <ion-content>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import dayjs from 'dayjs';
import { useTrainingStore } from '~/entities/training';

const { state, actions } = useTrainingStore();

const startedAt = computed(() => {
  const date = state.currentTraining?.startedAt;
  return date ? dayjs(date).format('YYYY/MM/DD HH:mm') : null;
});
const endedAt = computed(() => {
  const date = state.currentTraining?.endedAt;
  return date ? dayjs(date).format('YYYY/MM/DD HH:mm') : null;
});
const comment = computed(() => state.currentTraining?.comment);

const route = useRoute();
const trainingId = route.params.id as string;

onIonViewWillEnter(() => {
  actions.getTrainingById(trainingId);
});
</script>
