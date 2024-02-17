<template>
  <ion-page id="training-list">
    <ion-content color="light">
      <ion-list :inset="true">
        <ion-item button :detail="true" router-link="/settings/exercises">
          <ion-label>Мои упражнения</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonList, IonLabel, IonPage, IonContent, IonItem } from '@ionic/vue';
</script>
