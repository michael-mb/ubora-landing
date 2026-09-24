<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const href = computed(() => linkHref(props.blok.link))
</script>

<template>
  <NuxtLink v-editable="blok" :to="href" :target="blok.link?.target" class="nav-link">
    {{ blok.label }}
  </NuxtLink>
</template>
