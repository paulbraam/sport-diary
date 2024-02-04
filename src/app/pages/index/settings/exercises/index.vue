<template>
  <ion-page id="training-list">
    <ion-content color="light">
      <ion-list>
        <ion-item v-for="exercise in userExercises" :key="exercise.id" button :detail="true">
          <ion-label>{{ exercise.name }}</ion-label>
        </ion-item>
      </ion-list>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="openUserExercisesModal">
          <ion-icon :icon="ioniconsAdd"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonList, IonLabel, IonPage, IonContent, IonItem, modalController } from '@ionic/vue';
import { UserExercisesModal } from '~/entities/exercise';
import { useUserSettingsStore } from '~/entities/user';

const { actions, state } = useUserSettingsStore();

const userExercises = computed(() => state.settings?.exercises ?? []);

const openUserExercisesModal = async () => {
  const modal = await modalController.create({
    component: UserExercisesModal
  });

  modal.present();
};

onBeforeMount(() => {
  actions.getUserSettings();
});
</script>
