<template>
  <ion-page id="new-training">
    <ion-content>
      <training-form>
        <template #actions="{ onSubmitRegister }">
          <create-training-submit-button
            @on-register-submit="onSubmitRegister"
          ></create-training-submit-button>
        </template>
      </training-form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { TrainingForm } from '~/entities/training';
import { CreateTrainingSubmitButton } from '~/features/training';
</script>
