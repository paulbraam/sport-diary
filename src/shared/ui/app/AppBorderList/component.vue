<template>
  <ion-list class="app-border-list">
    <slot></slot>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList } from '@ionic/vue';
</script>

<style>
.app-border-list {
  border-width: 1px;
  border-radius: var(--ion-border-radius);
  border-color: var(--ion-border-color);
}

.app-border-list ion-item:not(:only-of-type):last-of-type,
.app-border-list ion-item-sliding:last-of-type ion-item {
  --border-radius: 0 0 2px 2px;
  --border-width: 0;
  --inner-border-width: 0;
}
</style>