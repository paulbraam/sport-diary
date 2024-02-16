<template>
  <ion-searchbar v-model="value" class="search-bar" v-bind="$attrs"></ion-searchbar>
  <ion-note v-if="errorMessage" color="danger">
    {{ errorMessage }}
  </ion-note>
</template>

<script setup lang="ts">
import { IonSearchbar, type IonNote } from '@ionic/vue';
import type { SearchbarInputProps } from './types';

const props = withDefaults(defineProps<SearchbarInputProps>(), {
  name: ''
});

const { value, errorMessage } = useField<string>(props.name);

defineOptions({
  inheritAttrs: false
});
</script>

<style scoped>
.search-bar {
  --box-shadow: none;
}
</style>
