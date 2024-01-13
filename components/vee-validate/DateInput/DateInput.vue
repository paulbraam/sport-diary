<template>
  <ion-input :id="name" v-model="value" :type="type" :label="label" />
  <ion-modal
    v-model="value"
    :trigger="name"
    :initial-breakpoint="DATE_INPUT_INITIAL_BREAKPOINT"
    :breakpoints="DATE_INPUT_MODAL_BREAKPOINTS"
  >
    <ion-content class="ion-padding">
      <ion-datetime
        v-model="value"
        :presentation="presentation"
        :prefer-wheel="true"
        :show-default-buttons="true"
      />
    </ion-content>
  </ion-modal>
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import type { IonInput, IonModal, IonContent, IonDatetime, IonNote } from '@ionic/vue';
import { DATE_INPUT_MODAL_BREAKPOINTS, DATE_INPUT_INITIAL_BREAKPOINT } from './DateInput.const';

const props = defineProps({
  name: {
    type: String,
    default: '',
    required: true
  },
  label: {
    type: String,
    default: '',
    required: true
  },
  type: {
    type: String,
    default: 'datetime-local'
  },
  presentation: {
    type: String,
    default: 'date-time'
  }
});

const { value, errorMessage } = useField(props.name);
</script>
