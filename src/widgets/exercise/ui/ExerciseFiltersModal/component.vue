<template>
  <form class="h-full" :novalidate="true" @submit="onSubmit">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="closeFiltersModal">Close</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button color="primary" type="submit">Apply</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <select-input name="muscle" label="Основные мышцы" :options="exerciseMuscleSelectOptions">
          </select-input>
        </ion-item>
        <ion-item>
          <select-input
            name="equipment"
            label="Инвентарь"
            :options="exerciseEquipmentSelectOptions"
          >
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
      <ion-button class="w-full" size="default" fill="clear" @click="onClearFiltersClick">
        Clear
      </ion-button>
    </ion-content>
  </form>
</template>

<script setup lang="ts">
import {
  IonList,
  IonContent,
  IonItem,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController
} from '@ionic/vue';

import { SelectInput } from '~/shared/ui/form';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';
import {
  exerciseCategorySelectOptions,
  exerciseEquipmentSelectOptions,
  exerciseFiltersInitialValues,
  exerciseFiltersModalFormValidationSchema,
  exerciseForceSelectOptions,
  exerciseMuscleSelectOptions,
  useUserExerciseFiltersStore
} from '~/entities/exercise';

const { state: userExerciseFilters } = useUserExerciseFiltersStore();

const { handleSubmit, setValues } = useForm<GetCatalogExercisesQueryParams>({
  validationSchema: exerciseFiltersModalFormValidationSchema,
  initialValues: userExerciseFilters.value
});

const closeFiltersModal = () => {
  modalController.dismiss(null, 'close');
};

const onSubmit = handleSubmit((values) => {
  modalController.dismiss(values, 'apply');
});

const onClearFiltersClick = () => {
  setValues(exerciseFiltersInitialValues);
};
</script>
