<template>
  <ion-select v-model="value" v-bind="$attrs">
    <ion-select-option v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </ion-select-option>
  </ion-select>
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import type { IonSelect, IonSelectOption, IonNote } from '@ionic/vue';
import type { SelectInputProps } from './SelectInput.types';

const props = withDefaults(defineProps<SelectInputProps>(), {
  name: ''
});

const { value, errorMessage } = useField(props.name);

defineOptions({
  inheritAttrs: false
});
</script>
