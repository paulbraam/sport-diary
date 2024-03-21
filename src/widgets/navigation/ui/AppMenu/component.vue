<template>
  <ion-menu menu-id="menu" :content-id="contentId" :disabled="disabled">
    <app-header class="ion-no-border border-bottom">
      <ion-toolbar class="ion-no-border">
        <ion-title>Меню</ion-title>
      </ion-toolbar>
    </app-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-menu-toggle v-for="menuOption in MENU_ROUTE_OPTIONS" :key="menuOption.label">
          <ion-item button :router-link="menuOption.route">
            <ion-icon
              slot="start"
              aria-hidden="true"
              :icon="menuOption.icon"
              color="dark"
            ></ion-icon>
            <ion-label>{{ menuOption.label }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-item button @click="onLogoutMenuButtonClick">
          <ion-icon slot="start" aria-hidden="true" :icon="ioniconsExit" color="danger"></ion-icon>
          <ion-label>Выход</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonIcon,
  useIonRouter
} from '@ionic/vue';
import type { AppMenuProps } from './types';
import { MENU_ROUTE_OPTIONS } from './const';
import { useAuthStore } from '~/entities/auth';
import { AppHeader } from '~/shared/ui';

const props = defineProps<AppMenuProps>();
const contentId = toRef(props, 'contentId');

const router = useIonRouter();

const {
  state,
  actions: { signOut }
} = useAuthStore();

const disabled = computed(() => !state.user);

const onLogoutMenuButtonClick = async () => {
  await signOut('google');
  router.push('/login');
};
</script>
