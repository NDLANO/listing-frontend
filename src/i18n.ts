import { i18n } from 'i18next';
import { ApolloClient } from '@apollo/client';
import { History } from 'history';
//@ts-ignore
import { createApolloLinks } from './util/apiHelpers';
import nb from './phrases/phrases-nb';
import nn from './phrases/phrases-nn';
import en from './phrases/phrases-en';
import { LocaleType } from './interfaces';

type LocaleObject = {
  name: string;
  abbreviation: LocaleType;
};

const NB: LocaleObject = {
  name: 'Bokmål',
  abbreviation: 'nb',
};
const NN: LocaleObject = {
  name: 'Nynorsk',
  abbreviation: 'nn',
};
const EN: LocaleObject = {
  name: 'English',
  abbreviation: 'en',
};

export const appLocales = [NB, NN, EN];
export const preferredLocales = [NB, NN, EN];

// As of now only NB and NN is required, use one of the above if the requirement changes in the future
export const languageSelectorLocales = [NB, NN];

export const getLocaleObject = (localeAbbreviation: string) => {
  const locale = appLocales.find(l => l.abbreviation === localeAbbreviation);

  return locale || NB; // defaults to NB
};

export const isValidLocale = (localeAbbreviation: string) =>
  appLocales.find(l => l.abbreviation === localeAbbreviation) !== undefined;

export const supportedLanguages = ['nb', 'nn'];

export const initializeI18n = (
  i18n: i18n,
  client: ApolloClient<object>,
  history: History,
): void => {
  i18n.options.supportedLngs = ['nb', 'nn'];

  i18n.addResourceBundle('en', 'translation', en, true, true);
  i18n.addResourceBundle('nb', 'translation', nb, true, true);
  i18n.addResourceBundle('nn', 'translation', nn, true, true);

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
