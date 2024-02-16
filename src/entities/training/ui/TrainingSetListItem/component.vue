<template>
  <ion-item-sliding>
    <ion-item button>
      <ion-label>{{ trainingSet.reps }}</ion-label>
    </ion-item>
    <ion-item-options slot="end" @ion-swipe="onTrainingSetDelete(trainingSet.id)">
      <ion-item-option color="danger" :expandable="true">
        <ion-icon
          slot="icon-only"
          :icon="ioniconsTrash"
          @click="onTrainingSetDelete(trainingSet.id)"
        >
        </ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import {
  IonLabel,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  alertController
} from '@ionic/vue';
import { useTrainingStore } from '../../model';
import type { TrainingSetListItemProps } from './types';

const { actions } = useTrainingStore();

const props = defineProps<TrainingSetListItemProps>();

const trainingSet = toRef(props, 'trainingSet');

const onTrainingSetDelete = async (setId: string) => {
  const alert = await alertController.create({
    header: 'Do you really want to remove your exercise?',
    message: 'This action is potentially distructive',
    buttons: [
      'Cancel',
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const deletedSet = await actions.deleteTrainingSetById(setId);
          const trainingExerciseId = deletedSet?.trainingExerciseId;

          if (trainingExerciseId) {
            const currentTrainingExercise =
              await actions.getTrainingExerciseById(trainingExerciseId);

            if (currentTrainingExercise) {
              actions.addTrainingExerciseToState(currentTrainingExercise);
            }
          }
        }
      }
    ]
  });

  await alert.present();
};
</script>
