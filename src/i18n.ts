/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
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
export const languages = ['nn', 'nb'];

export const isValidLanguage = (lng: string) => languages.includes(lng);

i18n.init({
  supportedLngs: languages,
});

i18n.on('languageChanged', function(language) {
  if (typeof document != 'undefined') {
    document.documentElement.lang = language;
  }
  if (typeof window != 'undefined') {
    const paths: string[] = window.location.pathname.split('/');
    const basename = isValidLanguage(paths[1] as string) ? `${paths[1]}` : '';
    if (!(basename === '' && language == 'nb')) {
      const { search } = window.location;
      window.history.replaceState({}, 'NDLA', `/${language}/${search}`);
    }
  }
});
export default i18n;
