<template>
  <ion-input v-model.number="value" type="number" :label="label" />
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import type { IonInput, IonNote } from '@ionic/vue';

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
  }
});

const { value, errorMessage } = useField(props.name);
</script>
