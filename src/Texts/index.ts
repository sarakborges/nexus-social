import * as PtTexts from './Pt.text'

const texts = {
  'pt-br': PtTexts
}

export const getTexts = (key: string) => {
  const lang = localStorage.getItem('language') || 'pt-br'

  return texts[lang][key] || ''
}
