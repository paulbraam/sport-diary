<template>
  <ion-button class="w-full" size="default" type="submit">Create</ion-button>
  <ion-loading :is-open="isLoading" message="Creating your training..."> </ion-loading>
  <ion-toast
    :is-open="!!error"
    :message="error?.message"
    :duration="5000"
    color="danger"
    position="top"
  ></ion-toast>
</template>

<script setup lang="ts">
import { IonButton, IonToast, useIonRouter } from '@ionic/vue';
import type { Training } from '@prisma/client';
import { RequestStatus } from '~/constants/api';
import { useTrainingStore, type ITrainingForm } from '~/entities/training';

const router = useIonRouter();

const props = withDefaults(defineProps<{ values: ITrainingForm | null }>(), {
  values: null
});

const { actions, requests } = useTrainingStore();

const error = requests.createTraining.error as Error | null;
const isLoading = requests.createTraining.status === RequestStatus.PENDING;

const emit = defineEmits<{ (eventName: 'success', value: Training): void }>();

watch(
  () => props.values,
  async (data) => {
    if (data) {
      const training = await actions.createTraining(data);
      if (training) {
        emit('success', training);
        router.push(`/trainings/${training.id}`);
      }
    }
  }
);
</script>
