<template>
  <ion-page>
    <ion-content><ion-button @click="logOut()">Sign-out</ion-button></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const {
  actions: { signOut }
} = useAuthStore();

const router = useIonRouter();

const logOut = async () => {
  await signOut('google');
  router.push('/login');
};

definePageMeta({
  middleware: 'auth'
});
</script>
