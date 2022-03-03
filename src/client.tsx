/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, useApolloClient } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import { i18nInstance } from '@ndla/ui';

import { initializeI18n, isValidLocale, supportedLanguages } from './i18n';
import { createApolloClient } from './util/apiHelpers';
import App from './containers/App/App';
import { LocaleType } from './interfaces';
import { getDefaultLanguage } from './config';
import { STORED_LANGUAGE_KEY } from './constants';

const paths = window.location.pathname.split('/');
const basename = isValidLocale(paths[1] ?? '') ? `${paths[1]}` : undefined;

const client = createApolloClient(basename);

const constructNewPath = (newLocale?: LocaleType) => {
  const regex = new RegExp(supportedLanguages.map(l => `/${l}/`).join('|'));
  const path = window.location.pathname.replace(regex, '');
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  const localePrefix = newLocale ? `/${newLocale}` : '';
  return `${localePrefix}${fullPath}${window.location.search}`;
};

const LanguageWrapper = ({ basename }: { basename?: string }) => {
  const { i18n } = useTranslation();
  const [base, setBase] = useState('');
  const firstRender = useRef(true);
  const client = useApolloClient();

  useEffect(() => {
    initializeI18n(i18n, client);
    const storedLanguage = window.localStorage.getItem(
      STORED_LANGUAGE_KEY,
    ) as LocaleType;
    const defaultLanguage = getDefaultLanguage();
    if (
      (!basename && !storedLanguage) ||
      (!basename && storedLanguage === defaultLanguage)
    ) {
      i18n.changeLanguage(defaultLanguage);
    } else if (storedLanguage && isValidLocale(storedLanguage)) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [basename, i18n, client]);

  // handle path changes when the language is changed
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      window.history.replaceState('', '', constructNewPath(i18n.language));
      setBase(i18n.language);
    }
  }, [i18n.language]);

  // handle initial redirect if URL has wrong or missing locale prefix.
  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(
      STORED_LANGUAGE_KEY,
    ) as LocaleType;
    if (
      (!storedLanguage || storedLanguage === getDefaultLanguage()) &&
      !basename
    )
      return;
    if (isValidLocale(storedLanguage) && storedLanguage === basename) {
      setBase(storedLanguage);
      return;
    }
    if (window.location.pathname.includes('/login/success')) return;
    setBase(storedLanguage);
    window.history.replaceState('', '', constructNewPath(storedLanguage));
  }, [basename]);

  return <RouterComponent base={base} />;
};

const RouterComponent = ({ base }: { base: string }) => {
  return (
    <BrowserRouter key={base} basename={base}>
      <App key={base} />
    </BrowserRouter>
  );
};

const renderApp = () =>
  ReactDOM.render(
    <I18nextProvider i18n={i18nInstance}>
      <ApolloProvider client={client}>
        <LanguageWrapper basename={basename} />
      </ApolloProvider>
    </I18nextProvider>,
    document.getElementById('root'),
  );

renderApp();

if (module.hot) {
  module.hot.accept('./containers/App/App', () => {
    renderApp();
  });
}
