/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import compression from 'compression';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { match, RouterContext } from 'react-router';

import enableDevMiddleWare from './enableDevMiddleware';
import getConditionalClassnames from './getConditionalClassnames';
import createMemoryHistory from './createMemoryHistory';
import configureRoutes from '../src/routes';
import configureStore from '../src/configureStore';
import rootSaga from '../src/sagas';
import { getLocaleObject, isValidLocale } from '../src/i18n';
import Html from './Html';
import { getToken } from './auth';


const app = express();

if (process.env.NODE_ENV === 'development') {
  enableDevMiddleWare(app);
}

app.use(compression());
app.use(express.static('htdocs', {
  maxAge: 1000 * 60 * 60 * 24 * 365, // One year
}));
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', 'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://*.ndla.no https://players.brightcove.net https://www.nrk.no https://www.googletagmanager.com https://www.google-analytics.com https://www.youtube.com https://s.ytimg.com https://cdn.auth0.com; style-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://fonts.googleapis.com https://fonts.gstatic.com; font-src \'self\' https://fonts.googleapis.com https://fonts.gstatic.com; connect-src \'self\' https://*.ndla.no https://logs-01.loggly.com; img-src https://*.ndla.no https://www.google-analytics.com https://stats.g.doubleclick.net data: ;');
  next();
});

const renderHtmlString = (locale, userAgentString, state = {}, component = undefined) =>
  renderToString(<Html lang={locale} state={state} component={component} className={getConditionalClassnames(userAgentString)} />);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 200, text: 'Health check ok' });
});

app.get('/get_token', (req, res) => {
  getToken().then((token) => {
    res.send(token);
  }).catch((err) => {
    res.status(500).send(err.message);
  });
});

function handleResponse(req, res, token) {
  const paths = req.url.split('/');
  const { abbreviation: locale, messages } = getLocaleObject(paths[1]);
  const userAgentString = req.headers['user-agent'];

  if (global.__DISABLE_SSR__) { // eslint-disable-line no-underscore-dangle
    const htmlString = renderHtmlString(locale, userAgentString, { accessToken: token.access_token });
    res.send(`<!doctype html>\n${htmlString}`);

    return;
  }

  const options = isValidLocale(paths[1]) ? { basename: `/${locale}/` } : {};
  const location = !options.basename ? req.url : req.url.replace(`${locale}/`, '');
  const memoryHistory = createMemoryHistory(req.url, options);

  const store = configureStore({ locale, accessToken: token.access_token }, memoryHistory);

  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes: configureRoutes(store), basename: `/${locale}`, location }, (err, redirectLocation, props) => {
    if (err) {
      // something went badly wrong, so 500 with a message
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      // we matched a ReactRouter redirect, so redirect from the server
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      // if we got props, that means we found a valid component to render for the given route
      const component =
        (<Provider store={store}>
          <IntlProvider locale={locale} messages={messages}>
            <RouterContext {...props} />
          </IntlProvider>
        </Provider>);

      store.runSaga(rootSaga).done
        .then(() => {
          const state = store.getState();
          const htmlString = renderHtmlString(locale, userAgentString, state, component, { accessToken: token.access_token });
          const status = props.routes.find(r => r.status === 404) !== undefined ? 404 : 200;
          res.status(status).send(`<!doctype html>\n${htmlString}`);
        })
        .catch(((error) => {
          res.status(500).send(error.message);
        }));

      // Trigger sagas for components by rendering them (should not have any performance implications)
      // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
      renderToString(component);

      // Dispatch a close event so sagas stop listening after they have resolved
      store.close();
    } else {
      res.sendStatus(500);
    }
  });
}


app.get('*', (req, res) => {
  getToken().then((token) => {
    handleResponse(req, res, token);
  }).catch(err => res.status(500).send(err.message));
});


module.exports = app;
