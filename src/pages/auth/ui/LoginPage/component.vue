<template>
  <ion-page id="login">
    <ion-content>
      <login-form></login-form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { LoginForm } from '~/entities/auth';
</script>
