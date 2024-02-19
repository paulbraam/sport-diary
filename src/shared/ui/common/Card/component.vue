<template>
  <ion-card class="card">
    <ion-card-header class="py-2">
      <div class="flex flex-row items-center">
        <ion-card-title v-if="title" class="flex-grow text-lg">{{ title }}</ion-card-title>
        <slot name="actions"></slot>
      </div>
      <ion-card-subtitle v-if="subtitle" class="text-base">{{ subtitle }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <slot name="content"></slot>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { type CardProps } from './types';

const props = defineProps<CardProps>();

const title = props.title;
const subtitle = props.subtitle;
</script>

<style scoped>
.card {
  box-shadow: none;
  border: 1px solid;
  border-color: var(--ion-border-color);
}
</style>