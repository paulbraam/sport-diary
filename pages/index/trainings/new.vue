<template>
  <ion-page>
    <ion-content color="light">
      <ion-list :inset="true">
        <ion-item>
          <ion-input id="at" :value="at" type="datetime-local" label="Date"></ion-input>
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
          <ion-input
            :value="weight"
            type="number"
            label="Weight (kg)"
            @input="(event) => (weight = event.target.value)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            :value="heartRate"
            type="number"
            label="Heart rate"
            @input="(event) => (heartRate = event.target.value)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-button class="w-full" size="default" :disabled="isLoading" @click="submit">
            <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
            <span v-else>Create</span>
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonInput, toastController } from '@ionic/vue';
import dayjs from 'dayjs';
import type { DatetimeCustomEvent } from '@ionic/vue';
import type {
  CreateUserTrainingRequestBody,
  CreateUserTrainingResponse
} from '~/server/api/trainings/types';

const router = useIonRouter();

const at = ref<string | null>(null);
const weight = ref<number | null>(null);
const heartRate = ref<number | null>(null);

const body = computed<CreateUserTrainingRequestBody>(() => ({
  training: {
    at: new Date(at.value ?? '').toISOString()
  },
  userParams: {
    weight: Number(weight.value),
    heartRate: Number(heartRate.value)
  }
}));

const onDatetimeChange = (event: DatetimeCustomEvent) => {
  const date = event.detail.value;
  const isString = typeof date === 'string';
  if (isString) at.value = dayjs(date).format('YYYY-MM-DDTHH:mm');
};

const {
  execute: submit,
  status,
  error
} = await useFetch<CreateUserTrainingResponse>('/api/trainings', {
  method: 'POST',
  body,
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
