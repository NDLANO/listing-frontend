import { i18n } from '@ndla/i18n';
import { messagesNB, messagesEN, messagesNN } from '@ndla/ui';
// @ts-ignore
import nb from './phrases/phrases-nb';
// @ts-ignore
import nn from './phrases/phrases-nn';
// @ts-ignore
import en from './phrases/phrases-en';

i18n.addResourceBundle('en', 'translation', en, true, false);
i18n.addResourceBundle('nn', 'translation', nn, true, false);
i18n.addResourceBundle('nb', 'translation', nb, true, false);
i18n.addResourceBundle('en', 'translation', messagesEN, true, false);
i18n.addResourceBundle('nn', 'translation', messagesNN, true, false);
i18n.addResourceBundle('nb', 'translation', messagesNB, true, false);

//change this to add/remove languages
export const languages = ['nn', 'nb', "en"];


export const isValidLanguage = (lng: string): boolean =>
  languages.includes(lng);

  
i18n.init({
  supportedLngs: languages,
  debug: true,
});

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
    }
  }
  console.log("i18n blir iniitialisert i listing-frontend")
});
export default i18n;