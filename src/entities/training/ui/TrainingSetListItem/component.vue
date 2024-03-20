<template>
  <ion-item-sliding :disabled="!swipable">
    <ion-item button :detail="swipable" @click="onTrainingSetListItemClick">
      <ion-label>{{ label }}</ion-label>
    </ion-item>
    <ion-item-options slot="end" @ion-swipe="onTrainigSetListItemSwipe">
      <slot name="options"></slot>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import {
  IonLabel,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  alertController,
  IonicSafeString
} from '@ionic/vue';
import { useTrainingStore } from '../../model';
import type { TrainingSetListItemProps } from './types';

const { actions } = useTrainingStore();

const props = defineProps<TrainingSetListItemProps>();

const trainingSet = toRef(props, 'trainingSet');
const swipable = toRef(props, 'swipable');

const label = computed(() => {
  const labelFragments: string[] = [];
  const reps = trainingSet.value.reps;
  const weight = trainingSet.value.weight;

  if (reps) {
    labelFragments.push(`${reps} раз`);
  }

  if (weight) {
    labelFragments.push(`${weight} кг`);
  }

  return labelFragments.join(' ');
});

const onTrainigSetListItemSwipe = async () => {
  const alert = await alertController.create({
    header: 'Удаление',
    message: 'Вы действительно хотите удалить подход?',
    buttons: [
      'Отмена',
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const deletedSet = await actions.deleteTrainingSetById(props.trainingSet.id);
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

const onTrainingSetListItemClick = async () => {
  const textFragments: string[] = [];
  const reps = trainingSet.value.reps;
  const weight = trainingSet.value.weight;

  if (reps) {
    textFragments.push(`Повторений: ${reps} раз`);
  }

  if (weight) {
    textFragments.push(`Вес: ${weight} кг`);
  }

  const alert = await alertController.create({
    header: 'Подход',
    message: new IonicSafeString(
      `<div>${textFragments.map((item) => `<p>${item}</p>`).join('')}</div>`
    ),
    buttons: ['OK']
  });

  await alert.present();
};
</script>
