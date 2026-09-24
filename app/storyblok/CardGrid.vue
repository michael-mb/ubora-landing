<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <section
    :id="blok.anchor || undefined"
    v-editable="blok"
    class="card-grid section"
    :class="`theme-${blok.theme || 'light'}`"
  >
    <div class="container">
      <SectionHeading class="reveal" :eyebrow="blok.eyebrow" :title="blok.title" :intro="blok.intro" />

      <h3 v-if="blok.cards_title" class="card-grid__subtitle reveal">{{ blok.cards_title }}</h3>

      <div
        class="card-grid__cards"
        :class="{ 'card-grid__cards--spaced': !blok.cards_title }"
        :style="{ '--cols': Math.min(blok.cards?.length || 1, 4) }"
      >
        <StoryblokComponent v-for="card in blok.cards" :key="card._uid" class="reveal" :blok="card" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-grid__subtitle {
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  font-size: 1.375rem;
  font-weight: 700;
}

.card-grid__cards {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .card-grid__cards { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1100px) {
  .card-grid__cards { grid-template-columns: repeat(var(--cols), 1fr); }
}

.card-grid__cards--spaced { margin-top: clamp(2.5rem, 5vw, 3.5rem); }
</style>
