<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useHead({ title: notFound.value ? 'Page introuvable' : 'Erreur' })
</script>

<template>
  <AppHeader />
  <main class="error section theme-dark">
    <BrandMark class="error__mark" mono />
    <div class="container">
      <p class="eyebrow">Erreur {{ error.statusCode }}</p>
      <h1 class="section-title">{{ notFound ? 'Cette page est introuvable.' : 'Une erreur est survenue.' }}</h1>
      <p class="section-intro">
        {{ notFound ? 'La page que vous cherchez a peut-être été déplacée ou n’existe plus.' : 'Merci de réessayer dans quelques instants.' }}
      </p>
      <button class="btn btn--primary" type="button" @click="clearError({ redirect: '/' })">
        Retour à l'accueil
        <BrandIcon name="arrow" />
      </button>
    </div>
  </main>
  <AppFooter />
</template>

<style scoped>
.error {
  min-height: 80svh;
  display: flex;
  align-items: center;
  padding-top: calc(var(--header-h) + 4rem);
}

.error .btn { margin-top: 2.5rem; }

.error__mark {
  position: absolute;
  z-index: -1;
  right: -5%;
  bottom: -20%;
  width: 560px;
  color: var(--gold);
  opacity: 0.2;
}
</style>
