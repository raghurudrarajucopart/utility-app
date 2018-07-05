import locales from '../constants/locale/index.js'
import { isEmpty } from 'ramda'
import { getItem } from '../utils/localStorage.js'

const dashboardState = getItem('userSelectedLang') || {}
const { selectedLangCode = 'EN' } = dashboardState

let currentLocale = selectedLangCode

export default (text, ...args) => {
  if (text === undefined) return // TO DO: Remove once sure that locale is being called with valid text

  let translatedPhrases = locales[currentLocale]
  const translation =
    typeof translatedPhrases[text] === 'function' ? translatedPhrases[text](args) : translatedPhrases[text]
  if (translation !== undefined && translation !== null) return translation
  const arr = text.split('.')
  if (isEmpty(arr)) {
    return text.toString()
  } else if (arr && arr.length === 1) {
    const translatedValue = translatedPhrases[text]
    return translatedValue ? translatedValue.toString() : text.toString()
  } else if (arr.length > 1) {
    arr.map((object) => {
      if (translatedPhrases) {
        translatedPhrases = translatedPhrases[object]
      }
    })
  }
  return translatedPhrases ? translatedPhrases.toString() : text
}

// export default (text) => locales[currentLocale][text]

// IMPORTANT:
// you MUST call forceUpdate() on the topmost Component
// after calling this function to prevent the incorrect
// language from showing
export const changeLocale = (languageCode) => {
  currentLocale = languageCode
}
