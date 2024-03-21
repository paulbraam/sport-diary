<template>
  <ion-button shape="round" @click="onCloseExerciseFiltersModalButtonClick">Закрыть</ion-button>
</template>

<script setup lang="ts">
import { IonButton, modalController } from '@ionic/vue';
import { EXERCISE_FILTERS_MODAL_ID, ExerciseFiltersModalRoles } from '~/entities/exercise';

const onCloseExerciseFiltersModalButtonClick = () => {
  modalController.dismiss(null, ExerciseFiltersModalRoles.CLOSE, EXERCISE_FILTERS_MODAL_ID);
};
</script>
