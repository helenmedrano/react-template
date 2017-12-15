import i18n from 'i18n-js'

import { tc } from './i18n'

describe('i18n utils', () => {
  beforeEach(() => {
    i18n.translations = {
      en: {
        i18n: {
          util: {
            testing: 'isHere',
          },
        },
      },
    }
    i18n.locale = 'en'
  })

  describe('tc', () => {
    it('returns a translation function', () =>
      expect(typeof tc('i18n.util')).toBe('function'))

    it('translates a scoped term with the bound prefix', () => {
      const t = tc('i18n.util')
      expect(t('testing')).toBe('isHere')
    })
  })
})
