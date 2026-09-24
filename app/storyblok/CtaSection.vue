<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const items = computed(() => toLines(props.blok.items))
const subjects = computed(() => toLines(props.blok.form_subjects))
const { data: config } = useSiteConfig()
</script>

<template>
  <section :id="blok.anchor || undefined" v-editable="blok" class="cta section theme-dark">
    <BrandMark class="cta__mark" mono />

    <div class="container cta__grid">
      <div class="cta__content reveal">
        <SectionHeading :eyebrow="blok.eyebrow" :title="blok.title" />

        <template v-if="items.length">
          <p class="cta__intro">{{ blok.intro }}</p>
          <ul class="cta__chips">
            <li v-for="(item, i) in items" :key="i">{{ item }}</li>
          </ul>
        </template>

        <p v-if="blok.text" class="cta__text">{{ blok.text }}</p>
        <p v-if="blok.closing" class="cta__closing">{{ blok.closing }}</p>

        <ul class="cta__direct">
          <li v-if="config.phone">
            <BrandIcon name="phone" />
            <a :href="`tel:${config.phone.replace(/\s+/g, '')}`">{{ config.phone }}</a>
          </li>
          <li v-if="config.email">
            <BrandIcon name="mail" />
            <a :href="`mailto:${config.email}`">{{ config.email }}</a>
          </li>
          <li v-if="config.locations">
            <BrandIcon name="field" />
            <span>{{ config.locations }}</span>
          </li>
        </ul>
      </div>

      <ContactForm v-if="blok.show_form" class="reveal" :subjects="subjects" :email="config.email" />
    </div>
  </section>
</template>

<style scoped>
.cta__grid {
  display: grid;
  gap: 3rem 5rem;
  align-items: start;
}

@media (min-width: 980px) {
  .cta__grid { grid-template-columns: 1fr 1fr; }
}

.cta__intro {
  margin-top: 2rem;
  font-weight: 600;
  color: var(--section-muted);
}

.cta__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.9rem;
}

.cta__chips li {
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--card-border);
  border-radius: 999px;
  background: rgb(239 193 0 / 0.1);
  color: var(--yellow);
  font-weight: 600;
}

.cta__text {
  margin-top: 2rem;
  font-size: 1.125rem;
  color: var(--section-muted);
}

.cta__closing {
  margin-top: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
}

.cta__direct {
  display: grid;
  gap: 0.9rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgb(255 255 255 / 0.12);
}

.cta__direct li {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-weight: 500;
}

.cta__direct svg {
  width: 22px;
  height: 22px;
  color: var(--yellow);
}

.cta__direct a {
  text-decoration: none;
  transition: color 0.2s;
}

.cta__direct a:hover { color: var(--yellow); }

.cta__mark {
  position: absolute;
  z-index: -1;
  left: -12%;
  bottom: -30%;
  width: 640px;
  color: var(--gold);
  opacity: 0.14;
}
</style>
