/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// import before all other imports component to make sure it is loaded before any emotion stuff.
import './style/index.css';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, useApolloClient } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import { i18nInstance } from '@ndla/ui';
import '@fontsource/source-sans-pro/index.css';
import '@fontsource/source-sans-pro/400-italic.css';
import '@fontsource/source-sans-pro/300.css';
import '@fontsource/source-sans-pro/300-italic.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';

import { initializeI18n, isValidLocale, supportedLanguages } from './i18n';
import { createApolloClient, createApolloLinks } from './util/apiHelpers';
import App from './containers/App/App';
import config, { getDefaultLocale } from './config';
const STORED_LANGUAGE_KEY = 'language';

const paths = window.location.pathname.split('/');
const basename = paths[1] && isValidLocale(paths[1]) ? `${paths[1]}` : '';

const maybeStoredLanguage = window.localStorage.getItem(STORED_LANGUAGE_KEY);
// Set storedLanguage to a sane value if non-existent
if (maybeStoredLanguage === null || maybeStoredLanguage === undefined) {
  window.localStorage.setItem(STORED_LANGUAGE_KEY, config.defaultLocale);
}
const storedLanguage = window.localStorage.getItem(STORED_LANGUAGE_KEY)!;
const i18n = initializeI18n(i18nInstance, storedLanguage);

const client = createApolloClient(storedLanguage);

const constructNewPath = (newLocale?: string) => {
  const regex = new RegExp(`\\/(${supportedLanguages.join('|')})($|\\/)`, '');
  const path = window.location.pathname.replace(regex, '');
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  const localePrefix = newLocale ? `/${newLocale}` : '';
  return `${localePrefix}${fullPath}${window.location.search}`;
};

const useReactPath = () => {
  const [path, setPath] = useState('');
  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };
  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    window.addEventListener('pushstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
      window.removeEventListener('pushstate', listenToPopstate);
    };
  }, []);
  return path;
};

const LanguageWrapper = ({ basename }: { basename?: string }) => {
  const { i18n } = useTranslation();
  const [base, setBase] = useState(basename ?? '');
  const firstRender = useRef(true);
  const client = useApolloClient();
  const windowPath = useReactPath();

  i18n.on('languageChanged', lang => {
    client.resetStore();
    client.setLink(createApolloLinks(lang));
    window.localStorage.setItem(STORED_LANGUAGE_KEY, lang);
    document.documentElement.lang = lang;
  });

  // handle path changes when the language is changed
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      window.history.replaceState('', '', constructNewPath(i18n.language));
      setBase(i18n.language);
    }
  }, [i18n.language]);

  // handle initial redirect if URL has wrong or missing locale prefix.
  useLayoutEffect(() => {
    const storedLanguage = window.localStorage.getItem(STORED_LANGUAGE_KEY)!;
    if (storedLanguage === getDefaultLocale() && !base) return;
    if (isValidLocale(storedLanguage) && storedLanguage === base) {
      setBase(storedLanguage);
    }
    if (window.location.pathname.includes('/login/success')) return;
    setBase(storedLanguage);
    window.history.replaceState('', '', constructNewPath(storedLanguage));
  }, [base, windowPath]);

  return (
    <BrowserRouter key={base} basename={base}>
      <App />
    </BrowserRouter>
  );
};

const renderApp = () =>
  ReactDOM.render(
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
          <LanguageWrapper basename={basename} />
        </ApolloProvider>
      </I18nextProvider>
    </HelmetProvider>,
    document.getElementById('root'),
  );

renderApp();

if (module.hot) {
  module.hot.accept('./containers/App/App', () => {
    renderApp();
  });
}
