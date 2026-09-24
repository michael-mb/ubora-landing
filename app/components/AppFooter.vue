<script setup lang="ts">
const { data: config } = useSiteConfig()
const { t, localePath } = useLocale()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p v-if="config.tagline" class="footer__tagline">{{ config.tagline }}</p>

      <div class="footer__grid">
        <div class="footer__brand">
          <img src="/brand/logo-light.svg" :alt="config.site_name" width="180" height="74">
          <p v-if="config.footer_text">{{ config.footer_text }}</p>
        </div>

        <nav :aria-label="t.footerMenu">
          <h2 class="footer__heading">{{ t.navigation }}</h2>
          <ul>
            <li v-for="item in config.navigation" :key="item._uid">
              <NuxtLink :to="localePath(linkHref(item.link))">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <h2 class="footer__heading">{{ t.contact }}</h2>
          <ul>
            <li v-if="config.phone"><a :href="`tel:${config.phone.replace(/\s+/g, '')}`">{{ config.phone }}</a></li>
            <li v-if="config.email"><a :href="`mailto:${config.email}`">{{ config.email }}</a></li>
            <li v-if="config.locations">{{ config.locations }}</li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ year }} {{ config.site_name }}. {{ t.rightsReserved }}</p>
        <nav v-if="config.legal_links?.length" :aria-label="t.legalInformation">
          <ul class="footer__legal">
            <li v-for="item in config.legal_links" :key="item._uid">
              <NuxtLink :to="localePath(linkHref(item.link))">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: clamp(3.5rem, 7vw, 5.5rem) 2rem;
  background: var(--black);
  color: rgb(255 255 255 / 0.72);
}

.footer__tagline {
  max-width: 24ch;
  padding-bottom: clamp(2.5rem, 5vw, 4rem);
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--yellow);
}

.footer__grid {
  display: grid;
  gap: 2.5rem;
  padding-block: clamp(2.5rem, 5vw, 4rem);
  border-top: 1px solid rgb(255 255 255 / 0.1);
}

@media (min-width: 800px) {
  .footer__grid { grid-template-columns: 2fr 1fr 1fr; }
}

.footer__brand img { width: 180px; height: auto; }
.footer__brand p { margin-top: 1.25rem; max-width: 40ch; }

.footer__heading {
  margin-bottom: 1rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
}

.footer ul { display: grid; gap: 0.6rem; }

.footer .footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

.footer a {
  text-decoration: none;
  transition: color 0.2s;
}

.footer a:hover { color: var(--yellow); }

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(255 255 255 / 0.1);
  font-size: 0.875rem;
  color: rgb(255 255 255 / 0.5);
}
</style>
