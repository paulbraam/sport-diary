<template>
  <ion-button shape="round" color="primary" @click="onApplyUserExercisesModalButtonClick"
    >Сохранить</ion-button
  >
  <ion-loading :is-open="isLoading" message="Обновляем упражнение..."></ion-loading>
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
import type { ApplyUserExercisesModalButtonProps } from './types';
import { useUserSettingsStore } from '~/entities/user';
import { RequestStatus } from '~/shared/lib/const';
import { USER_EXERCISES_MODAL_ID, UserExercisesModalRoles } from '~/entities/exercise';

const userSettingsStore = useUserSettingsStore();

const error = computed(() => userSettingsStore.requests.updateUserExercises.error as Error);
const isLoading = computed(
  () => userSettingsStore.requests.updateUserExercises.status === RequestStatus.PENDING
);

const props = defineProps<ApplyUserExercisesModalButtonProps>();

const onApplyUserExercisesModalButtonClick = async () => {
  await userSettingsStore.actions.updateUserExercises(props.exerciseIds);
  await modalController.dismiss(null, UserExercisesModalRoles.APPLY, USER_EXERCISES_MODAL_ID);
};
</script>
