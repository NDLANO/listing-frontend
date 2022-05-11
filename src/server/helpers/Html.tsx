/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import config from '../../config';

//@ts-ignore
const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require

const GoogleTagMangerNoScript = () => {
  if (config.googleTagMangerId) {
    return (
      <noscript>
        <iframe
          title="google tag manager"
          src={`//www.googletagmanager.com/ns.html?id=${config.googleTagMangerId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    );
  }
  return null;
};

const GoogleTagMangerScript = () => {
  if (config.googleTagMangerId) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
        j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})
        (window,document,'script','dataLayer','${config.googleTagMangerId}');`,
        }}
      />
    );
  }
  return null;
};

interface Props {
  lang: string;
  className: string;
  content?: string;
  initialProps?: {
    locale?: string;
  };
  data: any;
}

const Html = ({ lang, className, content = '', initialProps, data }: Props) => {
  const head = Helmet.rewind();

  return (
    <html lang={lang} className={className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.script.toComponent()}
        {razzleAssets.client && razzleAssets.client.css && (
          <link
            rel="stylesheet"
            type="text/css"
            href={razzleAssets.client.css}
          />
        )}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic,400,600,700|Signika:400,600,300,700"
        />
        <link rel="icon" href={`/favicon.ico`} type="image/ico" />
      </head>
      <body>
        <GoogleTagMangerNoScript />
        <GoogleTagMangerScript />
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.initialState = ${serialize(initialProps)}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.config = ${serialize(config)}`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__ = ${serialize(data)}; `,
          }}
        />
        <script src={razzleAssets.client.js} />
        {/* <script type="text/javascript" async src={`https://cdn.mathjax.org/mathjax/2.7-latest/MathJax.js?config=/assets/${assets['mathjaxConfig.js']}`} /> */}
      </body>
    </html>
  );
};

export default Html;
