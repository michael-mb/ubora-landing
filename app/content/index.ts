import type { Locale } from '~/i18n/messages'
import frHome from './fr/home.json'
import frConfig from './fr/config.json'
import frLegalNotice from './fr/mentions-legales.json'
import frPrivacyPolicy from './fr/politique-de-confidentialite.json'
import frTeam from './fr/equipe.json'
import enHome from './en/home.json'
import enConfig from './en/config.json'
import enLegalNotice from './en/mentions-legales.json'
import enPrivacyPolicy from './en/politique-de-confidentialite.json'
import enTeam from './en/equipe.json'

export const fallbackPages: Record<Locale, Record<string, any>> = {
  fr: {
    'home': frHome,
    'mentions-legales': frLegalNotice,
    'politique-de-confidentialite': frPrivacyPolicy,
    'equipe': frTeam,
  },
  en: {
    'home': enHome,
    'mentions-legales': enLegalNotice,
    'politique-de-confidentialite': enPrivacyPolicy,
    'equipe': enTeam,
  },
}

export const fallbackConfig: Record<Locale, Record<string, any>> = {
  fr: frConfig,
  en: enConfig,
}
