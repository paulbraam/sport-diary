<template>
  <ion-page>
    <ion-content>
      <div class="flex h-screen">
        <ion-card class="my-auto w-full">
          <ion-card-header class="flex items-center">
            <ion-icon color="dark" :icon="ioniconsLockClosedOutline" class="text-[40px]"></ion-icon>
            <ion-card-title>Sign-In</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="block" color="dark" @click="signIn('google')">
              <ion-icon slot="start" :icon="ioniconsLogoGoogle"></ion-icon>
              Google
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, useIonRouter } from '@ionic/vue';
import { useAuthStore } from '~/stores/auth';

const router = useIonRouter();

const {
  state,
  actions: { signIn, refresh }
} = useAuthStore();

watch(
  () => state.user,
  (user) => {
    if (user) {
      router.push('/');
    }
  }
);

onMounted(async () => {
  if (!state.user) {
    await refresh('google');
  }
});
</script>
