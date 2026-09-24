#!/usr/bin/env node
// Initialise un espace Storyblok via la Management API :
//   1. crée / met à jour les blocs définis dans storyblok/components.mjs
//   2. crée les stories « home » et « config » à partir du contenu local (app/content)
//
// Usage :  npm run storyblok:setup            (n'écrase pas les stories existantes)
//          npm run storyblok:setup -- --force (remplace le contenu de home et config)
//
// Variables requises dans .env : STORYBLOK_SPACE_ID, STORYBLOK_PERSONAL_TOKEN (+ NUXT_STORYBLOK_REGION)

import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { components, groups } from '../storyblok/components.mjs'

const SPACE_ID = process.env.STORYBLOK_SPACE_ID
const TOKEN = process.env.STORYBLOK_PERSONAL_TOKEN
const REGION = process.env.NUXT_STORYBLOK_REGION || 'eu'
const FORCE = process.argv.includes('--force')

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
  await sleep(350) // limite de débit de la Management API
  const res = await fetch(`${base}${path}`, {
    method,
    headers: { 'Authorization': TOKEN, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`)
  return res.status === 204 ? null : res.json()
}

/** Storyblok attend un _uid unique par bloc. */
function withUids(node) {
  if (Array.isArray(node)) return node.map(withUids)
  if (node && typeof node === 'object') {
    const copy = Object.fromEntries(Object.entries(node).map(([k, v]) => [k, withUids(v)]))
    if ('component' in copy) copy._uid = randomUUID()
    return copy
  }
  return node
}

/** Ajoute `pos` aux champs pour conserver l'ordre dans l'éditeur. */
function withPositions(schema) {
  return Object.fromEntries(Object.entries(schema).map(([key, field], pos) => [key, { ...field, pos }]))
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
        schema: withPositions(schema),
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
  const content = withUids(JSON.parse(await readFile(new URL(`../app/content/${file}`, import.meta.url), 'utf8')))
  const { stories } = await api('GET', `/stories?with_slug=${slug}`)
  const current = stories[0]

  if (current && !FORCE) {
    console.log(`  = « ${slug} » existe déjà (relancer avec --force pour l'écraser)`)
    return
  }

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
  console.log('→ Groupes de blocs')
  const groupUuids = await setupGroups()
  console.log('→ Blocs')
  await setupComponents(groupUuids)
  console.log('→ Stories')
  await setupStory({ name: 'Accueil', slug: 'home', file: 'home.json', path: '/' })
  await setupStory({ name: 'Configuration du site', slug: 'config', file: 'config.json' })
  console.log('✔ Terminé')
}
catch (error) {
  console.error(`✖ ${error.message}`)
  process.exit(1)
}
