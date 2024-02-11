<template>
  <form :id="TRAINING_SET_FORM_ID" class="h-full" :novalidate="true" @submit="onSubmit">
    <ion-list>
      <ion-item>
        <select-input name="exerciseId" label="Упражнение" :options="userExerciseSelectOptions">
        </select-input>
      </ion-item>
    </ion-list>
  </form>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { TRAINING_SET_FORM_ID } from '../../model/const';
import { trainingSetFormValidationSchema } from './const';
import type { TrainingSetFormEmits } from './types';
import { useUserSettingsStore } from '~/entities/user';
import { SelectInput } from '~/shared/ui/form';

const emit = defineEmits<TrainingSetFormEmits>();

const { state, actions } = useUserSettingsStore();

const userExerciseSelectOptions = computed(() =>
  state.settings.exercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.id
  }))
);

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
