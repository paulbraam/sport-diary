<template>
  <div class="flex h-full">
    <card class="my-auto w-full">
      <template #content>
        <ion-card-header class="flex items-center">
          <ion-icon color="dark" :icon="ioniconsLockClosedOutline" class="text-[40px]"></ion-icon>
          <ion-card-title>Вход</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <slot name="buttons"></slot>
        </ion-card-content>
      </template>
    </card>
  </div>
</template>

<script setup lang="ts">
import { IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/vue';
import { Card } from '~/shared/ui';
</script>
