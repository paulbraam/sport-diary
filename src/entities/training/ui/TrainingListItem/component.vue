<template>
  <ion-item-sliding @ion-swipe="onTrainingDelete(training.id)">
    <ion-item button detail :router-link="`/trainings/${training.id}`">
      <div class="flex flex-row gap-4 items-center">
        <ion-icon :icon="ioniconsBarbell"></ion-icon>
        <ion-label>{{ label }}</ion-label>
      </div>
    </ion-item>
    <ion-item-options slot="end">
      <ion-item-option color="danger" :expandable="true">
        <ion-icon
          slot="icon-only"
          :icon="ioniconsTrash"
          @click="onTrainingDelete(training.id)"
        ></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import {
  IonItemSliding,
  IonItemOption,
  IonIcon,
  IonLabel,
  IonItem,
  IonItemOptions,
  alertController
} from '@ionic/vue';
import { useTrainingStore } from '../../model';
import type { TrainingListItemProps } from './types';
import { formatDate } from '~/shared/lib/utils';

const props = defineProps<TrainingListItemProps>();

const { actions } = useTrainingStore();

const training = toRef(props, 'training');

const label = computed(() => formatDate(training.value.createdAt));

const onTrainingDelete = async (id: string) => {
  const alert = await alertController.create({
    header: 'Do you really want to remove your exercise?',
    message: 'This action is potentially distructive',
    buttons: [
      'Cancel',
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const deletedTraining = await actions.deleteTrainingById(id);

          if (deletedTraining) {
            actions.removeTrainingFromState(deletedTraining.id);
          }
        }
      }
    ]
  });

  await alert.present();
};
</script>
