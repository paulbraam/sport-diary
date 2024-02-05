<template>
  <ion-button color="primary" @click="onUpdateUserExercisesClick">Done</ion-button>
  <ion-loading :is-open="isLoading" message="Updating your exercises..."></ion-loading>
  <ion-toast
    :is-open="!!error"
    :message="error?.message"
    :duration="5000"
    color="danger"
    position="top"
  ></ion-toast>
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';
import type { UpdateUserExercisesButtonProps } from './types';
import { useUserSettingsStore } from '~/entities/user';
import { RequestStatus } from '~/shared/lib/const';

const userSettingsStore = useUserSettingsStore();

const error = computed(() => userSettingsStore.requests.updateUserExercises.error as Error);
const isLoading = computed(
  () => userSettingsStore.requests.updateUserExercises.status === RequestStatus.PENDING
);

const props = defineProps<UpdateUserExercisesButtonProps>();

const exerciseIds = toRef(props, 'exerciseIds');

const onUpdateUserExercisesClick = async () => {
  await userSettingsStore.actions.updateUserExercises(exerciseIds.value);
  await modalController.dismiss(null, undefined);
};
</script>
