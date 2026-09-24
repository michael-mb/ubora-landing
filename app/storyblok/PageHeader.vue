<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <section v-editable="blok" class="page-header section theme-dark">
    <BrandMark class="page-header__mark" mono />
    <div class="container">
      <p v-if="blok.eyebrow" class="eyebrow">{{ blok.eyebrow }}</p>
      <h1 class="page-header__title">{{ blok.title }}</h1>
      <p v-if="blok.intro" class="section-intro">{{ blok.intro }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-header {
  padding-top: calc(var(--header-h) + clamp(3rem, 7vw, 5rem));
  padding-bottom: clamp(3rem, 6vw, 4.5rem);
}

.page-header__title {
  margin-top: 1rem;
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 800;
  line-height: 1.08;
}

.page-header__mark {
  position: absolute;
  z-index: -1;
  right: -4%;
  top: 10%;
  width: min(45vw, 440px);
  color: var(--gold);
  opacity: 0.22;
}
</style>
