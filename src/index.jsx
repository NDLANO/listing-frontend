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
import { IntlProvider } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import { getLocaleObject, isValidLocale } from './i18n';
import configureStore from './configureStore';
import rootSaga from './sagas';
import App from '../src/containers/App/App';


const paths = window.location.pathname.split('/');
const localeString = paths.length > 2 && isValidLocale(paths[1]) ? paths[1] : 'nb';
const basename = isValidLocale(paths[1]) ? `${paths[1]}` : '';

const locale = getLocaleObject(localeString);

const initialState = !isEmpty(window.initialState) ? window.initialState : { locale: locale.abbreviation };
const store = configureStore(initialState);

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={locale.abbreviation} messages={locale.messages}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);
