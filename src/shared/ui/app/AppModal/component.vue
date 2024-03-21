<template>
  <app-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <slot name="startActions"></slot>
      </ion-buttons>
      <ion-buttons slot="end">
        <slot name="endActions"></slot>
      </ion-buttons>
    </ion-toolbar>
  </app-header>
  <ion-content class="ion-padding">
    <slot></slot>
  </ion-content>
</template>

<script setup lang="ts">
import { IonContent, IonToolbar, IonButtons } from '@ionic/vue';
import { AppHeader } from '~/shared/ui';
</script>
