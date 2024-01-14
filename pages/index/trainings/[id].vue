<template>
  <ion-page>
    <ion-content>
      <div class="flex h-full">
        <div class="my-auto w-full flex justify-center">Here is supposed to be a training info</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';

const route = useRoute();
const trainingId = route.params.id as string;

console.log(trainingId);

definePageMeta({
  middleware: 'auth'
});
</script>
