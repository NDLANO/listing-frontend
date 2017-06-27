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
// import { syncHistoryWithStore } from 'react-router-redux';
// import { createHistory } from 'history';
import { IntlProvider } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import { getLocaleObject, isValidLocale } from './i18n';
import configureStore from './configureStore';
// import configureRoutes from './routes';
import rootSaga from './sagas';
import App from '../src/containers/App/App';


// function configureBrowserHistory(path) {
//   if (isValidLocale(path)) {
//     const basename = `/${path}/`;
//     return useRouterHistory(createHistory)({
//       basename,
//     });
//   }
//   return useRouterHistory(createHistory)();
// }

const paths = window.location.pathname.split('/');
// const path = paths.length > 2 ? paths[1] : '/';
const localeString = paths.length > 2 && isValidLocale(paths[1]) ? paths[1] : 'nb';
const basename = isValidLocale(paths[1]) ? `${paths[1]}` : '';

const locale = getLocaleObject(localeString);
// const browserHistory = configureBrowserHistory(path);

const initialState = !isEmpty(window.initialState) ? window.initialState : { locale: locale.abbreviation };
const store = configureStore(initialState);

store.runSaga(rootSaga);

// const history = syncHistoryWithStore(browserHistory, store);
// const routes = configureRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={locale.abbreviation} messages={locale.messages}>
      <BrowserRouter basename={basename}>
        {/* {routes}*/}
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);
