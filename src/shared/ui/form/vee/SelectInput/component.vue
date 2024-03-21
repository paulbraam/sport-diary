<template>
  <div class="flex flex-col w-full">
    <ion-select
      v-model="value"
      cancel-text="Отмена"
      interface="alert"
      :interface-options="{
        cssClass: 'select-alert'
      }"
      v-bind="$attrs"
    >
      <ion-select-option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </ion-select-option>
    </ion-select>
    <ion-note v-if="errorMessage" color="danger">
      {{ errorMessage }}
    </ion-note>
  </div>
</template>

<script setup lang="ts">
import { IonSelect, IonSelectOption, IonNote } from '@ionic/vue';
import type { SelectInputProps, SelectOption } from './types';

const props = withDefaults(defineProps<SelectInputProps>(), {
  name: ''
});

const { value, errorMessage } = useField<SelectOption>(props.name);

defineOptions({
  inheritAttrs: false
});
</script>

<style>
.select-alert {
  --min-width: 300px;
}

.select-alert .alert-radio-group {
  max-height: 500px;
}
</style>
