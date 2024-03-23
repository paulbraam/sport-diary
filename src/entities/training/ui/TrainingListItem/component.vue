<template>
  <ion-item-sliding @ion-swipe="onTrainingListItemSpiwe">
    <ion-item button detail :router-link="`/trainings/${training.id}`">
      <div class="flex flex-row gap-4 items-center">
        <app-icon name="Dumbbell" :size="16"></app-icon>
        <ion-label>{{ label }}</ion-label>
      </div>
    </ion-item>
    <ion-item-options slot="end">
      <slot name="options"></slot>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import { IonItemSliding, IonLabel, IonItem, IonItemOptions, alertController } from '@ionic/vue';
import { useTrainingStore } from '../../model';
import type { TrainingListItemProps } from './types';
import { formatDate } from '~/shared/lib/utils';
import { AppIcon } from '~/shared/ui';

const props = defineProps<TrainingListItemProps>();

const { actions } = useTrainingStore();

const training = toRef(props, 'training');

const label = computed(() => formatDate(training.value.createdAt));

const onTrainingListItemSpiwe = async () => {
  const alert = await alertController.create({
    header: 'Удаление',
    message: 'Вы действительно хотите удалить тренировку?',
    buttons: [
      'Отмена',
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const deletedTraining = await actions.deleteTrainingById(props.training.id);

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
