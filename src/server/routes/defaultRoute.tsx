/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { ReactElement } from 'react';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import { i18nInstance } from '@ndla/ui';
import getConditionalClassnames from '../helpers/getConditionalClassnames';
import Html from '../helpers/Html';
import { createApolloClient } from '../../util/apiHelpers';
import { getLocaleObject, isValidLocale } from '../../i18n';
import App from '../../containers/App/App';

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
  const { abbreviation: locale } = getLocaleObject(paths[1] ?? '');
  const userAgentString = req.headers['user-agent'];
  // Oembed-hack
  if (paths.find(p => p.includes('listing')) || paths.includes('concepts')) {
    res.removeHeader('X-Frame-Options');
  }

  const client = createApolloClient(locale);
  const helmetContext = {};

  if (disableSSR(req)) {
    // eslint-disable-line no-underscore-dangle
    const htmlString = await renderHtmlString({
      locale,
      userAgentString,
      initialProps: {
        locale,
      },
      client,
      helmetContext,
    });
    res.send(`<!doctype html>\n${htmlString}`);
    return;
  }

  const basename = isValidLocale(paths[1] ?? '') ? `${paths[1]}` : '';

  const context: any = {};
  const component = (
    <HelmetProvider context={helmetContext}>
      <I18nextProvider i18n={i18nInstance}>
        <ApolloProvider client={client}>
          <StaticRouter
            basename={basename}
            location={req.url}
            context={context}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </I18nextProvider>
    </HelmetProvider>
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
      res.status(500).send(error.message);
    }
  }

  // Trigger sagas for components by rendering them
  // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
  renderToString(component);
}
