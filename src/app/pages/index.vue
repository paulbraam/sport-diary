<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <ion-menu menu-id="menu" content-id="main-content" :disabled="isMenuDisabled">
    <app-header class="ion-no-border border-bottom">
      <ion-toolbar class="ion-no-border">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </app-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-menu-toggle>
          <ion-item button router-link="/trainings">
            <ion-icon
              slot="start"
              aria-hidden="true"
              :icon="ioniconsFitness"
              color="dark"
            ></ion-icon>
            <ion-label>Trainings</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-item button>
          <ion-icon slot="start" aria-hidden="true" :icon="ioniconsFlag" color="dark"></ion-icon>
          <ion-label>Goals</ion-label>
        </ion-item>
        <ion-item button>
          <ion-icon
            slot="start"
            aria-hidden="true"
            :icon="ioniconsStatsChart"
            color="dark"
          ></ion-icon>
          <ion-label>Statistics</ion-label>
        </ion-item>
        <ion-menu-toggle>
          <ion-item button router-link="/settings">
            <ion-icon
              slot="start"
              aria-hidden="true"
              :icon="ioniconsSettings"
              color="dark"
            ></ion-icon>
            <ion-label>Settings</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-item button @click="logOut()">
          <ion-icon slot="start" aria-hidden="true" :icon="ioniconsExit" color="danger"></ion-icon>
          <ion-label>Sign out</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <app-header>
      <ion-toolbar>
        <ion-buttons v-show="!isMenuDisabled" slot="start">
          <ion-menu-button v-if="isRootRoute"></ion-menu-button>
          <ion-back-button v-else default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Sport Diary</ion-title>
      </ion-toolbar>
    </app-header>
    <ion-content class="ion-padding"><ion-router-outlet /></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonIcon,
  IonBackButton,
  useIonRouter
} from '@ionic/vue';
import { useAuthStore } from '~/entities/auth';
import { AppHeader } from '~/shared/ui';

const router = useIonRouter();
const route = useRoute();

const {
  state,
  actions: { signOut }
} = useAuthStore();

const isRootRoute = computed(() => {
  const MIN_NON_ROOT_SEGMENT_LENGTH = 2;
  const segments = route.path.split('/').filter((item) => !!item);

  return segments.length < MIN_NON_ROOT_SEGMENT_LENGTH;
});

const isMenuDisabled = computed(() => !state.user);

const logOut = async () => {
  await signOut('google');
  router.push('/login');
};

definePageMeta({
  alias: ['/']
});
</script>
