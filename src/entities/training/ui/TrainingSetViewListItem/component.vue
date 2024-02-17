<template>
  <ion-item class="list-item" button @click="onTrainingSetListItemClick">
    <ion-label>{{ label }}</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonLabel, IonItem, alertController, IonicSafeString } from '@ionic/vue';
import type { TrainingSetListItemProps } from './types';

const props = defineProps<TrainingSetListItemProps>();

const trainingSet = toRef(props, 'trainingSet');

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

<style scoped>
.list-item:last-child {
  --border-color: rgba(255, 255, 255, 0);
}
</style>