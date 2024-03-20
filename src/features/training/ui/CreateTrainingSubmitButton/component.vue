<template>
  <ion-button shape="round" class="w-full" size="default" type="submit">Создать</ion-button>
  <ion-loading :is-open="isLoading" message="Создаем тренировку..."></ion-loading>
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
import type { CreateTrainingSubmitButtonEmits } from './types';
import { useTrainingStore } from '~/entities/training';
import { RequestStatus } from '~/shared/lib/const';
import type { CreateUserTrainingRequestBody } from '~/server/api/trainings/types';

const router = useIonRouter();

const emit = defineEmits<CreateTrainingSubmitButtonEmits>();

const onSubmitted = async (data: CreateUserTrainingRequestBody) => {
  const training = await actions.createTraining(data);
  if (training) {
    actions.addTrainingToState(training);
    router.replace(`/trainings/${training.id}`);
  }
};

emit('onSubmitRegister', onSubmitted);

const { actions, requests } = useTrainingStore();

const error = computed(() => requests.createTraining.error as Error);
const isLoading = computed(() => requests.createTraining.status === RequestStatus.PENDING);
</script>
