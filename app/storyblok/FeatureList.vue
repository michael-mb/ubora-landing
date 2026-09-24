<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <section
    :id="blok.anchor || undefined"
    v-editable="blok"
    class="feature-list section"
    :class="`theme-${blok.theme || 'light'}`"
  >
    <BrandMark v-if="blok.theme === 'dark'" class="feature-list__mark" mono />

    <div class="container">
      <SectionHeading class="reveal" :eyebrow="blok.eyebrow" :title="blok.title" :intro="blok.intro" />

      <div
        v-if="blok.lists?.length"
        class="feature-list__lists"
        :class="{ 'feature-list__lists--multi': blok.lists.length > 1 }"
      >
        <StoryblokComponent v-for="list in blok.lists" :key="list._uid" class="reveal" :blok="list" />
      </div>

      <p v-if="blok.outro" class="feature-list__outro reveal">{{ blok.outro }}</p>
    </div>
  </section>
</template>

<style scoped>
.feature-list__lists {
  display: grid;
  gap: 2.5rem;
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
}

@media (min-width: 900px) {
  .feature-list__lists--multi { grid-template-columns: 1fr 1fr; gap: 3rem; }
}

.feature-list__outro {
  margin-top: 3rem;
  max-width: 70ch;
  padding: 1.5rem 1.75rem;
  border-left: 4px solid var(--yellow);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: var(--icon-bg);
  font-size: 1.1875rem;
  font-weight: 500;
}

.feature-list__mark {
  position: absolute;
  z-index: -1;
  right: -10%;
  top: -10%;
  width: 560px;
  color: var(--gold);
  opacity: 0.16;
}
</style>
