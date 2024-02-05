<template>
  <ion-searchbar v-model="value" v-bind="$attrs"></ion-searchbar>
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import type { IonSearchbar, IonNote } from '@ionic/vue';
import type { SearchbarInputProps } from './SearchbarInput.types';

const props = withDefaults(defineProps<SearchbarInputProps>(), {
  name: ''
});

const { value, errorMessage } = useField(props.name);

defineOptions({
  inheritAttrs: false
});
</script>
