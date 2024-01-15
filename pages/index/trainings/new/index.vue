<template>
  <new-training-layout></new-training-layout>
</template>

<script setup lang="ts">
import { NewTrainingLayout } from '~/layouts/training';

definePageMeta({
  middleware: 'auth'
});
</script>
