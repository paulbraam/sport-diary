<template>
  <ion-page>
    <ion-content>
      <div class="flex h-full">
        <div class="my-auto w-full flex justify-center">
          Here is supposed to be a list of trainings
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
</script>
