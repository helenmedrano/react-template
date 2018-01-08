import i18n from 'i18n-js'
import enLocale from 'todo/locales/en'

i18n.translations.en = enLocale
i18n.locale = 'en'

const t = i18n.t.bind(i18n)

/**
 * Translation context - Allows shorter queries of translation terms
 * Especially useful when translating many terms that reside in the same namespace
 */
const tc = prefix => (term, options) => t(`${prefix}.${term}`, options)

export { t, tc }
