<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <app-menu :content-id="CONTENT_ID"></app-menu>
  <ion-page :id="CONTENT_ID">
    <app-header></app-header>
    <ion-content class="ion-padding">
      <ion-router-outlet />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { CONTENT_ID } from './const';
import { AppHeader, AppMenu } from '~/widgets/navigation';

definePageMeta({
  alias: ['/']
});
</script>
