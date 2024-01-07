<template>
  <form @submit.prevent="onSubmit" :novalidate="false">
    <ion-list :inset="true">
      <ion-item>
        <ion-input id="at" v-model="at" type="datetime-local" label="Date"></ion-input>
        <ion-modal trigger="at" :initial-breakpoint="0.35" :breakpoints="[0, 0.35, 1]">
          <ion-content class="ion-padding">
            <ion-datetime
              presentation="date-time"
              :prefer-wheel="true"
              :show-default-buttons="true"
              @ion-change="onDatetimeChange" 
            ></ion-datetime>
          </ion-content>
        </ion-modal>
      </ion-item>
      <ion-item>
        <ion-input v-model="weight" type="number" label="Weight (kg)"> </ion-input>
        <ion-note v-if="errors.weight" color="danger">{{ errors.weight }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-input v-model="heartRate" type="number" label="Heart rate"></ion-input>
        <ion-note v-if="errors.heartRate" color="danger">{{ errors.heartRate }}</ion-note>
      </ion-item>
      <ion-item> 
        <ion-button class="w-full" size="default" :disabled="isLoading" type="submit">
          <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
          <span v-else>Create</span>  
        </ion-button>
      </ion-item>
    </ion-list>
  </form>
</template>

<script setup lang="ts">
import { IonInput, toastController } from '@ionic/vue';
import dayjs from 'dayjs';
import { z } from 'zod';
import type { DatetimeCustomEvent } from '@ionic/vue';
import type {
  CreateUserTrainingRequestBody,
  CreateUserTrainingResponse
} from '~/server/api/trainings/types';

const router = useIonRouter();

const { value: at } = useField('training.at');
const { value: weight } = useField('userParams.weight');
const { value: heartRate } = useField('userParams.heartRate');

const validationSchema = toTypedSchema<z.ZodType<CreateUserTrainingRequestBody>>(z.object({
  training: z.object({
    at: z.union([z.string(), z.date()])
  }), 
  userParams: z.object({
    weight: z.number().min(1, { message: 'Too short' }),
    heartRate: z.number().min(1, { message: 'Too short' })
  })
}));

const { handleSubmit, values, setFieldValue, errors } = useForm({
  validationSchema 
});

// const body = computed<CreateUserTrainingRequestBody>(() => ({
//   training: {
//     at: new Date(at.value ?? '').toISOString()
//   },
//   userParams: {
//     weight: Number(weight.value),
//     heartRate: Number(heartRate.value)
//   }
// }));

console.log(errors.value); 

const onDatetimeChange = (event: DatetimeCustomEvent) => {
  const date = event.detail.value;
  const isString = typeof date === 'string';
  if (isString) setFieldValue('training.at', dayjs(date).format('YYYY-MM-DDTHH:mm'));
};

const { execute, status, error } = await useFetch<CreateUserTrainingResponse>('/api/trainings', {
  method: 'POST',
  body: values,
  immediate: false,
  watch: false,
  onResponse: ({ response }) => {
    if (response.ok) {
      // eslint-disable-next-line no-underscore-dangle
      const training: CreateUserTrainingResponse = response._data;
      router.push(`/trainings/${training.id}`); 
    }
  }
}); 

const onSubmit = handleSubmit(async (values) => {
  console.log(values); 
  // await execute();
});

watch(
  () => error.value,
  async (error) => {
    if (error) {
      const toast = await toastController.create({
        message: error.message,
        duration: 1500,
        color: 'danger',
        position: 'top'
      });

      await toast.present();
    }
  }
);

const isLoading = computed(() => status.value === 'pending');

onIonViewDidLeave(() => {
  at.value = null;
  weight.value = null;
  heartRate.value = null;
});

definePageMeta({
  middleware: 'auth'
});
</script>
