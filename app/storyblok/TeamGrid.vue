<script setup lang="ts">
defineProps<{ blok: Record<string, any> }>()
</script>

<template>
  <section
    :id="blok.anchor || undefined"
    v-editable="blok"
    class="team section"
    :class="`theme-${blok.theme || 'light'}`"
  >
    <div class="container">
      <SectionHeading class="reveal" :eyebrow="blok.eyebrow" :title="blok.title" :intro="blok.intro" />

      <ul class="team__grid">
        <li v-for="member in blok.members" :key="member._uid" class="reveal">
          <StoryblokComponent :blok="member" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.team__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(0.9rem, 2.5vw, 2rem);
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
}

@media (min-width: 900px) {
  .team__grid { grid-template-columns: repeat(3, 1fr); }
}

.team__grid > li { display: flex; }
</style>
