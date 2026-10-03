<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const initials = computed(() => initialsOf(props.blok.name))
const photo = computed(() => personPhoto(props.blok.photo, 400, 500))
</script>

<template>
  <article v-editable="blok" class="member">
    <div class="member__picture">
      <img
        v-if="photo"
        :src="photo.src"
        :srcset="photo.srcset"
        :alt="blok.photo?.alt || blok.name"
        width="400"
        height="500"
        loading="lazy"
        decoding="async"
      >
      <div v-else class="member__placeholder" aria-hidden="true">
        <BrandMark class="member__mark" mono />
        <span>{{ initials }}</span>
      </div>
    </div>
    <div class="member__body">
      <h3 class="member__name">{{ blok.name }}</h3>
      <p v-if="blok.role" class="member__role">{{ blok.role }}</p>
    </div>
  </article>
</template>

<style scoped>
.member {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  background: var(--card-bg);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.member:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.member__picture {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--brown);
}

.member__picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.member:hover .member__picture img { transform: scale(1.04); }

.member__placeholder {
  position: relative;
  display: grid;
  place-items: center;
  height: 100%;
  background: linear-gradient(160deg, var(--brown) 0%, #211b02 100%);
  color: var(--yellow);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: 0.04em;
}

.member__mark {
  position: absolute;
  right: -18%;
  bottom: -12%;
  width: 85%;
  color: var(--gold);
  opacity: 0.25;
}

.member__placeholder span { position: relative; }

.member__body {
  padding: 1.25rem 1.5rem 1.5rem;
  border-top: 3px solid var(--yellow);
}

.member__name {
  font-size: 1.1875rem;
  font-weight: 700;
}

.member__role {
  margin-top: 0.25rem;
  color: var(--section-muted);
}

@media (max-width: 559px) {
  .member__body { padding: 0.9rem 1rem 1.1rem; }
  .member__name { font-size: 1rem; }
  .member__role { font-size: 0.875rem; }
}
</style>
