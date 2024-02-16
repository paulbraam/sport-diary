<template>
  <ion-input v-model.number="value" v-bind="$attrs" type="number" />
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import type { IonInput, IonNote } from '@ionic/vue';
import type { NumberInputProps } from './types';

const props = withDefaults(defineProps<NumberInputProps>(), { name: '' });

const { value, errorMessage } = useField(props.name);

defineOptions({
  inheritAttrs: false
});
</script>
