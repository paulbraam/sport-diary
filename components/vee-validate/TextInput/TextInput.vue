<template>
  <ion-input v-model="value" :type="type" :label="label" />
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
  },
  type: {
    type: String,
    default: 'text'
  }
});

const { value, errorMessage } = useField(props.name);
</script>
