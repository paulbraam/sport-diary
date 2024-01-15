<template>
  <ion-page>
    <ion-content>
      <training-form></training-form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { TrainingForm } from '~/widgets/TrainingForm';

definePageMeta({
  middleware: 'auth'
});
</script>
