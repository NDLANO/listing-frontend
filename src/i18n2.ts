import { messagesNB, messagesEN, messagesNN } from '@ndla/ui';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// @ts-ignore
import nb from './phrases/phrases-nb';
// @ts-ignore
import nn from './phrases/phrases-nn';
// @ts-ignore
import en from './phrases/phrases-en';



//change this to add/remove languages
export const languages = ['nn', 'nb', "en"];


const DETECTION_OPTIONS = {
  order: ['path', 'localStorage', 'htmlTag'],
  caches: ['localStorage'],
  lookupLocalStorage: 'i18nextLng',
};


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: DETECTION_OPTIONS,
    fallbackLng: 'nb',
    supportedLngs: languages,
    resources: {
      en: {
        translation: en
      },
      nn: {
        translation: nn
      },
      nb: {
        translation: nb
      },
    },
  });

  i18n.addResourceBundle('en', 'translation', messagesEN, true, false)
  i18n.addResourceBundle('nn', 'translation', messagesNN, true, false)
  i18n.addResourceBundle('nb', 'translation', messagesNB, true, false)


export const isValidLanguage = (lng: string): boolean =>
  languages.includes(lng);


i18n.on('languageChanged', function(language:string) {
  if (typeof document != 'undefined') {
    document.documentElement.lang = language;
  }
  if (typeof window != 'undefined') {
    const paths: string[] = window.location.pathname.split('/');
    const basename = isValidLanguage(paths[1] as string) ? `${paths[1]}` : '';
    if (!(basename === '' && language === 'nb')) {
      const { search } = window.location;
      window.history.replaceState({}, 'NDLA', `/${language}/${search}`);
      //      window.location.replace( `/${language}/${search}`);
    }
  }
});


export default i18n;