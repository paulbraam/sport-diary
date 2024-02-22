<template>
  <ion-page>
    <ion-content color="light" class="m-4">
      <card title="О приложении">
        <template #content>
          <p>Версия: {{ PackageJson.version }}</p>
        </template>
      </card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { Card } from '~/shared/ui';

import PackageJson from '~~/package.json';
</script>
