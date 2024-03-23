<template>
  <ion-button shape="round" expand="block" color="dark" @click="onSignInButtonClick">
    Google
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, useIonRouter } from '@ionic/vue';
import { useAuthStore } from '~/entities/auth';

const router = useIonRouter();

const {
  actions: { signIn }
} = useAuthStore();

const onSignInButtonClick = async () => {
  const { user } = await signIn('google');
  if (user) router.push('/');
};
</script>
