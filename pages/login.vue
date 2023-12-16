<template>
  <ion-page>
    <ion-content>
      <div>
        <p>Sign-In Options:</p>
        <ion-button expand="block" color="dark" @click="signIn('github', {
          callbackUrl: '/login'
        })">
          <ion-icon slot="start" :icon="ioniconsLogoGithub"></ion-icon>
          Github
        </ion-button>
      </div>
    </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  }
})
const { signIn } = useAuth()
</script>