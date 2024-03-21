<template>
  <app-header>
    <ion-toolbar>
      <ion-buttons v-show="showButtons" slot="start">
        <ion-menu-button v-if="isRootRoute"></ion-menu-button>
        <ion-back-button v-else default-href="/"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ runtimeConfig.public.appName }}</ion-title>
    </ion-toolbar>
  </app-header>
</template>

<script setup lang="ts">
import { IonButtons, IonMenuButton, IonTitle, IonToolbar, IonBackButton } from '@ionic/vue';
import { useAuthStore } from '~/entities/auth';
import { AppHeader } from '~/shared/ui';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const { state } = useAuthStore();

const isRootRoute = computed(() => {
  const MIN_NON_ROOT_SEGMENT_COUNT = 2;
  const segments = route.path.split('/').filter((item) => !!item);

  return segments.length < MIN_NON_ROOT_SEGMENT_COUNT;
});

const showButtons = computed(() => state.user);
</script>
