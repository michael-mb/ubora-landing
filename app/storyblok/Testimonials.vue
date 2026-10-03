<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
const { t } = useLocale()

const track = ref<HTMLElement>()
const atStart = ref(true)
const atEnd = ref(false)

function updateEdges() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

function scrollByCard(direction: 1 | -1) {
  const el = track.value
  const card = el?.querySelector<HTMLElement>(':scope > *')
  if (!el || !card) return
  const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
  el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' })
}

onMounted(() => {
  updateEdges()
  window.addEventListener('resize', updateEdges, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('resize', updateEdges))
</script>

<template>
  <section
    :id="blok.anchor || undefined"
    v-editable="blok"
    class="testimonials section"
    :class="`theme-${blok.theme || 'cream'}`"
  >
    <div class="container">
      <div class="testimonials__head reveal">
        <SectionHeading :eyebrow="blok.eyebrow" :title="blok.title" :intro="blok.intro" />

        <div v-if="blok.items?.length > 1" class="testimonials__nav">
          <button type="button" :aria-label="t.testimonials.previous" :disabled="atStart" @click="scrollByCard(-1)">
            <BrandIcon name="arrow" class="testimonials__prev" />
          </button>
          <button type="button" :aria-label="t.testimonials.next" :disabled="atEnd" @click="scrollByCard(1)">
            <BrandIcon name="arrow" />
          </button>
        </div>
      </div>
    </div>

    <div
      ref="track"
      class="testimonials__track"
      role="region"
      :aria-label="blok.title || t.testimonials.region"
      tabindex="0"
      @scroll.passive="updateEdges"
    >
      <StoryblokComponent v-for="item in blok.items" :key="item._uid" :blok="item" />
    </div>
  </section>
</template>

<style scoped>
.testimonials__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.testimonials__nav {
  display: flex;
  gap: 0.75rem;
}

.testimonials__nav button {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1.5px solid var(--card-border);
  border-radius: 50%;
  background: var(--card-bg);
  color: var(--section-fg);
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s;
}

.testimonials__nav button:hover:not(:disabled) {
  background: var(--yellow);
  border-color: var(--yellow);
  color: var(--brown);
}

.testimonials__nav button:disabled {
  opacity: 0.35;
  cursor: default;
}

.testimonials__nav svg { width: 22px; height: 22px; }
.testimonials__prev { transform: rotate(180deg); }

.testimonials__track {
  --edge: max(1.25rem, calc((100vw - var(--container)) / 2));
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(86vw, 420px);
  gap: 1.25rem;
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  padding: 0.5rem var(--edge) 1.5rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--edge);
  scrollbar-width: thin;
  scrollbar-color: var(--gold) transparent;
}

.testimonials__track > :deep(*) { scroll-snap-align: start; }

.testimonials__track:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: -3px;
}
</style>
