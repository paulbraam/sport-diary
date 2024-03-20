<template>
  <ion-page id="training-list">
    <ion-content color="light">
      <ion-list v-if="trainings.length" :inset="true">
        <training-list-item v-for="training in trainings" :key="training.id" :training="training">
          <template #options>
            <delete-training-list-item-option :training-id="training.id">
            </delete-training-list-item-option>
          </template>
        </training-list-item>
      </ion-list>
      <div v-else class="h-full w-full flex justify-center items-center">Нет тренировок</div>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button router-link="/trainings/new">
          <ion-icon :icon="ioniconsAdd"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonFab, IonList, IonIcon, IonPage, IonContent, IonFabButton } from '@ionic/vue';
import { TrainingListItem, useTrainingStore } from '~/entities/training';
import { DeleteTrainingListItemOption } from '~/features/training';

const { actions, state } = useTrainingStore();

const trainings = computed(() => [...state.trainings.values()]);

onIonViewWillEnter(async () => {
  const trainings = await actions.getTrainings();
  if (trainings) actions.setTrainingsState(trainings);
});
</script>
