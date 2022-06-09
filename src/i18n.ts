import { i18n } from 'i18next';
import nb from './phrases/phrases-nb';
import nn from './phrases/phrases-nn';
import en from './phrases/phrases-en';
import { getDefaultLocale } from './config';

const appLocales = ['nb', 'en', 'nn'];

export const getValidLocale = (locale: string) => {
  const maybeLocale = appLocales.find(l => l === locale);
  return maybeLocale ?? getDefaultLocale();
};

export const isValidLocale = (locale: string) =>
  appLocales.find(l => l === locale) !== undefined;

export const supportedLanguages = ['nb', 'nn'];

export const initializeI18n = (i18n: i18n, language: string): i18n => {
  const instance = i18n.cloneInstance({
    lng: language,
    supportedLngs: supportedLanguages,
  });
  i18n.addResourceBundle('en', 'translation', en, true, true);
  i18n.addResourceBundle('nb', 'translation', nb, true, true);
  i18n.addResourceBundle('nn', 'translation', nn, true, true);
  return instance;
};
