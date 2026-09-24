<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
const { locale, t, localePath } = useLocale()

useHead({
  htmlAttrs: { lang: locale },
  title: notFound.value ? t.value.pageNotFound : t.value.error.label,
})
</script>

<template>
  <AppHeader />
  <main class="error section theme-dark">
    <BrandMark class="error__mark" mono />
    <div class="container">
      <p class="eyebrow">{{ t.error.label }} {{ error.statusCode }}</p>
      <h1 class="section-title">{{ notFound ? t.error.notFoundTitle : t.error.genericTitle }}</h1>
      <p class="section-intro">
        {{ notFound ? t.error.notFoundText : t.error.genericText }}
      </p>
      <button class="btn btn--primary" type="button" @click="clearError({ redirect: localePath('/') })">
        {{ t.error.backHome }}
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
