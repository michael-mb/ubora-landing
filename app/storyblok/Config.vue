<script setup lang="ts">
// Story « config » : éditée dans Storyblok, consommée par le header et le footer (useSiteConfig).
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <main v-editable="blok" class="section theme-cream">
    <div class="container">
      <SectionHeading
        eyebrow="Configuration du site"
        title="Menu, contact et footer"
        intro="Cette story n'est pas une page publique : son contenu alimente le header et le footer de toutes les pages."
      />
    </div>
  </main>
</template>
