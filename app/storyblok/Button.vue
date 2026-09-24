<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const { localePath } = useLocale()
const href = computed(() => localePath(linkHref(props.blok.link)))
</script>

<template>
  <NuxtLink
    v-editable="blok"
    :to="href"
    :target="blok.link?.target"
    class="btn"
    :class="`btn--${blok.variant || 'primary'}`"
  >
    {{ blok.label }}
    <BrandIcon v-if="(blok.variant || 'primary') === 'primary'" name="arrow" />
  </NuxtLink>
</template>
