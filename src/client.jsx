/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { IntlProvider } from '@ndla/i18n';

import { createApolloClient } from './util/apiHelpers';
import { getLocaleObject, isValidLocale } from './i18n';
import configureStore from './configureStore';
import App from './containers/App/App';

const initialState = window.initialState;
const localeString = initialState.locale;
const locale = getLocaleObject(localeString);

const paths = window.location.pathname.split('/');
const basename = isValidLocale(paths[1]) ? `${paths[1]}` : '';

const store = configureStore({ ...initialState });

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

const client = createApolloClient(locale.abbreviation);

const renderApp = () =>
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <IntlProvider locale={locale.abbreviation} messages={locale.messages}>
          <BrowserRouter basename={basename}>
            <App />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
  );

renderApp();

if (module.hot) {
  module.hot.accept('./containers/App/App', () => {
    renderApp();
  });
}
