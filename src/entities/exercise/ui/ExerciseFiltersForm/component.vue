<template>
  <form :id="EXERCISE_FILTERS_FORM_ID" class="h-full" :novalidate="true" @submit="onSubmit">
    <ion-list>
      <ion-item>
        <select-input name="muscle" label="Основные мышцы" :options="exerciseMuscleSelectOptions">
        </select-input>
      </ion-item>
      <ion-item>
        <select-input name="equipment" label="Инвентарь" :options="exerciseEquipmentSelectOptions">
        </select-input>
      </ion-item>
      <ion-item>
        <select-input name="category" label="Категория" :options="exerciseCategorySelectOptions">
        </select-input>
      </ion-item>
      <ion-item>
        <select-input name="force" label="Усилие" :options="exerciseForceSelectOptions">
        </select-input>
      </ion-item>
    </ion-list>
    <ion-button
      shape="round"
      class="w-full"
      size="default"
      fill="clear"
      @click="onClearFiltersClick"
    >
      Сбросить
    </ion-button>
  </form>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonButton } from '@ionic/vue';
import type { ExerciseFiltersForm, ExerciseFiltersFormEmits } from './types';
import {
  exerciseForceSelectOptions,
  exerciseCategorySelectOptions,
  exerciseEquipmentSelectOptions,
  exerciseMuscleSelectOptions,
  EXERCISE_FILTERS_FORM_INITIAL_VALUES
} from './const';
import { exerciseFiltersFormValidationSchema } from './utils';
import { SelectInput } from '~/shared/ui';
import { EXERCISE_FILTERS_FORM_ID, useUserExerciseFiltersStore } from '~/entities/exercise';

const { state: userExerciseFilters } = useUserExerciseFiltersStore();

const { handleSubmit, setValues } = useForm<ExerciseFiltersForm>({
  validationSchema: exerciseFiltersFormValidationSchema,
  initialValues: userExerciseFilters.value
});

const emit = defineEmits<ExerciseFiltersFormEmits>();

const onSubmit = handleSubmit((values) => {
  emit('onSubmit', values);
});

const onClearFiltersClick = () => {
  setValues(EXERCISE_FILTERS_FORM_INITIAL_VALUES);
};
</script>
