<template>
  <ion-page>
    <ion-content>
      <div class="flex h-full">
        <div class="my-auto w-full flex justify-center">Welcome to your Sport Diary</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';

definePageMeta({
  middleware: 'auth'
});
</script>
