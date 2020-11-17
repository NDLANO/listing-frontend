/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import { OK, MOVED_PERMANENTLY, TEMPORARY_REDIRECT } from 'http-status';
import { oembedConceptRoute } from './routes/oembedConceptRoute';
import config from '../config';
import contentSecurityPolicy from './contentSecurityPolicy';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = config.disableSSR; // Disables server side rendering

const defaultRoute = require('./routes/defaultRoute').defaultRoute;
const app = express();

const allowedBodyContentTypes = [
  'application/json',
  'application/x-www-form-urlencoded',
];

const ndlaMiddleware = [
  express.static(process.env.RAZZLE_PUBLIC_DIR, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // One year
  }),

  bodyParser.urlencoded({ extended: true }),
  bodyParser.json({
    type: req => allowedBodyContentTypes.includes(req.headers['content-type']),
  }),
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
    contentSecurityPolicy,
    frameguard:
      process.env.NODE_ENV === 'development'
        ? {
            action: 'allow-from',
            domain: '*://localhost',
          }
        : undefined, // sjekk ut
  }),
];

function sendResponse(res, data, status = OK) {
  if (status === MOVED_PERMANENTLY || status === TEMPORARY_REDIRECT) {
    res.writeHead(status, data);
    res.end();
  } else if (res.getHeader('Content-Type') === 'application/json') {
    res.status(status).json(data);
  } else {
    res.status(status).send(data);
  }
}

async function handleRequest(req, res, route) {
  try {
    const { data, status } = await route(req);
    sendResponse(res, data, status);
  } catch (err) {
    console.error(err);
    //handleError(err);
    //await sendInternalServerError(req, res);
  }
}

app.use(compression());
app.use(ndlaMiddleware);

app.get('/static/*');

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 200, text: 'Health check ok' });
});

app.get('/oembed', ndlaMiddleware, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  handleRequest(req, res, oembedConceptRoute);
});

app.get('*', (req, res) => {
  defaultRoute(req, res);
});

export default app;
