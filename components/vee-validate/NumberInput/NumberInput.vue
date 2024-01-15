<template>
  <ion-input v-model.number="value" type="number" v-bind="$attrs" />
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import type { IonInput, IonNote } from '@ionic/vue';
import type { NumberInputProps } from './NumberInput.types';

const props = withDefaults(defineProps<NumberInputProps>(), { name: '' });

const { value, errorMessage } = useField(props.name);

defineOptions({
  inheritAttrs: false
});
</script>
