<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

const runtimeConfig = useRuntimeConfig();

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
