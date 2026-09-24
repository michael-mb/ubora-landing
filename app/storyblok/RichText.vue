<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <section :id="blok.anchor || undefined" v-editable="blok" class="section theme-light">
    <div class="container">
      <div class="prose">
        <StoryblokRichText :document="blok.content" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.prose {
  max-width: 760px;
  color: var(--ink-muted);
}

.prose :deep(h2) {
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
  font-size: 1.5rem;
  color: var(--ink);
}

.prose :deep(h2:first-child) {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}

.prose :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  color: var(--ink);
}

.prose :deep(p) { margin-bottom: 1rem; }
.prose :deep(strong) { color: var(--ink); font-weight: 700; }

.prose :deep(ul) {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  list-style: none;
}

.prose :deep(li) { position: relative; }
.prose :deep(li p) { margin: 0; }

.prose :deep(li)::before {
  content: '';
  position: absolute;
  left: -1.25rem;
  top: 0.65em;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--yellow);
  transform: rotate(45deg);
}

.prose :deep(a) {
  color: var(--brown);
  font-weight: 600;
  text-decoration-color: var(--yellow);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
</style>
