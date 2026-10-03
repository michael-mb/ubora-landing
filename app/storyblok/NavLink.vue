<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const route = useRoute()
const { localePath } = useLocale()
const href = computed(() => localePath(linkHref(props.blok.link)))

const isActive = computed(() => {
  if (!href.value.startsWith('/') || href.value.includes('#')) return false
  const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
  return normalize(href.value.split('?')[0]!) === normalize(route.path)
})
</script>

<template>
  <NuxtLink
    v-editable="blok"
    :to="href"
    :target="blok.link?.target"
    class="nav-link"
    :class="{ 'is-active': isActive }"
    :aria-current="isActive ? 'page' : undefined"
  >
    {{ blok.label }}
  </NuxtLink>
</template>
