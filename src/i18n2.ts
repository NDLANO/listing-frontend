import { i18n } from 'i18next';
import { ApolloClient } from '@apollo/client';
import { History } from 'history';
//@ts-ignore
import { createApolloLinks } from './util/apiHelpers';
import nb from './phrases/phrases-nb';
import nn from './phrases/phrases-nn';
import en from './phrases/phrases-en';

export const initializeI18n = (
  i18n: i18n,
  client: ApolloClient<object>,
  history: History,
): void => {
  i18n.options.supportedLngs = ['nb', 'nn'];
  i18n.addResourceBundle('en', 'translation', en, false, false);
  i18n.addResourceBundle('nb', 'translation', nb, false, false);
  i18n.addResourceBundle('nn', 'translation', nn, false, false);

  i18n.on('languageChanged', function(language) {
    if (typeof document != 'undefined') {
      document.documentElement.lang = language;
    }
    if (typeof window != 'undefined') {
      client.resetStore();
      client.setLink(createApolloLinks(language));
      const supportedLngs = i18n.options.supportedLngs as string[];
      const paths = window.location.pathname.split('/');
      const basename = supportedLngs.includes(paths[1] ?? '')
        ? `${paths[1]}`
        : '';
      if (!(basename === '' && language === 'nb')) {
        window.localStorage.setItem('language', language);
      }
    }
  });
};