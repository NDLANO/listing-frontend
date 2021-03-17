/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import defined from 'defined';
import { ApolloProvider } from '@apollo/client';

import { IntlProvider } from '@ndla/i18n';
import getConditionalClassnames from '../helpers/getConditionalClassnames';
import Html from '../helpers/Html';
import { createApolloClient } from '../../util/apiHelpers';
import configureStore from '../../configureStore';
import { getLocaleObject, isValidLocale } from '../../i18n';
import App from '../../containers/App/App';

const renderHtmlString = (
  locale,
  userAgentString,
  state = {},
  data = {},
  component = undefined,
) =>
  renderToString(
    <Html
      lang={locale}
      state={state}
      component={component}
      className={getConditionalClassnames(userAgentString)}
      data={data}
    />,
  );

export function defaultRoute(req, res) {
  const paths = req.url.split('/');
  const { abbreviation: locale, messages } = getLocaleObject(paths[1]);
  const userAgentString = req.headers['user-agent'];
  // Oembed-hack
  if (paths.find(p => p.includes('listing')) || paths.includes('concepts')) {
    res.removeHeader('X-Frame-Options');
  }

  const client = createApolloClient(locale);

  if (__DISABLE_SSR__) {
    // eslint-disable-line no-underscore-dangle
    const apolloState = client.extract();
    const htmlString = renderHtmlString(
      locale,
      userAgentString,
      {
        locale,
      },
      {
        apolloState,
      },
    );
    res.send(`<!doctype html>\n${htmlString}`);
    return;
  }

  const store = configureStore({ locale });

  const basename = isValidLocale(paths[1]) ? `${paths[1]}` : '';

  const context = {};
  const component = (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <StaticRouter
            basename={basename}
            location={req.url}
            context={context}>
            <App />
          </StaticRouter>
        </IntlProvider>
      </Provider>
    </ApolloProvider>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    try {
      const state = store.getState();
      const apolloState = client.extract();
      const htmlString = renderHtmlString(
        locale,
        userAgentString,
        state,
        { apolloState },
        component,
      );
      const status = defined(context.status, 200);
      res.status(status).send(`<!doctype html>\n${htmlString}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // Trigger sagas for components by rendering them
  // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
  renderToString(component);

  // Dispatch a close event so sagas stop listening after they have resolved
  store.close();
}
