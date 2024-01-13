<template>
  <ion-page>
    <ion-content>
      <form :novalidate="true" @submit="onSubmit">
        <ion-list :inset="true">
          <ion-item>
            <date-input name="training.at" label="Date"></date-input>
          </ion-item>
          <ion-item>
            <number-input name="userParams.weight" label="Weight (kg)" type="number"></number-input>
          </ion-item>
          <ion-item lines="none">
            <number-input
              name="userParams.heartRate"
              label="Heart rate"
              type="number"
            ></number-input>
          </ion-item>
          <ion-item>
            <ion-button class="w-full" size="default" :disabled="isLoading" type="submit">
              <ion-spinner v-if="isLoading" name="crescent" />
              <span v-else>Create</span>
            </ion-button>
          </ion-item>
        </ion-list>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { toastController, onIonViewDidLeave } from '@ionic/vue';
import { useForm } from 'vee-validate';
import type { TrainingForm } from './types';
import { trainingFormValidationSchema } from './utils';
import { DateInput, NumberInput } from '~/components/vee-validate';
import { useTrainingStore } from '~/stores/training';
import { RequestStatus } from '~/constants/api';

const { actions, requests } = useTrainingStore();

const isLoading = requests.createTraining.status === RequestStatus.PENDING;

const router = useIonRouter();

const { handleSubmit, resetForm } = useForm<TrainingForm>({
  validationSchema: trainingFormValidationSchema
});

watch(
  () => requests.createTraining.data,
  (data) => {
    if (data) {
      router.push(`/trainings/${data.id}`);
    }
  }
);

watch(
  () => requests.createTraining.error,
  async (error) => {
    if (error) {
      const toast = await toastController.create({
        message: (error as Error).message,
        duration: 1500,
        color: 'danger',
        position: 'top'
      });

      await toast.present();
    }
  }
);

const onSubmit = handleSubmit((body) => {
  actions.createTraining(body);
});

onIonViewDidLeave(() => {
  resetForm();
});

definePageMeta({
  middleware: 'auth'
});
</script>
