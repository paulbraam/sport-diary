<template>
  <ion-button shape="round" @click="onCloseUserExercisesModalButtonClick">Отмена</ion-button>
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';
import { USER_EXERCISES_MODAL_ID, UserExercisesModalRoles } from '~/entities/exercise';

const onCloseUserExercisesModalButtonClick = () => {
  modalController.dismiss(null, UserExercisesModalRoles.CLOSE, USER_EXERCISES_MODAL_ID);
};
</script>
