<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
const { t } = useLocale()
</script>

<template>
  <main v-editable="blok" class="section theme-cream">
    <div class="container">
      <SectionHeading
        :eyebrow="t.configPreview.eyebrow"
        :title="t.configPreview.title"
        :intro="t.configPreview.intro"
      />
    </div>
  </main>
</template>
