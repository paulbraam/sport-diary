<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as icons from 'lucide-vue-next';
import type { AppIconProps } from './types';
import { DEFAULT_APP_ICON_PROPS } from './const';

const props = withDefaults(defineProps<AppIconProps>(), DEFAULT_APP_ICON_PROPS);

// eslint-disable-next-line import/namespace
const icon = computed(() => icons[props.name]);
</script>

