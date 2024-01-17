<template>
  <div class="flex h-full">
    <ion-card class="my-auto w-full">
      <ion-card-header class="flex items-center">
        <ion-icon color="dark" :icon="ioniconsLockClosedOutline" class="text-[40px]"></ion-icon>
        <ion-card-title>Sign-In</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button expand="block" color="dark" @click="logInWithGoogle">
          <ion-icon slot="start" :icon="ioniconsLogoGoogle"></ion-icon>
          Google
        </ion-button>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonButton,
  useIonRouter
} from '@ionic/vue';
import { useAuthStore } from '../../model';

const router = useIonRouter();

const {
  actions: { signIn }
} = useAuthStore();

const logInWithGoogle = async () => {
  const { user } = await signIn('google');
  if (user) router.push('/');
};
</script>
