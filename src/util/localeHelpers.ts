/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Location } from 'history';
import { languageSelectorLocales } from '../i18n';

type LocaleUrlsType = Record<string, { name: string; url: string }>;

const getLocaleURL = (
  newLocale: string,
  locale: string,
  location: Location,
) => {
  const { pathname, search } = location;
  const basePath = pathname.startsWith(`/${locale}/`)
    ? pathname.replace(`/${locale}/`, '/')
    : pathname;
  return newLocale === 'nb'
    ? `${basePath}${search}`
    : `/${newLocale}${basePath}${search}`;
};

export const getLocaleUrls = (locale: string, location: Location) => {
  const localeUrls: LocaleUrlsType = {};
  languageSelectorLocales.forEach(appLocale => {
    localeUrls[appLocale.abbreviation] = {
      name: appLocale.name,
      url:
        appLocale.abbreviation === 'nb'
          ? `/${appLocale.abbreviation}${getLocaleURL(
              appLocale.abbreviation,
              locale,
              location,
            )}`
          : getLocaleURL(appLocale.abbreviation, locale, location),
    };
  });
  return localeUrls;
};
