/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, useApolloClient } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import { i18nInstance } from '@ndla/ui';

import { initializeI18n, isValidLocale, supportedLanguages } from './i18n';
import { createApolloClient } from './util/apiHelpers';
import App from './containers/App/App';

const paths = window.location.pathname.split('/');
const basename = paths[1] && isValidLocale(paths[1]) ? `${paths[1]}` : '';

const storedLanguage = window.localStorage.getItem('language');
if (
  basename === '' &&
  storedLanguage &&
  isValidLocale(storedLanguage) &&
  storedLanguage !== 'nb'
) {
  const { pathname, search } = window.location;
  window.location.href = `/${storedLanguage}${pathname}${search}`;
} else if (storedLanguage !== basename && isValidLocale(basename)) {
  window.localStorage.setItem('language', basename);
}

const client = createApolloClient(i18nInstance.language);

const LanguageWrapper = () => {
  const { i18n } = useTranslation();
  const history = useHistory();
  const client = useApolloClient();
  const [lang, setLang] = useState(basename);
  const firstRender = useRef(true);
  initializeI18n(i18n, client, history);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const regex = new RegExp(supportedLanguages.map(l => `/${l}/`).join('|'));
    const paths = window.location.pathname.replace(regex, '').split('/');
    const { search } = window.location;
    const p = paths.slice().join('/');
    const test = p.startsWith('/') ? p : `/${p}`;
    history.replace(`/${i18n.language}${test}${search}`);
    setLang(i18n.language); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <BrowserRouter basename={lang} key={lang}>
      <App />
    </BrowserRouter>
  );
};

const renderApp = () =>
  ReactDOM.render(
    <I18nextProvider i18n={i18nInstance}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <LanguageWrapper />
        </BrowserRouter>
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
