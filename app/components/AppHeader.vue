<script setup lang="ts">
const { data: config } = useSiteConfig()
const route = useRoute()

const open = ref(false)
const scrolled = ref(false)

watch(() => route.fullPath, () => { open.value = false })

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'header--solid': scrolled || open, 'header--open': open }">
    <a class="visually-hidden" href="#contenu">Aller au contenu</a>

    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo" :aria-label="`${config.site_name} — accueil`">
        <img src="/brand/logo-light.svg" alt="" width="146" height="60">
      </NuxtLink>

      <button
        class="header__toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="menu-principal"
        @click="open = !open"
      >
        <span class="visually-hidden">{{ open ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
        <span class="header__burger" :class="{ 'is-open': open }" aria-hidden="true" />
      </button>

      <nav id="menu-principal" class="header__nav" :class="{ 'is-open': open }" aria-label="Menu principal">
        <StoryblokComponent v-for="item in config.navigation" :key="item._uid" :blok="item" @click="open = false" />
        <StoryblokComponent v-for="cta in config.header_cta" :key="cta._uid" :blok="cta" class="header__cta" @click="open = false" />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  z-index: 50;
  inset: 0 0 auto;
  height: var(--header-h);
  color: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.header--solid {
  background: rgb(15 13 5 / 0.88);
  backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 rgb(239 193 0 / 0.15);
}

/* backdrop-filter crée un bloc conteneur qui casse le rendu du menu mobile en position fixed */
.header--open {
  background: var(--night);
  backdrop-filter: none;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.header__logo img { width: auto; height: 46px; }

.header__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header__nav :deep(.nav-link) {
  position: relative;
  font-weight: 600;
  font-size: 0.975rem;
  text-decoration: none;
  color: rgb(255 255 255 / 0.85);
  transition: color 0.2s;
}

.header__nav :deep(.nav-link)::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  background: var(--yellow);
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.header__nav :deep(.nav-link:hover) { color: #fff; }
.header__nav :deep(.nav-link:hover)::after { transform: scaleX(1); }

.header__nav :deep(.btn) { min-height: 44px; padding: 0.6rem 1.3rem; }

.header__toggle {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
}

.header__burger,
.header__burger::before,
.header__burger::after {
  display: block;
  width: 24px;
  height: 2px;
  margin-inline: auto;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.25s ease, background-color 0.25s ease;
}

.header__burger { position: relative; }
.header__burger::before,
.header__burger::after { content: ''; position: absolute; left: 0; }
.header__burger::before { top: -7px; }
.header__burger::after { top: 7px; }
.header__burger.is-open { background: transparent; }
.header__burger.is-open::before { transform: translateY(7px) rotate(45deg); }
.header__burger.is-open::after { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 1023px) {
  .header__toggle { display: block; }

  .header__nav {
    position: fixed;
    inset: var(--header-h) 0 auto;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 1rem 1.25rem 2rem;
    background: var(--night);
    border-top: 1px solid rgb(239 193 0 / 0.15);
    transform: translateY(-8px);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
  }

  .header__nav.is-open {
    transform: none;
    opacity: 1;
    visibility: visible;
  }

  .header__nav :deep(.nav-link) {
    padding: 1rem 0.25rem;
    border-bottom: 1px solid rgb(255 255 255 / 0.08);
    font-size: 1.125rem;
  }

  .header__nav :deep(.nav-link)::after { display: none; }
  .header__nav :deep(.btn) { margin-top: 1.5rem; }
}
</style>
