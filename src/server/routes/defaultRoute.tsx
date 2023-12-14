/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// import before all other imports component to make sure it is loaded before any emotion stuff.
import '../../style/index.css';
import { Request, Response } from 'express';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter } from 'react-router-dom/server.js';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { i18nInstance } from '@ndla/ui';
import RedirectContext from '../../components/RedirectContext';
import { getDefaultLocale } from '../../config';
import App from '../../containers/App/App';
import { getValidLocale, initializeI18n, isValidLocale } from '../../i18n';
import { createApolloClient } from '../../util/apiHelpers';
import getConditionalClassnames from '../helpers/getConditionalClassnames';
import Html from '../helpers/Html';

declare global {
  let __DISABLE_SSR__: boolean;
}

interface InitialProps {
  locale?: string;
}

interface RenderHtmlProps {
  locale: string;
  component?: ReactElement;
  client: ApolloClient<any>;
  userAgentString?: string;
  initialProps?: InitialProps;
  helmetContext: any;
}

const renderHtmlString = async ({
  locale,
  component,
  client,
  userAgentString,
  initialProps,
  helmetContext,
}: RenderHtmlProps) => {
  const content = component ? await renderToStringWithData(component) : '';
  const data = client.extract();
  const helmet = helmetContext.helmet;
  return renderToString(
    <Html
      lang={locale}
      initialProps={initialProps}
      content={content}
      className={getConditionalClassnames(userAgentString)}
      data={{ apolloState: data }}
      helmet={helmet}
    />,
  );
};

const disableSSR = (req: Request) => {
  return __DISABLE_SSR__ || req.query['disableSSR'] === 'true';
};

export async function defaultRoute(req: Request, res: Response) {
  const paths = req.url.split('/');
  const locale = getValidLocale(paths[1] ?? '');
  const userAgentString = req.headers['user-agent'];
  // Oembed-hack
  if (paths.find(p => p.includes('listing')) || paths.includes('concepts')) {
    res.removeHeader('X-Frame-Options');
  }
  const i18n = initializeI18n(i18nInstance, locale ?? getDefaultLocale());

  const client = createApolloClient(locale);
  const helmetContext = {};
  const clientComponent = (
    <HelmetProvider context={helmetContext}>
      <></>
    </HelmetProvider>
  );

  if (disableSSR(req)) {
    // eslint-disable-line no-underscore-dangle
    const htmlString = await renderHtmlString({
      locale,
      userAgentString,
      initialProps: {
        locale,
      },
      component: clientComponent,
      client,
      helmetContext,
    });
    res.send(`<!doctype html>\n${htmlString}`);
    return;
  }

  const basename = isValidLocale(paths[1] ?? '') ? `${paths[1]}` : '';

  const context: any = {};
  const component = (
    <RedirectContext.Provider value={context}>
      <HelmetProvider context={helmetContext}>
        <I18nextProvider i18n={i18n}>
          <ApolloProvider client={client}>
            <StaticRouter basename={basename} location={req.url}>
              <App />
            </StaticRouter>
          </ApolloProvider>
        </I18nextProvider>
      </HelmetProvider>
    </RedirectContext.Provider>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    try {
      const htmlString = await renderHtmlString({
        locale,
        userAgentString,
        initialProps: { locale },
        component,
        client,
        helmetContext,
      });
      const status = context.status ?? 200;
      res.status(status).send(`<!doctype html>\n${htmlString}`);
    } catch (error) {
      res.status(500).send((error as any).message);
    }
  }

  // Trigger sagas for components by rendering them
  // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
  renderToString(component);
}
