<template>
  <div class="flex h-full">
    <app-card class="w-full h-fit my-auto">
      <template #content>
        <ion-card-header class="flex items-center">
          <app-icon name="Lock"></app-icon>
          <ion-card-title>Вход</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <slot name="buttons"></slot>
        </ion-card-content>
      </template>
    </app-card>
  </div>
</template>

<script setup lang="ts">
import { IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';
import { AppIcon, AppCard } from '~/shared/ui';
</script>
