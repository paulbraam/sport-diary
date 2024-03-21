<template>
  <ion-page id="login">
    <ion-content color="light">
      <login-card>
        <template #buttons>
          <sign-in-with-google-button></sign-in-with-google-button>
        </template>
      </login-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { LoginCard } from '~/entities/auth';
import { SignInWithGoogleButton } from '~/features/auth';
</script>
