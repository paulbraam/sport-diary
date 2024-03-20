<template>
  <ion-button shape="round" color="primary" type="submit" :form="EXERCISE_FILTERS_FORM_ID">
    Применить
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { EXERCISE_FILTERS_FORM_ID } from '~/entities/exercise';
</script>
