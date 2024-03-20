<template>
  <ion-button shape="round" @click="closeModal">Закрыть</ion-button>
</template>

<script setup lang="ts">
import { IonButton, modalController } from '@ionic/vue';
import {
  CREATE_TRAINING_EXERCISE_MODAL_ID,
  CreateTrainingExerciseModalRoles
} from '~/entities/training';

const closeModal = () => {
  modalController.dismiss(
    null,
    CreateTrainingExerciseModalRoles.CLOSE,
    CREATE_TRAINING_EXERCISE_MODAL_ID
  );
};
</script>
