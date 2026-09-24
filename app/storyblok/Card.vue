<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <article v-editable="blok" class="card">
    <span v-if="blok.icon" class="card__icon"><BrandIcon :name="blok.icon" /></span>
    <h3 class="card__title">{{ blok.title }}</h3>
    <p v-if="blok.text" class="card__text">{{ blok.text }}</p>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 2rem 1.75rem;
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  background: var(--card-bg);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.card::after {
  content: '';
  position: absolute;
  left: 1.75rem;
  right: 1.75rem;
  bottom: -1px;
  height: 3px;
  border-radius: 3px;
  background: var(--yellow);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.card:hover::after { transform: scaleX(1); }

.card__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 0.5rem;
  border-radius: 16px;
  background: var(--icon-bg);
  color: var(--icon-fg);
}

.card__icon svg { width: 28px; height: 28px; }

.card__title {
  font-size: 1.25rem;
  font-weight: 700;
}

.card__text { color: var(--section-muted); }
</style>
