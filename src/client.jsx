/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { I18nextProvider } from 'react-i18next';
import { i18nInstance } from '@ndla/ui';
import { createApolloClient } from './util/apiHelpers';
import { isValidLocale } from './i18n';
import App from './containers/App/App';

const paths = window.location.pathname.split('/');
const basename = isValidLocale(paths[1]) ? `${paths[1]}` : '';

const storedLanguage = window.localStorage.getItem('language');
if (
  basename === '' &&
  isValidLocale(storedLanguage) &&
  storedLanguage !== 'nb'
) {
  const { pathname, search } = window.location;
  window.location.href = `/${storedLanguage}${pathname}${search}`;
} else if (storedLanguage !== basename && isValidLocale(basename)) {
  window.localStorage.setItem('language', basename);
}

const client = createApolloClient(i18nInstance.language);

const renderApp = () =>
  ReactDOM.render(
    <I18nextProvider i18n={i18nInstance}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
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
