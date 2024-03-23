<template>
  <ion-textarea
    v-model="value"
    auto-grow
    :rows="DEFAULT_TEXTAREA_INPUT_ROWS"
    label-placement="floating"
    v-bind="$attrs"
  />
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import type { IonTextarea, IonNote } from '@ionic/vue';
import type { TextareaInputProps } from './types';
import { DEFAULT_TEXTAREA_INPUT_ROWS } from './const';

const props = withDefaults(defineProps<TextareaInputProps>(), { name: '' });

const { value, errorMessage } = useField(props.name);

defineOptions({
  inheritAttrs: false
});
</script>
