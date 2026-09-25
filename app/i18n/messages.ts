export const locales = ['fr', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'fr'

export const messages = {
  fr: {
    languageName: 'Français',
    ogLocale: 'fr_FR',
    skipToContent: 'Aller au contenu',
    home: 'accueil',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    mainMenu: 'Menu principal',
    languageSwitch: 'Choix de la langue',
    footerMenu: 'Menu du pied de page',
    navigation: 'Navigation',
    contact: 'Contact',
    legalInformation: 'Informations légales',
    rightsReserved: 'Tous droits réservés.',
    missions: 'Nos missions',
    pageNotFound: 'Page introuvable',
    error: {
      label: 'Erreur',
      notFoundTitle: 'Cette page est introuvable.',
      notFoundText: 'La page que vous cherchez a peut-être été déplacée ou n’existe plus.',
      genericTitle: 'Une erreur est survenue.',
      genericText: 'Merci de réessayer dans quelques instants.',
      backHome: 'Retour à l’accueil',
    },
    contactCard: {
      title: 'Nous contacter',
      phone: 'Téléphone',
      email: 'E-mail',
      locations: 'Implantations',
    },
    configPreview: {
      eyebrow: 'Configuration du site',
      title: 'Menu, contact et footer',
      intro: 'Cette story n’est pas une page publique : son contenu alimente le header et le footer de toutes les pages.',
    },
  },
  en: {
    languageName: 'English',
    ogLocale: 'en_GB',
    skipToContent: 'Skip to content',
    home: 'home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainMenu: 'Main menu',
    languageSwitch: 'Language selection',
    footerMenu: 'Footer menu',
    navigation: 'Navigation',
    contact: 'Contact',
    legalInformation: 'Legal information',
    rightsReserved: 'All rights reserved.',
    missions: 'Our missions',
    pageNotFound: 'Page not found',
    error: {
      label: 'Error',
      notFoundTitle: 'This page could not be found.',
      notFoundText: 'The page you are looking for may have been moved or no longer exists.',
      genericTitle: 'Something went wrong.',
      genericText: 'Please try again in a few moments.',
      backHome: 'Back to home',
    },
    contactCard: {
      title: 'Get in touch',
      phone: 'Phone',
      email: 'Email',
      locations: 'Locations',
    },
    configPreview: {
      eyebrow: 'Site settings',
      title: 'Menu, contact and footer',
      intro: 'This story is not a public page: its content feeds the header and footer of every page.',
    },
  },
} satisfies Record<Locale, unknown>

export type Messages = typeof messages.fr
