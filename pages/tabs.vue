<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet />
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/tabs/tab1">
            <ion-icon :icon="ioniconsHomeOutline" />
            <ion-label>Tab 1</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab2" href="/tabs/tab2">
            <ion-icon :icon="ioniconsImagesOutline" />
            <ion-label>Photos</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
definePageMeta({
  alias: ['/'],
  middleware: 'auth'
});
</script>
