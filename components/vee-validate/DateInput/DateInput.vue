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
import type { DateInputProps } from './DateInput.types';
import { DATE_INPUT_MODAL_BREAKPOINTS, DATE_INPUT_INITIAL_BREAKPOINT } from './DateInput.const';

const props = withDefaults(defineProps<DateInputProps>(), { name: '' });

const { value, errorMessage } = useField(props.name);

defineOptions({
  inheritAttrs: false
});
</script>
