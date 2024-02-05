<template>
  <form :novalidate="true" @submit="onSubmit">
    <ion-list :inset="true">
      <ion-item>
        <date-input name="startedAt" label="Start" type="datetime-local"></date-input>
      </ion-item>
      <ion-item>
        <date-input name="endedAt" label="End" type="datetime-local"></date-input>
      </ion-item>
      <ion-item lines="none">
        <textarea-input name="comment" label="Comment"></textarea-input>
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
import { DateInput, TextareaInput } from '~/shared/ui/form';

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
