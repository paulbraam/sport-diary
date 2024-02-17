<template>
  <ion-button shape="round" class="w-full" size="default" type="submit">Create</ion-button>
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
import type { CreateTrainingButtonEmits, CreateTrainingButtonProps } from './types';
import { useTrainingStore } from '~/entities/training';
import { RequestStatus } from '~/shared/lib/const';

const router = useIonRouter();

const props = withDefaults(defineProps<CreateTrainingButtonProps>(), {
  values: null
});
const emit = defineEmits<CreateTrainingButtonEmits>();

const { actions, requests } = useTrainingStore();

const error = computed(() => requests.createTraining.error as Error);
const isLoading = computed(() => requests.createTraining.status === RequestStatus.PENDING);

watch(
  () => props.values,
  async (data) => {
    if (data) {
      const training = await actions.createTraining(data);
      if (training) {
        actions.addTrainingToState(training);
        emit('success', training);
        router.replace(`/trainings/${training.id}`);
      }
    }
  }
);
</script>
