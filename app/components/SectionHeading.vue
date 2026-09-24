<script setup lang="ts">
const props = defineProps<{ eyebrow?: string, title?: string, intro?: string, center?: boolean }>()
const paragraphs = computed(() => toLines(props.intro))
</script>

<template>
  <header class="heading" :class="{ 'heading--center': center }">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <p v-for="(p, i) in paragraphs" :key="i" class="section-intro">{{ p }}</p>
    <slot />
  </header>
</template>

<style scoped>
.heading { max-width: 780px; }

.heading--center {
  margin-inline: auto;
  text-align: center;
}

.heading--center .section-intro { margin-inline: auto; }
</style>
