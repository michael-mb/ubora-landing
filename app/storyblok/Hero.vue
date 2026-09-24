<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const missions = computed(() => toLines(props.blok.missions))
const { t } = useLocale()
</script>

<template>
  <section v-editable="blok" class="hero section theme-dark">
    <BrandMark class="hero__mark" mono />
    <div class="hero__glow" aria-hidden="true" />

    <div class="container hero__grid">
      <div class="hero__content">
        <h1 class="hero__title">{{ blok.title }}</h1>
        <p v-if="blok.subtitle" class="hero__subtitle">{{ blok.subtitle }}</p>
        <p v-if="blok.text" class="hero__text">{{ blok.text }}</p>

        <div v-if="blok.buttons?.length" class="hero__actions">
          <StoryblokComponent v-for="button in blok.buttons" :key="button._uid" :blok="button" />
        </div>
      </div>

      <aside v-if="missions.length" class="hero__missions" aria-labelledby="missions-title">
        <h2 id="missions-title" class="eyebrow">{{ blok.missions_title || t.missions }}</h2>
        <ol>
          <li v-for="(mission, i) in missions" :key="i">
            <span class="hero__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>{{ mission }}</span>
          </li>
        </ol>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: min(100svh, 980px);
  display: flex;
  align-items: center;
  padding-top: calc(var(--header-h) + clamp(3rem, 8vw, 6rem));
}

.hero__mark {
  position: absolute;
  z-index: -1;
  right: -8vw;
  bottom: -18%;
  width: min(62vw, 820px);
  color: var(--gold);
  opacity: 0.28;
}

.hero__glow {
  position: absolute;
  z-index: -1;
  top: -20%;
  left: -10%;
  width: 60vw;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(239 193 0 / 0.18), transparent 65%);
}

.hero__grid {
  display: grid;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;
}

@media (min-width: 980px) {
  .hero__grid { grid-template-columns: 1.35fr 1fr; }
}

.hero__title {
  font-size: clamp(2.6rem, 6.4vw, 5rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.02em;
}

.hero__subtitle {
  margin-top: 1.5rem;
  max-width: 34ch;
  font-size: clamp(1.25rem, 2.2vw, 1.6rem);
  font-weight: 500;
  line-height: 1.4;
  color: var(--yellow);
}

.hero__text {
  margin-top: 1.25rem;
  max-width: 60ch;
  color: var(--section-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem 1.1rem;
  margin-top: 2.5rem;
}

.hero__missions {
  padding: clamp(1.75rem, 3vw, 2.5rem);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  background: rgb(15 13 5 / 0.55);
  backdrop-filter: blur(14px);
}

.hero__missions ol { margin-top: 1.5rem; }

.hero__missions li {
  display: flex;
  gap: 1.1rem;
  align-items: baseline;
  padding-block: 1rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.4;
}

.hero__missions li + li { border-top: 1px solid rgb(255 255 255 / 0.1); }

.hero__num {
  flex: none;
  font-weight: 800;
  color: var(--yellow);
  font-variant-numeric: tabular-nums;
}
</style>
