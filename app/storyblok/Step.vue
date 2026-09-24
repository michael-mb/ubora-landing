<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any>, index?: number }>()
const items = computed(() => toLines(props.blok.items))
</script>

<template>
  <article v-editable="blok" class="step">
    <div class="step__head">
      <span v-if="blok.icon" class="step__icon"><BrandIcon :name="blok.icon" /></span>
      <span v-if="index" class="step__num">{{ String(index).padStart(2, '0') }}</span>
    </div>

    <h3 class="step__title">{{ blok.title }}</h3>
    <p v-if="blok.intro" class="step__intro">{{ blok.intro }}</p>

    <ul class="step__items">
      <li v-for="(item, i) in items" :key="i">
        <BrandIcon name="check" />
        <span>{{ item }}</span>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.step {
  flex: 1;
  padding: clamp(1.75rem, 3.5vw, 2.75rem);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  background: var(--card-bg);
}

.step__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.step__icon {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: var(--yellow);
  color: var(--brown);
}

.step__icon svg { width: 30px; height: 30px; }

.step__num {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--gold);
}

.step__title {
  font-size: 1.625rem;
  font-weight: 800;
}

.step__intro {
  margin-top: 0.5rem;
  color: var(--section-muted);
  font-weight: 500;
}

.step__items {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.step__items li {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  line-height: 1.45;
}

.step__items svg {
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 0.1rem;
  color: var(--gold);
  stroke-width: 2.6;
}
</style>
