
const themeField = {
  type: 'option',
  display_name: 'Thème',
  default_value: 'light',
  options: [
    { name: 'Clair', value: 'light' },
    { name: 'Crème', value: 'cream' },
    { name: 'Sombre', value: 'dark' },
    { name: 'Jaune', value: 'yellow' },
  ],
}

const anchorField = {
  type: 'text',
  display_name: 'Ancre (id)',
  description: 'Identifiant utilisé dans les liens du menu, ex. « approche » pour #approche',
}

const iconField = {
  type: 'option',
  display_name: 'Icône',
  options: [
    'pharmacy', 'laboratory', 'health-center', 'clinic',
    'expertise', 'field', 'network', 'long-term',
    'capital', 'support', 'check',
  ].map(value => ({ name: value, value })),
}

const sectionPages = ['hero', 'page-header', 'text-section', 'rich-text', 'feature-list', 'card-grid', 'steps', 'cta-section']

export const groups = ['Pages', 'Sections', 'Éléments']

export const components = [
  {
    name: 'page',
    display_name: 'Page',
    group: 'Pages',
    is_root: true,
    is_nestable: false,
    schema: {
      body: { type: 'bloks', display_name: 'Sections', restrict_components: true, component_whitelist: sectionPages },
      seo_title: { type: 'text', display_name: 'Titre SEO' },
      seo_description: { type: 'textarea', display_name: 'Description SEO' },
    },
  },
  {
    name: 'config',
    display_name: 'Configuration du site',
    group: 'Pages',
    is_root: true,
    is_nestable: false,
    schema: {
      site_name: { type: 'text', display_name: 'Nom du site' },
      navigation: { type: 'bloks', display_name: 'Menu', restrict_components: true, component_whitelist: ['nav-link'] },
      header_cta: { type: 'bloks', display_name: 'Bouton du header', maximum: 1, restrict_components: true, component_whitelist: ['button'] },
      tagline: { type: 'textarea', display_name: 'Signature institutionnelle' },
      footer_text: { type: 'textarea', display_name: 'Texte du footer' },
      legal_links: { type: 'bloks', display_name: 'Liens légaux (footer)', restrict_components: true, component_whitelist: ['nav-link'] },
      locations: { type: 'text', display_name: 'Implantations' },
      phone: { type: 'text', display_name: 'Téléphone' },
      email: { type: 'text', display_name: 'E-mail' },
    },
  },

  {
    name: 'hero',
    display_name: 'Hero',
    group: 'Sections',
    is_nestable: true,
    schema: {
      title: { type: 'text', display_name: 'Titre' },
      subtitle: { type: 'textarea', display_name: 'Sous-titre' },
      text: { type: 'textarea', display_name: 'Texte' },
      missions_title: { type: 'text', display_name: 'Titre des missions' },
      missions: { type: 'textarea', display_name: 'Missions (une par ligne)' },
      buttons: { type: 'bloks', display_name: 'Boutons', restrict_components: true, component_whitelist: ['button'] },
    },
  },
  {
    name: 'page-header',
    display_name: 'En-tête de page',
    group: 'Sections',
    is_nestable: true,
    schema: {
      eyebrow: { type: 'text', display_name: 'Sur-titre' },
      title: { type: 'text', display_name: 'Titre' },
      intro: { type: 'textarea', display_name: 'Introduction' },
    },
  },
  {
    name: 'rich-text',
    display_name: 'Texte riche',
    group: 'Sections',
    is_nestable: true,
    schema: {
      anchor: anchorField,
      content: { type: 'richtext', display_name: 'Contenu' },
    },
  },
  {
    name: 'text-section',
    display_name: 'Section texte',
    group: 'Sections',
    is_nestable: true,
    schema: {
      anchor: anchorField,
      eyebrow: { type: 'text', display_name: 'Sur-titre' },
      title: { type: 'text', display_name: 'Titre' },
      text: { type: 'textarea', display_name: 'Texte (un paragraphe par ligne)' },
      theme: themeField,
    },
  },
  {
    name: 'feature-list',
    display_name: 'Section listes',
    group: 'Sections',
    is_nestable: true,
    schema: {
      anchor: anchorField,
      eyebrow: { type: 'text', display_name: 'Sur-titre' },
      title: { type: 'text', display_name: 'Titre' },
      intro: { type: 'textarea', display_name: 'Introduction' },
      lists: { type: 'bloks', display_name: 'Listes', restrict_components: true, component_whitelist: ['list-group'] },
      outro: { type: 'textarea', display_name: 'Conclusion' },
      theme: themeField,
    },
  },
  {
    name: 'card-grid',
    display_name: 'Grille de cartes',
    group: 'Sections',
    is_nestable: true,
    schema: {
      anchor: anchorField,
      eyebrow: { type: 'text', display_name: 'Sur-titre' },
      title: { type: 'text', display_name: 'Titre' },
      intro: { type: 'textarea', display_name: 'Introduction' },
      cards_title: { type: 'text', display_name: 'Titre au-dessus des cartes' },
      cards: { type: 'bloks', display_name: 'Cartes', restrict_components: true, component_whitelist: ['card'] },
      theme: themeField,
    },
  },
  {
    name: 'steps',
    display_name: 'Étapes',
    group: 'Sections',
    is_nestable: true,
    schema: {
      anchor: anchorField,
      eyebrow: { type: 'text', display_name: 'Sur-titre' },
      title: { type: 'text', display_name: 'Titre' },
      intro: { type: 'textarea', display_name: 'Introduction' },
      steps: { type: 'bloks', display_name: 'Étapes', restrict_components: true, component_whitelist: ['step'] },
      conclusion_label: { type: 'text', display_name: 'Label de conclusion' },
      conclusion: { type: 'textarea', display_name: 'Conclusion' },
      theme: themeField,
    },
  },
  {
    name: 'cta-section',
    display_name: 'Appel à l’action / Contact',
    group: 'Sections',
    is_nestable: true,
    schema: {
      anchor: anchorField,
      eyebrow: { type: 'text', display_name: 'Sur-titre' },
      title: { type: 'text', display_name: 'Titre' },
      intro: { type: 'text', display_name: 'Introduction de la liste' },
      items: { type: 'textarea', display_name: 'Liste (un élément par ligne)' },
      text: { type: 'textarea', display_name: 'Texte' },
      closing: { type: 'text', display_name: 'Phrase de clôture' },
    },
  },

  {
    name: 'button',
    display_name: 'Bouton',
    group: 'Éléments',
    is_nestable: true,
    schema: {
      label: { type: 'text', display_name: 'Libellé' },
      link: { type: 'multilink', display_name: 'Lien' },
      variant: {
        type: 'option',
        display_name: 'Style',
        default_value: 'primary',
        options: [
          { name: 'Principal (jaune)', value: 'primary' },
          { name: 'Secondaire (contour)', value: 'secondary' },
          { name: 'Discret (lien)', value: 'ghost' },
        ],
      },
    },
  },
  {
    name: 'nav-link',
    display_name: 'Lien de menu',
    group: 'Éléments',
    is_nestable: true,
    schema: {
      label: { type: 'text', display_name: 'Libellé' },
      link: { type: 'multilink', display_name: 'Lien' },
    },
  },
  {
    name: 'list-group',
    display_name: 'Liste',
    group: 'Éléments',
    is_nestable: true,
    schema: {
      title: { type: 'text', display_name: 'Titre' },
      items: { type: 'textarea', display_name: 'Éléments (un par ligne)' },
      style: {
        type: 'option',
        display_name: 'Style',
        default_value: 'check',
        options: [
          { name: 'Coches', value: 'check' },
          { name: 'Numéros', value: 'number' },
          { name: 'Puces', value: 'bullet' },
        ],
      },
    },
  },
  {
    name: 'card',
    display_name: 'Carte',
    group: 'Éléments',
    is_nestable: true,
    schema: {
      icon: iconField,
      title: { type: 'text', display_name: 'Titre' },
      text: { type: 'textarea', display_name: 'Texte' },
    },
  },
  {
    name: 'step',
    display_name: 'Étape',
    group: 'Éléments',
    is_nestable: true,
    schema: {
      icon: iconField,
      title: { type: 'text', display_name: 'Titre' },
      intro: { type: 'text', display_name: 'Introduction' },
      items: { type: 'textarea', display_name: 'Éléments (un par ligne)' },
    },
  },
]
