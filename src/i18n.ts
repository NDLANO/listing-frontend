/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { i18n } from "i18next";
import { getDefaultLocale } from "./config";
import { LocaleType } from "./interfaces";
import en from "./phrases/phrases-en";
import nb from "./phrases/phrases-nb";
import nn from "./phrases/phrases-nn";

const appLocales = ["nb", "en", "nn"];

export const getValidLocale = (locale: string) => {
  const maybeLocale = appLocales.find((l) => l === locale);
  return maybeLocale ?? getDefaultLocale();
};

export const isValidLocale = (locale: string) => appLocales.find((l) => l === locale) !== undefined;

export const supportedLanguages: LocaleType[] = ["nb", "nn"];

export const initializeI18n = (i18n: i18n, language: string): i18n => {
  const instance = i18n.cloneInstance({
    lng: language,
    supportedLngs: supportedLanguages,
  });
  i18n.addResourceBundle("en", "translation", en, true, true);
  i18n.addResourceBundle("nb", "translation", nb, true, true);
  i18n.addResourceBundle("nn", "translation", nn, true, true);
  return instance;
};
