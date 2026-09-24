<script setup lang="ts">
const { data: config } = await useSiteConfig()
const { locale } = useLocale()

useHead({
  htmlAttrs: { lang: locale },
  titleTemplate: title => (title ? title : config.value.site_name),
})
</script>

<template>
  <AppHeader />
  <NuxtPage />
  <AppFooter />
</template>
