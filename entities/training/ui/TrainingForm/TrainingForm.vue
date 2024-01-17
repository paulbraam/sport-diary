<template>
  <form :novalidate="true" @submit="onSubmit">
    <ion-list :inset="true">
      <ion-item>
        <date-input name="training.startedAt" label="Start" type="datetime-local"></date-input>
      </ion-item>
      <ion-item>
        <date-input name="training.endedAt" label="End" type="datetime-local"></date-input>
      </ion-item>
      <ion-item>
        <number-input name="userParams.weight" label="Weight (kg)"></number-input>
      </ion-item>
      <ion-item>
        <number-input name="userParams.heartRate" label="Heart rate"></number-input>
      </ion-item>
      <ion-item lines="none">
        <textarea-input name="training.comment" label="Comment"></textarea-input>
      </ion-item>
      <ion-item>
        <slot name="actions" :values="data" :success="onSuccess" />
      </ion-item>
    </ion-list>
  </form>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { useForm } from 'vee-validate';
import type { ITrainingForm } from '../../model';
import { trainingFormValidationSchema } from '../../model';
import { DateInput, NumberInput, TextareaInput } from '~/components/vee-validate';

const data = ref<ITrainingForm | null>(null);

const { handleSubmit, resetForm } = useForm<ITrainingForm>({
  validationSchema: trainingFormValidationSchema
});

const onSubmit = handleSubmit((values) => {
  data.value = values;
});

const onSuccess = () => {
  resetForm();
};
</script>
