<template>
  <ion-input v-model="value" :type="type" v-bind="$attrs" />
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import type { IonInput, IonNote } from '@ionic/vue';
import type { TextInputProps } from './TextInput.types';

const props = withDefaults(defineProps<TextInputProps>(), { name: '' });

const { value, errorMessage } = useField(props.name);

defineOptions({
  inheritAttrs: false
});
</script>
