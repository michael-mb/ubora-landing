<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <section
    :id="blok.anchor || undefined"
    v-editable="blok"
    class="steps section"
    :class="`theme-${blok.theme || 'light'}`"
  >
    <div class="container">
      <SectionHeading class="reveal" :eyebrow="blok.eyebrow" :title="blok.title" :intro="blok.intro" />

      <ol class="steps__list">
        <li v-for="(step, i) in (blok.steps as Record<string, any>[])" :key="step._uid" class="reveal">
          <StoryblokComponent :blok="step" :index="i + 1" />
        </li>
      </ol>

      <div v-if="blok.conclusion" class="steps__conclusion reveal">
        <BrandMark class="steps__conclusion-mark" />
        <div>
          <p v-if="blok.conclusion_label" class="eyebrow">{{ blok.conclusion_label }}</p>
          <p class="steps__conclusion-text">{{ blok.conclusion }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.steps__list {
  display: grid;
  gap: 1.5rem;
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
}

@media (min-width: 900px) {
  .steps__list { grid-template-columns: 1fr 1fr; }
}

.steps__list > li { display: flex; }

.steps__conclusion {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-top: 1.5rem;
  padding: clamp(2rem, 4vw, 3rem);
  border-radius: var(--radius);
  background: var(--brown);
  color: #fff;
  --section-accent: var(--yellow);
}

.steps__conclusion-mark {
  flex: none;
  width: clamp(64px, 9vw, 110px);
}

.steps__conclusion-mark :deep(path:last-child) { fill: #fff; }

.steps__conclusion-text {
  margin-top: 0.75rem;
  font-size: clamp(1.35rem, 2.6vw, 2rem);
  font-weight: 700;
  line-height: 1.3;
}
</style>
