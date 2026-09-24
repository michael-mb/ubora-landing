<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const items = computed(() => toLines(props.blok.items))
const style = computed(() => props.blok.style || 'check')
</script>

<template>
  <div v-editable="blok" class="list-group" :class="`list-group--${style}`">
    <h3 v-if="blok.title" class="list-group__title">{{ blok.title }}</h3>

    <ul class="list-group__items">
      <li v-for="(item, i) in items" :key="i" class="list-group__item">
        <span v-if="style === 'number'" class="list-group__num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span v-else-if="style === 'check'" class="list-group__check"><BrandIcon name="check" /></span>
        <span v-else class="list-group__dot" aria-hidden="true" />
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list-group__title {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

.list-group__items { display: grid; gap: 0.9rem; }

.list-group__item {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
  font-size: 1.0625rem;
  font-weight: 500;
  line-height: 1.45;
}

.list-group--bullet .list-group__items {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 1rem;
}

.list-group--bullet .list-group__item {
  align-items: center;
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--card-border);
  border-radius: var(--radius-sm);
  background: var(--card-bg);
}

.list-group__dot {
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--yellow);
  transform: rotate(45deg);
}

.list-group__check {
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--yellow);
  color: var(--brown);
}

.list-group__check svg { width: 16px; height: 16px; stroke-width: 2.6; }

.list-group--check .list-group__items {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
  column-gap: 2.5rem;
}

.list-group--check .list-group__item {
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--card-border);
}

.list-group--number .list-group__items {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.list-group--number .list-group__item {
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--card-border);
  border-radius: var(--radius-sm);
  background: var(--card-bg);
  font-size: 1.1875rem;
  font-weight: 600;
}

.list-group__num {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  color: var(--section-accent);
}
</style>
