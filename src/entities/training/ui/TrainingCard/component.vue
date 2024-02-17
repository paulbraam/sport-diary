<template>
  <card title="Тренировка">
    <template #content>
      <div class="flex flex-col">
        <div>Начало: {{ startedAt }}</div>
        <div v-if="endedAt">Окончание: {{ endedAt }}</div>
        <div v-if="comment">Комментарий: {{ comment }}</div>
        <slot name="actions"></slot>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import type { TrainingCardProps } from './types';
import { formatDate } from '~/shared/lib/utils';
import { Card } from '~/shared/ui';

const { training } = defineProps<TrainingCardProps>();

const startedAt = computed(() => formatDate(training.startedAt));
const endedAt = computed(() => formatDate(training.endedAt));
const comment = computed(() => training.comment);
</script>
