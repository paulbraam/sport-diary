<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <ion-menu menu-id="menu" content-id="main-content" :disabled="isMenuDisabled">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-menu-toggle>
          <ion-item button :router-link="RootRoute.TRAININGS">
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
        <ion-item button>
          <ion-icon
            slot="start"
            aria-hidden="true"
            :icon="ioniconsSettings"
            color="dark"
          ></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-item>
        <ion-item button @click="logOut()">
          <ion-icon slot="start" aria-hidden="true" :icon="ioniconsExit" color="danger"></ion-icon>
          <ion-label>Sign out</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons v-show="!isMenuDisabled" slot="start">
          <ion-menu-button v-if="isRootRoute"></ion-menu-button>
          <ion-back-button v-else default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Sport Diary</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding"><ion-router-outlet /></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
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
import { RootRoute } from '../lib/const';
import { useAuthStore } from '~/entities/auth';

const router = useIonRouter();

const route = useRoute();

const isRootRoute = computed(() => (Object.values(RootRoute) as string[]).includes(route.path));

const {
  state,
  actions: { signOut }
} = useAuthStore();

const isMenuDisabled = computed(() => !state.user);

const logOut = async () => {
  await signOut('google');
  router.push('/login');
};

definePageMeta({
  alias: ['/']
});
</script>
