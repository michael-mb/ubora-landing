<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <main v-editable="blok" id="contenu">
    <StoryblokComponent v-for="section in blok.body" :key="section._uid" :blok="section" />
  </main>
</template>
