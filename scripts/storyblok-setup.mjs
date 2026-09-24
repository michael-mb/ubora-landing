#!/usr/bin/env node

import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { components, groups } from '../storyblok/components.mjs'

const SPACE_ID = process.env.STORYBLOK_SPACE_ID
const TOKEN = process.env.STORYBLOK_PERSONAL_TOKEN
const REGION = process.env.NUXT_STORYBLOK_REGION || 'eu'
const FORCE = process.argv.includes('--force')
const TRANSLATION_LANG = 'en'
const NOT_TRANSLATABLE = new Set(['anchor', 'phone', 'email', 'site_name'])
const TRANSLATABLE_TYPES = new Set(['text', 'textarea', 'richtext'])
const schemas = Object.fromEntries(components.map(c => [c.name, c.schema]))

const HOSTS = {
  eu: 'https://mapi.storyblok.com',
  us: 'https://api-us.storyblok.com',
  ca: 'https://api-ca.storyblok.com',
  ap: 'https://api-ap.storyblok.com',
  cn: 'https://app.storyblokchina.cn',
}

if (!SPACE_ID || !TOKEN) {
  console.error('✖ STORYBLOK_SPACE_ID et STORYBLOK_PERSONAL_TOKEN doivent être définis dans .env')
  process.exit(1)
}

const base = `${HOSTS[REGION] ?? HOSTS.eu}/v1/spaces/${SPACE_ID}`
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function api(method, path, body) {
  await sleep(350)
  const res = await fetch(`${base}${path}`, {
    method,
    headers: { 'Authorization': TOKEN, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401) {
    throw new Error('401 : STORYBLOK_PERSONAL_TOKEN refusé. Il faut un Personal Access Token (My account → Personal access tokens), pas le token Preview/Public de l\'espace.')
  }
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`)
  return res.status === 204 ? null : res.json()
}

function withUids(node) {
  if (Array.isArray(node)) return node.map(withUids)
  if (node && typeof node === 'object') {
    const copy = Object.fromEntries(Object.entries(node).map(([k, v]) => [k, withUids(v)]))
    if ('component' in copy) copy._uid = randomUUID()
    return copy
  }
  return node
}

function isTranslatable(key, field) {
  return TRANSLATABLE_TYPES.has(field.type) && !NOT_TRANSLATABLE.has(key)
}

function prepareSchema(schema) {
  return Object.fromEntries(Object.entries(schema).map(([key, field], pos) => [
    key,
    { ...field, pos, ...(isTranslatable(key, field) ? { translatable: true } : {}) },
  ]))
}

function withTranslations(node, translated) {
  if (Array.isArray(node)) {
    return node.map((item, i) => withTranslations(item, translated?.[i]?.component === item?.component ? translated[i] : undefined))
  }
  if (!node || typeof node !== 'object' || !('component' in node)) return node

  const schema = schemas[node.component] ?? {}
  const result = { ...node }
  for (const [key, field] of Object.entries(schema)) {
    if (field.type === 'bloks') result[key] = withTranslations(node[key], translated?.[key])
    else if (isTranslatable(key, field) && translated?.[key] !== undefined) {
      result[`${key}__i18n__${TRANSLATION_LANG}`] = translated[key]
    }
  }
  return result
}

async function readContent(locale, file) {
  return JSON.parse(await readFile(new URL(`../app/content/${locale}/${file}`, import.meta.url), 'utf8'))
}

async function checkLanguage() {
  const { space } = await api('GET', '')
  if (Array.isArray(space?.languages) && !space.languages.some(l => l.code === TRANSLATION_LANG)) {
    console.warn(`  ⚠ La langue « ${TRANSLATION_LANG} » n'est pas encore ajoutée dans Settings → Internationalization : les traductions ne seront pas servies tant qu'elle n'existe pas.`)
  }
}

async function setupGroups() {
  const { component_groups: existing } = await api('GET', '/component_groups')
  const uuids = {}
  for (const name of groups) {
    let group = existing.find(g => g.name === name)
    if (!group) {
      ;({ component_group: group } = await api('POST', '/component_groups', { component_group: { name } }))
      console.log(`  + groupe « ${name} »`)
    }
    uuids[name] = group.uuid
  }
  return uuids
}

async function setupComponents(groupUuids) {
  const { components: existing } = await api('GET', '/components')
  for (const { group, schema, ...definition } of components) {
    const payload = {
      component: {
        ...definition,
        schema: prepareSchema(schema),
        component_group_uuid: groupUuids[group],
      },
    }
    const current = existing.find(c => c.name === definition.name)
    if (current) {
      await api('PUT', `/components/${current.id}`, payload)
      console.log(`  ↻ ${definition.name}`)
    }
    else {
      await api('POST', '/components', payload)
      console.log(`  + ${definition.name}`)
    }
  }
}

async function setupStory({ name, slug, file, path }) {
  const translated = await readContent(TRANSLATION_LANG, file)
  const { stories } = await api('GET', `/stories?with_slug=${slug}`)
  const current = stories[0]

  if (current && !FORCE) {
    const { story: existing } = await api('GET', `/stories/${current.id}`)
    const content = withTranslations(existing.content, translated)
    await api('PUT', `/stories/${current.id}`, { story: { content }, force_update: 1 })
    console.log(`  ↻ « ${slug} » : traductions ${TRANSLATION_LANG.toUpperCase()} ajoutées (brouillon, à publier dans Storyblok)`)
    return
  }

  const content = withTranslations(withUids(await readContent('fr', file)), translated)
  const story = { name, slug, content, ...(path ? { path } : {}) }
  if (current) {
    await api('PUT', `/stories/${current.id}`, { story, publish: 1, force_update: 1 })
    console.log(`  ↻ story « ${slug} » remplacée et publiée`)
  }
  else {
    await api('POST', '/stories', { story, publish: 1 })
    console.log(`  + story « ${slug} » créée et publiée`)
  }
}

try {
  console.log(`Espace ${SPACE_ID} (${REGION})`)
  await checkLanguage()
  console.log('→ Groupes de blocs')
  const groupUuids = await setupGroups()
  console.log('→ Blocs')
  await setupComponents(groupUuids)
  console.log('→ Stories')
  await setupStory({ name: 'Accueil', slug: 'home', file: 'home.json', path: '/' })
  await setupStory({ name: 'Mentions légales', slug: 'mentions-legales', file: 'mentions-legales.json' })
  await setupStory({ name: 'Politique de confidentialité', slug: 'politique-de-confidentialite', file: 'politique-de-confidentialite.json' })
  await setupStory({ name: 'Configuration du site', slug: 'config', file: 'config.json' })
  console.log('✔ Terminé')
}
catch (error) {
  console.error(`✖ ${error.message}`)
  process.exit(1)
}
