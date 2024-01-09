<template>
  <form :novalidate="true" @submit="onSubmit">
    <ion-list :inset="true">
      <ion-item>
        <ion-input
          id="at"
          v-model.datetime-local="at"
          type="datetime-local"
          label="Date"
        />
        <ion-modal
          trigger="at"
          :initial-breakpoint="0.35"
          :breakpoints="[0, 0.35, 1]"
        >
          <ion-content class="ion-padding">
            <ion-datetime
              presentation="date-time"
              :prefer-wheel="true"
              :show-default-buttons="true"
              @ion-change="onDatetimeChange"
            />
          </ion-content>
        </ion-modal>
        <ion-note v-if="errors['training.at']" color="danger">
          {{ errors['training.at'] }}
        </ion-note>
      </ion-item>
      <ion-item>
        <ion-input v-model.number="weight" type="number" label="Weight (kg)" />
        <ion-note v-if="errors['userParams.weight']" color="danger">
          {{ errors['userParams.weight'] }}
        </ion-note>
      </ion-item>
      <ion-item>
        <ion-input
          v-model.number="heartRate"
          type="number"
          label="Heart rate"
        />
        <ion-note v-if="errors['userParams.heartRate']" color="danger">
          {{ errors['userParams.heartRate'] }}
        </ion-note>
      </ion-item>
      <ion-item>
        <ion-button
          class="w-full"
          size="default"
          :disabled="isLoading"
          type="submit"
        >
          <ion-spinner v-if="isLoading" name="crescent" />
          <span v-else>Create</span>
        </ion-button>
      </ion-item>
    </ion-list>
  </form>
</template>

<script setup lang="ts">
import { IonInput, toastController } from '@ionic/vue';
import dayjs from 'dayjs';
import type { DatetimeCustomEvent } from '@ionic/vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import type {
  CreateUserTrainingResponse,
  CreateUserTrainingRequestBody
} from '~/server/api/trainings/types';

type TrainingFormType = Pick<CreateUserTrainingRequestBody['training'], 'at'>;
type UserParamsFormType = Pick<
  CreateUserTrainingRequestBody['userParams'],
  'weight' | 'heartRate'
>;

type TrainingForm = {
  training: TrainingFormType;
  userParams: UserParamsFormType;
};

const router = useIonRouter();

const validationSchema = toTypedSchema<z.ZodType<TrainingForm>>(
  z.object({
    training: z.object({
      at: z.union([z.date(), z.string()])
    }),
    userParams: z.object({
      weight: z.number().min(1, { message: 'Too short' }),
      heartRate: z.number().min(1, { message: 'Too short' })
    })
  })
);

const { handleSubmit, values, setFieldValue, errors, defineField, resetForm } =
  useForm<TrainingForm>({
    validationSchema
  });

const [atRef] = defineField('training.at');
const at = computed(() => {
  const value = atRef.value;
  return value instanceof Date ? value.toISOString() : value;
});
const [weight] = defineField('userParams.weight');
const [heartRate] = defineField('userParams.heartRate');

watch(
  () => values,
  (params) => console.log(params.training),
  {
    deep: true
  }
);

watch(
  () => errors,
  (errors) => console.log('errors', errors.value),
  {
    deep: true
  }
);

const onDatetimeChange = (event: DatetimeCustomEvent) => {
  const date = event.detail.value;
  const isString = typeof date === 'string';
  if (isString) {
    setFieldValue('training.at', dayjs(date).format('YYYY-MM-DDTHH:mm'));
  }
};

const { execute, status, error } = await useFetch<CreateUserTrainingResponse>(
  '/api/trainings',
  {
    method: 'POST',
    body: values,
    immediate: false,
    watch: false,
    onResponse: ({ response }) => {
      if (response.ok) {
        const training: CreateUserTrainingResponse = response._data;
        router.push(`/trainings/${training.id}`);
      }
    }
  }
);

const onSubmit = handleSubmit(async () => {
  await execute();
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
  resetForm();
});

definePageMeta({
  middleware: 'auth'
});
</script>
