<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useAuthStore } from './stores/auth';

const runtimeConfig = useRuntimeConfig();

const {
  actions: { initialize }
} = useAuthStore();

onBeforeMount(() => {
  initialize('google');
});

console.log('initional');

useHead({
  title: 'Sport Diary',
  meta: [
    {
      name: 'description',
      content: 'Sport diary app'
    },
    {
      name: 'google-signin-client_id',
      content: runtimeConfig.public.googleClientId
    },
    {
      name: 'google-signin-scope',
      content: 'profile email'
    }
  ]
});
</script>
