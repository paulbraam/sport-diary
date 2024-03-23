<template>
  <ion-input :id="name" v-model="value" label-placement="floating" v-bind="$attrs" @click.prevent />
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
        done-text="Выбрать"
        cancel-text="Отмена"
      />
    </ion-content>
  </ion-modal>
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import { IonInput, IonModal, IonContent, IonDatetime, IonNote } from '@ionic/vue';
import type { DateInputProps } from './types';
import { DATE_INPUT_MODAL_BREAKPOINTS, DATE_INPUT_INITIAL_BREAKPOINT } from './const';

const props = withDefaults(defineProps<DateInputProps>(), { name: '', presentation: 'date-time' });

const { value, errorMessage } = useField<string>(props.name);

defineOptions({
  inheritAttrs: false
});
</script>
