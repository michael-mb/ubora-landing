<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const paragraphs = computed(() => toLines(props.blok.text))
</script>

<template>
  <section
    :id="blok.anchor || undefined"
    v-editable="blok"
    class="text-section section"
    :class="`theme-${blok.theme || 'light'}`"
  >
    <BrandMark v-if="blok.theme === 'yellow' || blok.theme === 'dark'" class="text-section__mark" mono />

    <div class="container text-section__grid reveal">
      <SectionHeading :eyebrow="blok.eyebrow" :title="blok.title" />
      <div class="text-section__body">
        <p v-for="(p, i) in paragraphs" :key="i" :class="{ lead: i === 0 }">{{ p }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-section__grid {
  display: grid;
  gap: 2rem 5rem;
}

@media (min-width: 900px) {
  .text-section__grid { grid-template-columns: 1fr 1.1fr; align-items: start; }
}

.text-section__body {
  display: grid;
  gap: 1.25rem;
  color: var(--section-muted);
  font-size: 1.125rem;
}

@media (min-width: 900px) {
  .text-section__body { padding-top: 2.4rem; }
}

.lead {
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.55;
  color: var(--section-fg);
}

.text-section__mark {
  position: absolute;
  z-index: -1;
  left: -6%;
  bottom: -35%;
  width: 520px;
  color: var(--section-fg);
  opacity: 0.08;
}
</style>
