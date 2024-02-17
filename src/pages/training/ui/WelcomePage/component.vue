<template>
  <ion-page id="welcome">
    <ion-content>
      <div v-if="unfinishedTrainings.length">
        <training-card
          v-for="training in unfinishedTrainings"
          :key="training.id"
          :training="training"
        >
          <template #actions>
            <ion-button shape="round" class="pt-2" :router-link="`/trainings/${training.id}`">
              Открыть
            </ion-button>
          </template>
        </training-card>
      </div>
      <div v-else class="flex h-full">
        <div class="my-auto w-full flex justify-center">Добро пожаловать в спортивный дневник</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { TrainingCard, useTrainingStore } from '~/entities/training';

const { state, actions } = useTrainingStore();

const unfinishedTrainings = computed(() =>
  [...state.trainings.values()].filter((item) => item.status === 'STARTED')
);

onIonViewWillEnter(async () => {
  const trainings = await actions.getTrainings();

  if (trainings) actions.setTrainingsState(trainings);
});
</script>
