<template>
  <form :novalidate="true" @submit="onSubmit">
    <ion-list :inset="true">
      <ion-item>
        <date-input name="startedAt" label="Начало" type="datetime-local"></date-input>
      </ion-item>
      <ion-item lines="none">
        <textarea-input name="comment" label="Комментарий"></textarea-input>
      </ion-item>
      <ion-item>
        <slot name="actions" :on-submit-register="onSubmitRegister" />
      </ion-item>
    </ion-list>
  </form>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { useForm } from 'vee-validate';
import type { SubmitEventHandler, TrainingForm } from './types';
import { trainingFormValidationSchema } from './utils';
import { DateInput, TextareaInput } from '~/shared/ui/form';

const onSubmitted = ref<SubmitEventHandler>(() => {});

const { handleSubmit, resetForm } = useForm<TrainingForm>({
  validationSchema: trainingFormValidationSchema
});

const onSubmitRegister = (submitEventHandler: SubmitEventHandler) => {
  onSubmitted.value = submitEventHandler;
};

const onSubmit = handleSubmit((values) => {
  onSubmitted.value(values);
});

onIonViewDidLeave(() => {
  resetForm();
});
</script>
