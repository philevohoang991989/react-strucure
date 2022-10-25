import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import vn from './vi'
import { LANGUAGE } from 'constants/language'
import { Config } from 'services/config.service'
import Container from 'typedi'

const resources = { en, vn }
const configService = Container.get(Config)

/**
 * ----------- HOW TO USE ----------
 * i18n.changeLanguage(LANGUAGE.VI); -> To change language
 * const { t } = useTranslation(); -> To use translation
 * t(i18nKey.KEY) -> To translate
 *
 * EXAMPLE:
 * i18n.changeLanguage(LANGUAGE.VI)
 * t(i18nKey.loginBtn) -> 'Đăng nhập'
 *
 * i18n.changeLanguage(LANGUAGE.EN)
 * t(i18nKey.loginBtn) -> 'Login'
 */

i18n.use(initReactI18next).init({
  initImmediate: false,
  debug: false,
  resources: resources,
  lng: configService.language,
  react: {
    useSuspense: false
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export let i18nKey = resources[i18n.language as LANGUAGE]
i18n.on('languageChanged', (lng: LANGUAGE) => {
  configService.setLanguage(lng)
  i18nKey = resources[lng]
})

export default i18n
