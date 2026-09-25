# UBORA CAPITAL PARTNER — showcase website

Nuxt 4 + Storyblok. The copy comes from `docs/Michael.docx`, the brand guidelines (colours, K2D font, logo) from `docs/Ubora logo presentation.pdf`.

While Storyblok is not connected, the site renders the local content in `app/content/`. It has exactly the same shape as a Storyblok story, so switching from one to the other requires no code change.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Structure

```
app/
  pages/[...slug].vue   Single route: / → « home » story, /a-propos → « a-propos » story…
  storyblok/            One Vue component per Storyblok block (registered automatically)
  components/           Header, footer, form, icons, logo
  composables/useCms.ts Storyblok loading, with fallback to local content
  content/fr, content/en  Local content per language (home, legal pages, config)
  i18n/messages.ts      UI strings in FR / EN
server/middleware/editor.ts  /editor.html shortcut to the Storyblok editor
storyblok/components.mjs  Schema of every block (single source of truth)
scripts/storyblok-setup.mjs  Creates the blocks and stories in Storyblok
public/brand/           SVG logos extracted from the presentation, Open Graph image
```

### Available blocks

| Block | Purpose |
|---|---|
| `page` | Content type for a page: sections + SEO |
| `config` | Single « config » story: menu, header button, contact details, tagline, footer |
| `hero` | Main title, text, missions, buttons |
| `page-header` | Compact header for secondary pages |
| `rich-text` | Storyblok rich text (headings, lists, links), used for the legal pages |
| `text-section` | Title + paragraphs (light / cream / dark / yellow theme) |
| `feature-list` | Title, intro, one or more `list-group` (checkmarks, numbers, bullets), conclusion |
| `card-grid` | Grid of `card` with icon |
| `steps` | Steps (`step`) + conclusion box |
| `cta-section` | Call to action + contact form |
| `button`, `nav-link`, `list-group`, `card`, `step` | Nested elements |

« List » fields are textareas with **one item per line**, which is easier for the client to edit.

## Connecting Storyblok

1. Create a space on [app.storyblok.com](https://app.storyblok.com), **EU** region.
2. `cp .env.example .env`, then fill in:
   - `NUXT_STORYBLOK_TOKEN`: *Settings → Access Tokens*, **Preview** token
   - `STORYBLOK_SPACE_ID`: *Settings → Space* (without the leading `#`)
   - `STORYBLOK_PERSONAL_TOKEN`: *My account → Personal access tokens*
3. Create the blocks and the initial content:
   ```bash
   npm run storyblok:setup -- --force
   ```
   `--force` replaces the demo « Home » story created by Storyblok. Without `--force`, existing stories are kept and only their English translations are added (see below).
   The demo blocks (`teaser`, `grid`, `feature`) can then be deleted in *Block Library*.
4. Visual Editor: Storyblok requires an HTTPS URL.
   ```bash
   npm run dev:https    # https://localhost:3000 (self-signed certificate, accept it once in the browser)
   ```
   *Settings → Visual Editor → Location*: `https://localhost:3000/`
5. Restart `npm run dev`. The site now reads from Storyblok, and every block is clickable in the Visual Editor.

> The token is read **at build time**. After adding or changing it, restart the dev server or rebuild.

### Opening a page in the editor

Append `/editor.html` to any page URL to open that page in the Storyblok editor:
`/editor.html` → home, `/mentions-legales/editor.html` → legal notice, `/en/…/editor.html` also works. If the page is not found, you land on the list of stories.

### English translation

The site is bilingual: `/` in French, `/en` in English, with an FR / EN switcher in the header.

- **Content**: field-level translation in Storyblok (one story per page). Text fields are translatable; anchors, email and phone are shared between languages.
- **UI strings** (form, footer, menu, 404 page): `app/i18n/messages.ts`.
- **Local content** (without Storyblok): `app/content/fr/` and `app/content/en/`.
- Internal links are automatically prefixed with `/en` on the English version.

Enabling English in Storyblok:
1. *Settings → Internationalization → Add language*: English, code **`en`**.
2. `npm run storyblok:setup` (without `--force`): adds the English translations to existing stories without touching the French content. They are saved as drafts.
3. Review and publish each story in Storyblok. In the editor, the language switcher at the top lets you move to the English version.

### Adding a page

In Storyblok: *Content → Create new → Story*, type **Page**, slug `a-propos` for example. It is served at `/a-propos` with no code change. To add it to the menu, add a `nav-link` to the **config** story.

### Adding a new block type

1. Declare it in `storyblok/components.mjs` with a kebab-case technical name, e.g. `team-grid`.
2. Create `app/storyblok/TeamGrid.vue` (take `blok` as a prop and put `v-editable="blok"` on the root element).
3. Add it to `sectionPages` so it is allowed in pages.
4. Run `npm run storyblok:setup` to push the schema.

## Contact form

Submissions are posted to `server/api/contact.post.ts`, which sends an email through [Brevo](https://www.brevo.com) (free plan: 300 emails/day, EU-based). Replying to the email answers the visitor directly.

1. Create a free Brevo account.
2. *Senders, domains & dedicated IPs → Senders*: add and verify `ubora.cp@outlook.de` (Brevo sends a confirmation email).
3. *SMTP & API → API keys*: create a key.
4. Set the environment variables (in `.env` locally, in Vercel for production):
   - `NUXT_BREVO_API_KEY`: the API key
   - `NUXT_CONTACT_TO`: recipient (default `ubora.cp@outlook.de`)
   - `NUXT_CONTACT_FROM`: verified sender (default: same as the recipient)

Without an API key, the form falls back to opening the visitor's mail client with a prefilled message.

## Deployment

The site runs as SSR on Vercel, Netlify or any Node host:

```bash
npm run build && node .output/server/index.mjs
```

On **Vercel**, import the GitHub repository (Nuxt is detected automatically) and set these environment variables:

| Variable | Production | Preview (optional, for the Visual Editor) |
|---|---|---|
| `NUXT_STORYBLOK_TOKEN` | **Public** token | **Preview** token |
| `NUXT_STORYBLOK_REGION` | `eu` | `eu` |
| `NUXT_PUBLIC_STORYBLOK_VERSION` | `published` | `draft` |
| `NUXT_PUBLIC_SITE_URL` | site URL | — |
| `NUXT_BREVO_API_KEY` | Brevo API key | Brevo API key |

Never deploy `STORYBLOK_PERSONAL_TOKEN`: it is only used by the local setup script. Published content appears without redeploying; changing an environment variable requires a redeploy.

For a fully static site (`npm run generate`), add a Storyblok webhook that triggers a rebuild on every publish.

## To confirm with the client

- **Email and phone**: taken from the business card (`ubora.cp@outlook.de`, `+49 176 75892256`). The email address needs to be confirmed.
- **Domain name**: `NUXT_PUBLIC_SITE_URL`, used for canonical and Open Graph tags.
- **Legal notice and privacy policy** (`/mentions-legales`, `/politique-de-confidentialite`): the fields marked `[À COMPLÉTER : …]` / `[TO BE COMPLETED: …]` must be filled in (legal form, address, register, VAT, hosting provider, supervisory authority…). These texts are templates and must be reviewed by a lawyer. For a German company, a German version of the Impressum is recommended.
- **English copy**: written by the developer, to be proofread by the client.
- Photos, if any: the current design relies only on the brand guidelines (« U » shapes, colours), without imagery.
