<script setup lang="ts">
const props = defineProps<{ blok: Record<string, any> }>()
const items = computed(() => toLines(props.blok.items))
const { data: config } = useSiteConfig()
const { t } = useLocale()
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
      </div>

      <div class="cta__card reveal">
        <h3 class="cta__card-title">{{ t.contactCard.title }}</h3>
        <ul class="cta__direct">
          <li v-if="config.phone">
            <a :href="`tel:${config.phone.replace(/\s+/g, '')}`">
              <span class="cta__icon"><BrandIcon name="phone" /></span>
              <span>
                <span class="cta__label">{{ t.contactCard.phone }}</span>
                <span class="cta__value">{{ config.phone }}</span>
              </span>
            </a>
          </li>
          <li v-if="config.email">
            <a :href="`mailto:${config.email}`">
              <span class="cta__icon"><BrandIcon name="mail" /></span>
              <span>
                <span class="cta__label">{{ t.contactCard.email }}</span>
                <span class="cta__value">{{ config.email }}</span>
              </span>
            </a>
          </li>
          <li v-if="config.locations">
            <div>
              <span class="cta__icon"><BrandIcon name="field" /></span>
              <span>
                <span class="cta__label">{{ t.contactCard.locations }}</span>
                <span class="cta__value">{{ config.locations }}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
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

.cta__card {
  padding: clamp(1.75rem, 3.5vw, 2.75rem);
  border-radius: var(--radius);
  background: #fff;
  color: var(--ink);
  box-shadow: 0 30px 80px -30px rgb(0 0 0 / 0.6);
}

.cta__card-title {
  font-size: 1.625rem;
  font-weight: 800;
  color: var(--brown);
}

.cta__direct {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.cta__direct a,
.cta__direct div {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.1rem;
  border: 1.5px solid var(--line);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.cta__direct a:hover {
  border-color: var(--gold);
  box-shadow: 0 0 0 4px rgb(239 193 0 / 0.2);
  transform: translateY(-2px);
}

.cta__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--yellow);
  color: var(--brown);
}

.cta__icon svg { width: 22px; height: 22px; }

.cta__label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.cta__value {
  display: block;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--brown);
  overflow-wrap: anywhere;
}

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
