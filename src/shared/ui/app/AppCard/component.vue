<template>
  <ion-card class="card m-[16px]">
    <ion-card-header class="py-2">
      <div class="flex flex-row items-center">
        <div class="flex-grow">
          <ion-card-title v-if="title" class="text-lg">{{ title }}</ion-card-title>
          <ion-card-subtitle v-if="subtitle" class="text-base">{{ subtitle }}</ion-card-subtitle>
        </div>
        <slot name="actions"></slot>
      </div>
    </ion-card-header>
    <ion-card-content>
      <slot name="content"></slot>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { type AppCardProps } from './types';

const props = defineProps<AppCardProps>();

const title = props.title;
const subtitle = props.subtitle;
</script>

<style scoped>
.card {
  box-shadow: none;
  border: 1px solid;
  border: none;
  border-radius: var(--ion-border-radius);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>