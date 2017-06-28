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
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';
import { IntlProvider } from 'ndla-i18n';

import { getLocaleObject, isValidLocale } from './i18n';
import configureStore from './configureStore';
import configureRoutes from './routes';
import rootSaga from './sagas';

const initialState = window.initialState;
const localeString = initialState.locale;
const locale = getLocaleObject(localeString);

function configureBrowserHistory(path) {
  if (isValidLocale(path)) {
    const basename = `/${path}/`;
    return useRouterHistory(createHistory)({
      basename,
    });
  }
  return useRouterHistory(createHistory)();
}

const paths = window.location.pathname.split('/');
const path = paths.length > 2 ? paths[1] : '/';
const browserHistory = configureBrowserHistory(path);

const store = configureStore(
  initialState
, browserHistory);

store.runSaga(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);
const routes = configureRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={locale.abbreviation} messages={locale.messages}>
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);
