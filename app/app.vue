<script setup lang="ts">
const { data: config } = await useSiteConfig()

useHead({
  titleTemplate: title => (title ? title : config.value.site_name),
})
</script>

<template>
  <AppHeader />
  <NuxtPage />
  <AppFooter />
</template>
