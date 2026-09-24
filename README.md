# UBORA CAPITAL PARTNER — site vitrine

Nuxt 4 + Storyblok. Le contenu vient de `docs/Michael.docx`, la charte (couleurs, police K2D, logo) de `docs/Ubora logo presentation.pdf`.

Tant que Storyblok n'est pas connecté, le site affiche le contenu local de `app/content/`. Il a exactement la même structure qu'une story Storyblok, donc passer de l'un à l'autre ne demande aucune modification de code.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

## Structure

```
app/
  pages/[...slug].vue   Route unique : /  → story « home », /a-propos → story « a-propos »…
  storyblok/            Un composant Vue par bloc Storyblok (enregistrés automatiquement)
  components/           Header, footer, formulaire, icônes, logo
  composables/useCms.ts Chargement Storyblok, avec repli sur le contenu local
  content/              Contenu local (home.json, config.json)
storyblok/components.mjs  Schéma de tous les blocs (source de vérité)
scripts/storyblok-setup.mjs  Crée les blocs et les stories dans Storyblok
public/brand/           Logos SVG extraits de la présentation, image Open Graph
```

### Blocs disponibles

| Bloc | Rôle |
|---|---|
| `page` | Type de contenu d'une page : sections + SEO |
| `config` | Story unique « config » : menu, bouton du header, contact, signature, footer |
| `hero` | Grand titre, texte, missions, boutons |
| `text-section` | Titre + paragraphes (thème clair / crème / sombre / jaune) |
| `feature-list` | Titre, intro, une ou plusieurs `list-group` (coches, numéros, puces), conclusion |
| `card-grid` | Grille de `card` avec icône |
| `steps` | Étapes (`step`) + encadré de conclusion |
| `cta-section` | Appel à l'action + formulaire de contact |
| `button`, `nav-link`, `list-group`, `card`, `step` | Éléments imbriqués |

Les champs « liste » sont des textarea, avec **un élément par ligne**, ce qui est plus simple à éditer pour le client.

## Connecter Storyblok

1. Créer un espace sur [app.storyblok.com](https://app.storyblok.com), région **EU**.
2. `cp .env.example .env`, puis remplir :
   - `NUXT_STORYBLOK_TOKEN` : *Settings → Access Tokens*, token **Preview**
   - `STORYBLOK_SPACE_ID` : *Settings → Space*
   - `STORYBLOK_PERSONAL_TOKEN` : *My account → Personal access tokens*
3. Créer les blocs et le contenu initial :
   ```bash
   npm run storyblok:setup -- --force
   ```
   `--force` remplace la story « Home » de démonstration créée par Storyblok. Sans `--force`, les stories existantes sont conservées ; seuls les schémas des blocs sont mis à jour.
   Les blocs de démo (`teaser`, `grid`, `feature`) peuvent ensuite être supprimés dans *Block Library*.
4. Éditeur visuel : Storyblok exige une URL en HTTPS.
   ```bash
   npm run dev:https    # https://localhost:3000 (certificat auto-signé à accepter une fois dans le navigateur)
   ```
   *Settings → Visual Editor → Location* : `https://localhost:3000/`
5. Redémarrer `npm run dev`. Le site lit maintenant Storyblok, et chaque bloc est cliquable dans l'éditeur visuel.

> Le token est lu **au build**. Après l'avoir ajouté ou modifié, il faut redémarrer le serveur de dev ou relancer le build.

### Ajouter une page

Dans Storyblok : *Content → Create new → Story*, type **Page**, slug `a-propos`, par exemple. Elle est servie sur `/a-propos` sans aucun changement de code. Pour l'ajouter au menu, il suffit d'ajouter un `nav-link` dans la story **config**.

### Ajouter un nouveau type de bloc

1. Le déclarer dans `storyblok/components.mjs`, avec un nom technique en kebab-case, par exemple `team-grid`.
2. Créer `app/storyblok/TeamGrid.vue` (recevoir `blok` en prop et mettre `v-editable="blok"` sur l'élément racine).
3. L'ajouter à `sectionPages` pour qu'il soit autorisé dans les pages.
4. `npm run storyblok:setup` pour pousser le schéma.

## Formulaire de contact

- Sans configuration, l'envoi ouvre le client mail du visiteur avec un message pré-rempli, adressé à l'e-mail de la story config.
- Pour un envoi direct, définir `NUXT_PUBLIC_CONTACT_FORM_ENDPOINT` avec un endpoint Formspree, Web3Forms, etc., qui accepte du JSON.

## Déploiement

Le site peut être déployé en SSR sur Vercel, Netlify ou n'importe quel hébergeur Node :

```bash
npm run build && node .output/server/index.mjs
```

En production, utiliser le token **Public** de Storyblok et `NUXT_PUBLIC_STORYBLOK_VERSION=published`. Pour un site 100 % statique (`npm run generate`), il faut ajouter un webhook Storyblok qui relance le build à chaque publication.

## À valider avec le client

- **E-mail et téléphone** : repris de la carte de visite (`uboracapital@info.com`, `+49 176 75892256`). L'adresse e-mail est à confirmer.
- **Nom de domaine** : `NUXT_PUBLIC_SITE_URL`, utilisé pour les balises canonical et Open Graph.
- **Mentions légales / Impressum et politique de confidentialité** : obligatoires pour une société basée en Allemagne. Elles pourront être créées comme pages Storyblok, puis liées dans le footer.
- Photos éventuelles : le design actuel repose uniquement sur la charte (formes du « U », couleurs), sans visuels.
