<template>
  <ion-page id="training-list">
    <ion-content color="light">
      <ion-list :inset="true">
        <ion-item button :detail="true">
          <ion-label>Brench Press</ion-label>
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

const openUserExercisesModal = async () => {
  const modal = await modalController.create({
    component: UserExercisesModal
  });

  modal.present();
};
</script>
