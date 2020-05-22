import i18next from 'i18next';
import en from './en';
import ja from './ja';

i18next.init({
  interpolation: {
    escapeValue: false
  },
  lng: 'ja', // 'en'
  resources: {
    en: {
      translation: en
    },
    ja: {
      translation: ja
    }
  }
});

export default i18next;
