<template>
  <ion-page>
    <ion-content>
      <training-form>
        <template #actions="{ values, success }">
          <create-training-button :values="values" @success="() => success()">
          </create-training-button>
        </template>
      </training-form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { TrainingForm } from '~/entities/training';
import { CreateTrainingButton } from '~/features/training';
</script>
