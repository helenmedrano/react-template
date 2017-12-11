import i18n from 'i18n-js'

import enLocale from 'todo/locales/en'

i18n.translations.en = enLocale
i18n.locale = 'en'

export default (string, options) => i18n.t(string, options)
