<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const paragraphs = computed(() => toLines(props.blok.quote))
const initials = computed(() =>
  String(props.blok.name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join(''),
)

const photo = computed(() => {
  const url: string | undefined = props.blok.photo?.filename
  if (!url) return undefined
  const resizable = url.includes('storyblok.com') && !url.endsWith('.svg')
  return {
    src: resizable ? `${url}/m/120x120/smart` : url,
    srcset: resizable ? `${url}/m/120x120/smart 1x, ${url}/m/240x240/smart 2x` : undefined,
  }
})
</script>

<template>
  <figure v-editable="blok" class="testimonial">
    <span class="testimonial__mark" aria-hidden="true">“</span>
    <blockquote class="testimonial__quote">
      <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
    </blockquote>
    <figcaption class="testimonial__author">
      <img
        v-if="photo"
        class="testimonial__avatar testimonial__avatar--photo"
        :src="photo.src"
        :srcset="photo.srcset"
        alt=""
        width="60"
        height="60"
        loading="lazy"
        decoding="async"
      >
      <span v-else class="testimonial__avatar" aria-hidden="true">{{ initials }}</span>
      <span>
        <span class="testimonial__name">{{ blok.name }}</span>
        <span v-if="blok.role" class="testimonial__role">{{ blok.role }}</span>
      </span>
    </figcaption>
  </figure>
</template>

<style scoped>
.testimonial {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: clamp(1.75rem, 3vw, 2.25rem);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  background: var(--card-bg);
}

.testimonial__mark {
  height: 3.25rem;
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--yellow);
}

.testimonial__quote {
  flex: 1;
  display: grid;
  gap: 0.9rem;
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.6;
}

.testimonial__author {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--card-border);
}

.testimonial__avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--brown);
  color: var(--yellow);
  font-weight: 800;
  letter-spacing: 0.04em;
}

.testimonial__avatar--photo {
  object-fit: cover;
  box-shadow: 0 0 0 3px var(--yellow);
}

.testimonial__name {
  display: block;
  font-weight: 700;
  font-size: 1.0625rem;
}

.testimonial__role {
  display: block;
  font-size: 0.9375rem;
  color: var(--section-muted);
}
</style>
