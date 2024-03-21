<template>
  <ion-button shape="round" @click="onCloseCreateTrainingSetModalButtonClick">Закрыть</ion-button>
</template>

<script setup lang="ts">
import { IonButton, modalController } from '@ionic/vue';
import { CREATE_TRAINING_SET_MODAL_ID, CreateTrainingSetModalRoles } from '~/entities/training';

const onCloseCreateTrainingSetModalButtonClick = () => {
  modalController.dismiss(null, CreateTrainingSetModalRoles.CLOSE, CREATE_TRAINING_SET_MODAL_ID);
};
</script>
