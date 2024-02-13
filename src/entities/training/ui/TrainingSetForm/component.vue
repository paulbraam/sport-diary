<template>
  <form :id="TRAINING_SET_FORM_ID" class="h-full" :novalidate="true" @submit="onSubmit">
    <ion-list>
      <ion-item>
        <number-input name="reps" label="Повторения"></number-input>
      </ion-item>
      <ion-item>
        <number-input name="weight" label="Вес (кг)"></number-input>
      </ion-item>
      <ion-item>
        <select-input name="exerciseId" label="Интенсивность" :options="intensitySelectOptions">
        </select-input>
      </ion-item>
    </ion-list>
  </form>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { TRAINING_SET_FORM_ID } from '../../model/const';
import { intensitySelectOptions, trainingSetFormValidationSchema } from './const';
import type { TrainingExerciseFormEmits } from './types';
import { useUserSettingsStore } from '~/entities/user';
import { NumberInput, SelectInput } from '~/shared/ui/form';

const emit = defineEmits<TrainingExerciseFormEmits>();

const { actions } = useUserSettingsStore();

const { handleSubmit } = useForm({
  validationSchema: trainingSetFormValidationSchema
});

const onSubmit = handleSubmit((values) => {
  emit('submit', values);
});

onBeforeMount(() => {
  actions.getUserSettings();
});
</script>
