<template>
  <ion-page>
    <ion-content color="light">
      <ion-list :inset="true">
        <ion-item-sliding v-for="training in trainings" :key="training.id">
          <ion-item button :detail="true">
            <ion-label>{{ dayjs(training.at).format('YYYY/MM/DD') }}</ion-label>
          </ion-item>
          <ion-item-options slot="end">
            <ion-item-option color="tertiary">
              <ion-icon slot="icon-only" :icon="ioniconsPencil"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" :expandable="true">
              <ion-icon slot="icon-only" :icon="ioniconsTrash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button router-link="/trainings/new">
          <ion-icon :icon="ioniconsAdd"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonFab,
  IonList,
  IonItemSliding,
  IonItemOption,
  IonIcon,
  IonLabel,
  IonFabButton
} from '@ionic/vue';
import dayjs from 'dayjs';
import type { GetUserTrainingsResponse } from '~/server/api/trainings/types';

const {
  data: { value: trainings }
} = await useFetch<GetUserTrainingsResponse>('/api/trainings', {
  default: () => []
});

definePageMeta({
  middleware: 'auth'
});
</script>
